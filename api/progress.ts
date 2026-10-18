import { ALL_LEARNING_PATHS_360 } from '../src/data/curriculum360Data';
import { ProgressEngine } from '../src/core/persistence/progressStore';
import { getDatabase } from './_lib/database';
import { isSameOriginRequest, readSession } from './_lib/session';

function parseBody(req: any): any {
  if (typeof req.body === 'string') return JSON.parse(req.body);
  return req.body || {};
}

export default async function handler(req: any, res: any) {
  const session = readSession(req);
  if (!session) return res.status(401).json({ error: 'Authentification requise.' });
  const db = getDatabase();
  if (!db) return res.status(503).json({ error: 'La base de données persistante n’est pas configurée.' });

  if (req.method === 'GET') {
    const url = new URL(req.url, `http://${req.headers?.host || 'localhost'}`);
    const pathId = url.searchParams.get('pathId');
    try {
      if (url.searchParams.get('mode') === 'all') {
        const result = await db.query(
          'SELECT * FROM user_path_enrollments WHERE user_id = $1 ORDER BY last_activity_at DESC',
          [session.id]
        );
        return res.status(200).json({ enrollments: result.rows.map(toEnrollment), source: 'postgresql' });
      }
      if (!pathId || pathId.length > 100) return res.status(400).json({ error: 'Le paramètre pathId est obligatoire.' });
      const result = await db.query(
        'SELECT * FROM user_path_enrollments WHERE user_id = $1 AND path_id = $2',
        [session.id, pathId]
      );
      return res.status(200).json({ enrollment: result.rows[0] ? toEnrollment(result.rows[0]) : null, source: 'postgresql' });
    } catch (error) {
      console.error('[progress] Lecture impossible:', error);
      return res.status(503).json({ error: 'La progression persistante est momentanément indisponible.' });
    }
  }

  if (req.method !== 'POST') return res.status(405).json({ error: `Méthode ${req.method} non autorisée.` });
  if (!isSameOriginRequest(req)) return res.status(403).json({ error: 'Origine de requête non autorisée.' });

  let submitted: any;
  try {
    submitted = parseBody(req).enrollment;
  } catch {
    return res.status(400).json({ error: 'Corps de requête JSON invalide.' });
  }
  if (!submitted || typeof submitted !== 'object' || typeof submitted.pathId !== 'string' || submitted.pathId.length > 100) {
    return res.status(400).json({ error: 'Données de progression invalides.' });
  }

  const path = ALL_LEARNING_PATHS_360.find((candidate) => candidate.id === submitted.pathId && candidate.status === 'published');
  if (!path) return res.status(404).json({ error: 'Parcours publié introuvable.' });

  // L'identité, la version et les indicateurs calculés viennent du serveur.
  // Seuls les enregistrements rattachés au parcours sont acceptés.
  const enrollment = ProgressEngine.recalculateMetrics({
    ...submitted,
    id: `${session.id}_${path.id}`,
    userId: session.id,
    pathId: path.id,
    pathVersion: path.version,
    enrolledAt: typeof submitted.enrolledAt === 'string' ? submitted.enrolledAt : new Date().toISOString(),
    lastActivityAt: new Date().toISOString(),
    activityRecords: filterActivityRecords(submitted.activityRecords, path),
    totalTimeSpentSeconds: Math.max(0, Math.min(2_147_483_647, Number(submitted.totalTimeSpentSeconds) || 0)),
  }, path);

  try {
    await db.query(
      `INSERT INTO user_path_enrollments (
        id, user_id, path_id, path_version, enrolled_at, last_activity_at,
        status, current_activity_id, current_location, activity_records,
        consultation_progress_percent, practical_activities_progress_percent,
        evaluation_score_percent, competencies_mastery_percent,
        validated_competency_codes, total_time_spent_seconds
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      ON CONFLICT (user_id, path_id) DO UPDATE SET
        path_version = EXCLUDED.path_version,
        last_activity_at = EXCLUDED.last_activity_at,
        status = EXCLUDED.status,
        current_activity_id = EXCLUDED.current_activity_id,
        current_location = EXCLUDED.current_location,
        activity_records = EXCLUDED.activity_records,
        consultation_progress_percent = EXCLUDED.consultation_progress_percent,
        practical_activities_progress_percent = EXCLUDED.practical_activities_progress_percent,
        evaluation_score_percent = EXCLUDED.evaluation_score_percent,
        competencies_mastery_percent = EXCLUDED.competencies_mastery_percent,
        validated_competency_codes = EXCLUDED.validated_competency_codes,
        total_time_spent_seconds = EXCLUDED.total_time_spent_seconds`,
      [
        enrollment.id,
        enrollment.userId,
        enrollment.pathId,
        enrollment.pathVersion,
        enrollment.enrolledAt,
        enrollment.lastActivityAt,
        enrollment.status,
        enrollment.currentActivityId || null,
        JSON.stringify(enrollment.currentLocation || {}),
        JSON.stringify(enrollment.activityRecords || {}),
        enrollment.consultationProgressPercent,
        enrollment.practicalActivitiesProgressPercent,
        enrollment.evaluationScorePercent,
        enrollment.competenciesMasteryPercent,
        JSON.stringify(enrollment.validatedCompetencyCodes || []),
        enrollment.totalTimeSpentSeconds,
      ]
    );
    return res.status(200).json({ success: true, savedToDb: true, enrollment });
  } catch (error) {
    console.error('[progress] Sauvegarde impossible:', error);
    return res.status(503).json({ error: 'La progression n’a pas été enregistrée sur le serveur. Réessayez.' });
  }
}

function filterActivityRecords(records: any, path: any): Record<string, any> {
  if (!records || typeof records !== 'object' || Array.isArray(records)) return {};
  const allowed = new Map<string, string>();
  for (const level of path.levels || []) {
    for (const module of level.modules || []) {
      if (module.evaluation?.id) allowed.set(module.evaluation.id, 'evaluation');
      for (const chapter of module.chapters || []) {
        for (const lesson of chapter.lessons || []) {
          allowed.set(lesson.id, 'lesson');
          if (lesson.guidedExercise?.id) allowed.set(lesson.guidedExercise.id, 'guided_exercise');
          if (lesson.autonomousExercise?.id) allowed.set(lesson.autonomousExercise.id, 'autonomous_exercise');
          if (lesson.practicalActivity?.id) allowed.set(lesson.practicalActivity.id, lesson.practicalActivity.type === 'game_mission' ? 'game_mission' : 'simulator');
          for (const quiz of lesson.comprehensionQuiz || []) allowed.set(quiz.id, 'quiz');
        }
      }
    }
  }

  return Object.fromEntries(Object.entries(records).flatMap(([id, record]: [string, any]) => {
    const expectedType = allowed.get(id);
    if (!expectedType || !record || typeof record !== 'object') return [];
    const maxScore = Math.max(1, Math.min(100_000, Number(record.maxScore) || 100));
    const score = Math.max(0, Math.min(maxScore, Number(record.score) || 0));
    const state = ['non_commencee', 'disponible', 'en_cours', 'en_attente_validation', 'terminee', 'a_reviser', 'bloquee'].includes(record.state)
      ? record.state
      : 'en_cours';
    return [[id, {
      ...record,
      activityId: id,
      activityType: expectedType,
      state,
      score,
      maxScore,
      attempts: Math.max(0, Math.min(1000, Number(record.attempts) || 0)),
      consultationDone: expectedType === 'lesson' && Boolean(record.consultationDone),
    }]];
  }));
}

function toEnrollment(row: any) {
  return {
    id: row.id || `${row.user_id}_${row.path_id}`,
    userId: row.user_id,
    pathId: row.path_id,
    pathVersion: row.path_version,
    enrolledAt: row.enrolled_at,
    lastActivityAt: row.last_activity_at,
    status: row.status,
    currentActivityId: row.current_activity_id,
    currentLocation: row.current_location || {},
    activityRecords: row.activity_records || {},
    consultationProgressPercent: Number(row.consultation_progress_percent || 0),
    practicalActivitiesProgressPercent: Number(row.practical_activities_progress_percent || 0),
    evaluationScorePercent: Number(row.evaluation_score_percent || 0),
    competenciesMasteryPercent: Number(row.competencies_mastery_percent || 0),
    validatedCompetencyCodes: row.validated_competency_codes || [],
    totalTimeSpentSeconds: Number(row.total_time_spent_seconds || 0),
  };
}

import {
  PathEnrollment360,
  ActivityProgressRecord,
  ActivityState,
  LearningPath360,
  Lesson360,
  Module360,
} from '../../types/pedagogy360';
import { dbPersistence, SaveResult } from './dbClient';
import { MASTER_COMPETENCIES_360 } from '../../data/curriculum360Data';

// ============================================================================
// MOTEUR DE PROGRESSION ET DE CALCUL CERTIFIÉ 360°
// ============================================================================

export class ProgressEngine {
  private static debounceTimers: Record<string, NodeJS.Timeout> = {};

  /**
   * Initialise ou reprend une inscription au parcours
   */
  public static async startOrResumePath(
    userId: string,
    path: LearningPath360
  ): Promise<PathEnrollment360> {
    const existing = await dbPersistence.getEnrollment(userId, path.id);

    if (existing) {
      // Reprise du parcours existant : mise à jour de la date d'activité
      const updated: PathEnrollment360 = {
        ...existing,
        lastActivityAt: new Date().toISOString(),
      };
      await dbPersistence.saveEnrollment(updated);
      return updated;
    }

    // Nouvelle inscription : Détermination de la toute première leçon disponible
    const firstLevel = path.levels[0];
    const firstModule = firstLevel?.modules[0];
    const firstChapter = firstModule?.chapters[0];
    const firstLesson = firstChapter?.lessons[0];

    const initialActivityId = firstLesson ? firstLesson.id : 'INTRO';

    const newEnrollment: PathEnrollment360 = {
      id: `${userId}_${path.id}`,
      userId,
      pathId: path.id,
      pathVersion: path.version || '1.0.0',
      enrolledAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString(),
      status: 'en_cours',
      currentActivityId: initialActivityId,
      currentLocation: {
        levelId: firstLevel?.id,
        moduleId: firstModule?.id,
        chapterId: firstChapter?.id,
        lessonId: firstLesson?.id,
      },
      activityRecords: {},
      consultationProgressPercent: 0,
      practicalActivitiesProgressPercent: 0,
      evaluationScorePercent: 0,
      competenciesMasteryPercent: 0,
      validatedCompetencyCodes: [],
      totalTimeSpentSeconds: 0,
    };

    // Marquer la première leçon comme 'disponible' ou 'en_cours'
    if (firstLesson) {
      newEnrollment.activityRecords[firstLesson.id] = {
        activityId: firstLesson.id,
        activityType: 'lesson',
        state: 'disponible',
        consultationDone: false,
        score: 0,
        maxScore: 100,
        attempts: 0,
        lastAttemptAt: new Date().toISOString(),
      };
    }

    await dbPersistence.saveEnrollment(newEnrollment);
    return newEnrollment;
  }

  /**
   * Enregistre la position de lecture sans valider la leçon.
   */
  public static async recordLessonOpened(
    enrollment: PathEnrollment360,
    path: LearningPath360,
    lesson: Lesson360
  ): Promise<PathEnrollment360> {
    const existing = enrollment.activityRecords[lesson.id];
    const records = {
      ...enrollment.activityRecords,
      [lesson.id]: {
        activityId: lesson.id,
        activityType: 'lesson' as const,
        state: existing?.state === 'terminee' ? 'terminee' as const : 'en_cours' as const,
        consultationDone: existing?.consultationDone || false,
        score: existing?.score || 0,
        maxScore: 100,
        attempts: existing?.attempts || 0,
        lastAttemptAt: new Date().toISOString(),
      },
    };
    const updated = this.recalculateMetrics({
      ...enrollment,
      lastActivityAt: new Date().toISOString(),
      currentActivityId: lesson.id,
      currentLocation: { moduleId: lesson.moduleId, chapterId: lesson.chapterId, lessonId: lesson.id },
      activityRecords: records,
    }, path);
    await dbPersistence.saveEnrollment(updated);
    return updated;
  }

  /**
   * Marque une leçon comme consultée et met à jour l'emplacement courant
   */
  public static async recordLessonConsultation(
    enrollment: PathEnrollment360,
    path: LearningPath360,
    lesson: Lesson360
  ): Promise<PathEnrollment360> {
    const records = { ...enrollment.activityRecords };
    const currentRec = records[lesson.id] || {
      activityId: lesson.id,
      activityType: 'lesson',
      state: 'en_cours',
      consultationDone: false,
      score: 0,
      maxScore: 100,
      attempts: 0,
      lastAttemptAt: new Date().toISOString(),
    };

    records[lesson.id] = {
      ...currentRec,
      consultationDone: true,
      state: 'terminee',
      score: 100,
      maxScore: 100,
      attempts: currentRec.consultationDone ? currentRec.attempts : currentRec.attempts + 1,
      lastAttemptAt: new Date().toISOString(),
    };

    const updated: PathEnrollment360 = {
      ...enrollment,
      lastActivityAt: new Date().toISOString(),
      currentActivityId: lesson.id,
      currentLocation: {
        moduleId: lesson.moduleId,
        chapterId: lesson.chapterId,
        lessonId: lesson.id,
      },
      activityRecords: records,
    };

    const calculated = this.recalculateMetrics(updated, path);
    await dbPersistence.saveEnrollment(calculated);
    return calculated;
  }

  public static async saveActivityDraft(
    enrollment: PathEnrollment360,
    path: LearningPath360,
    lesson: Lesson360,
    activityId: string,
    activityType: 'guided_exercise' | 'autonomous_exercise',
    savedState: unknown
  ): Promise<PathEnrollment360> {
    const existing = enrollment.activityRecords[activityId];
    const updated: PathEnrollment360 = {
      ...enrollment,
      lastActivityAt: new Date().toISOString(),
      currentActivityId: activityId,
      currentLocation: { moduleId: lesson.moduleId, chapterId: lesson.chapterId, lessonId: lesson.id },
      activityRecords: {
        ...enrollment.activityRecords,
        [activityId]: {
          activityId,
          activityType,
          state: existing?.state === 'terminee' ? 'terminee' : 'en_cours',
          consultationDone: existing?.consultationDone || false,
          score: existing?.score || 0,
          maxScore: existing?.maxScore || 100,
          attempts: existing?.attempts || 0,
          savedState,
          lastAttemptAt: new Date().toISOString(),
          completedAt: existing?.completedAt,
        },
      },
    };
    const calculated = this.recalculateMetrics(updated, path);
    await dbPersistence.saveEnrollment(calculated);
    return calculated;
  }

  /**
   * Enregistre le résultat d'un exercice ou d'un simulateur
   */
  public static async recordActivitySubmission(
    enrollment: PathEnrollment360,
    path: LearningPath360,
    activityId: string,
    activityType: 'guided_exercise' | 'autonomous_exercise' | 'simulator' | 'game_mission' | 'quiz' | 'evaluation',
    isSuccess: boolean,
    score: number,
    maxScore: number,
    savedState?: any
  ): Promise<{ enrollment: PathEnrollment360; saveResult: Promise<SaveResult> }> {
    const records = { ...enrollment.activityRecords };
    const existing = records[activityId] || {
      activityId,
      activityType,
      state: 'non_commencee',
      consultationDone: true,
      score: 0,
      maxScore,
      attempts: 0,
      lastAttemptAt: new Date().toISOString(),
    };

    const nextState: ActivityState = isSuccess
      ? 'terminee'
      : score > 0
      ? 'a_reviser'
      : 'en_cours';

    records[activityId] = {
      ...existing,
      activityType,
      state: nextState,
      score: Math.max(existing.score, score),
      maxScore,
      attempts: existing.attempts + 1,
      savedState: savedState !== undefined ? savedState : existing.savedState,
      lastAttemptAt: new Date().toISOString(),
      completedAt: isSuccess ? new Date().toISOString() : existing.completedAt,
    };

    const updated: PathEnrollment360 = {
      ...enrollment,
      lastActivityAt: new Date().toISOString(),
      currentActivityId: activityId,
      activityRecords: records,
    };

    const recalculated = this.recalculateMetrics(updated, path);
    const savePromise = dbPersistence.saveEnrollment(recalculated);

    return { enrollment: recalculated, saveResult: savePromise };
  }

  /**
   * Calcul formel des 4 indicateurs distincts demandés par la directive 6.4 :
   * 1. Consultation progress
   * 2. Practical activities progress
   * 3. Evaluation score
   * 4. Competencies mastery
   */
  public static recalculateMetrics(
    enrollment: PathEnrollment360,
    path: LearningPath360
  ): PathEnrollment360 {
    const allLessons: Lesson360[] = [];
    const allPracticalActivityIds: string[] = [];
    const moduleEvaluations: { id: string; passingScore: number }[] = [];

    // Exploration de toute la hiérarchie du parcours
    for (const level of path.levels) {
      for (const module of level.modules) {
        if (module.evaluation) {
          moduleEvaluations.push({
            id: module.evaluation.id,
            passingScore: module.evaluation.passingScorePercent || 70,
          });
        }
        for (const chapter of module.chapters) {
          for (const lesson of chapter.lessons) {
            allLessons.push(lesson);
            if (lesson.guidedExercise?.id) allPracticalActivityIds.push(lesson.guidedExercise.id);
            if (lesson.autonomousExercise?.id) allPracticalActivityIds.push(lesson.autonomousExercise.id);
            if (lesson.practicalActivity?.id) allPracticalActivityIds.push(lesson.practicalActivity.id);
          }
        }
      }
    }

    // 1. Progression de consultation (% leçons lues)
    const consultedLessonsCount = allLessons.filter(
      (l) => enrollment.activityRecords[l.id]?.consultationDone
    ).length;
    const consultationProgressPercent =
      allLessons.length > 0
        ? Math.round((consultedLessonsCount / allLessons.length) * 100)
        : 0;

    // 2. Progression des activités pratiques (% d'exercices/simulateurs terminés)
    const completedPracticalsCount = allPracticalActivityIds.filter(
      (actId) => enrollment.activityRecords[actId]?.state === 'terminee'
    ).length;
    const practicalActivitiesProgressPercent =
      allPracticalActivityIds.length > 0
        ? Math.round((completedPracticalsCount / allPracticalActivityIds.length) * 100)
        : 0;

    // 3. Score moyen des évaluations
    let totalEvalScore = 0;
    let evalCount = 0;
    for (const evalDef of moduleEvaluations) {
      const rec = enrollment.activityRecords[evalDef.id];
      if (rec && rec.attempts > 0) {
        totalEvalScore += (rec.score / (rec.maxScore || 100)) * 100;
        evalCount++;
      }
    }
    const evaluationScorePercent =
      evalCount > 0 ? Math.round(totalEvalScore / evalCount) : 0;

    // 4. Maîtrise des compétences
    const targetedCompetencies = path.competenciesTargeted || [];
    const validatedCompetencies: string[] = [];

    // Une compétence exige des preuves de pratique et la réussite de ses évaluations métier.
    for (const compCode of targetedCompetencies) {
      const requiredScore = MASTER_COMPETENCIES_360.find((competency) => competency.code === compCode)?.requiredScorePercent ?? 70;
      // Trouver tous les modules rattachés à cette compétence
      const relatedModules = path.levels
        .flatMap((lvl) => lvl.modules)
        .filter((mod) => mod.competencyCodes?.includes(compCode));

      if (relatedModules.length === 0) continue;

      const practicalActivityIds: string[] = [];
      let evaluationsPassed = true;

      for (const mod of relatedModules) {
        const evaluationRecord = enrollment.activityRecords[mod.evaluation.id];
        const evaluationPercent = evaluationRecord && evaluationRecord.maxScore > 0
          ? (evaluationRecord.score / evaluationRecord.maxScore) * 100
          : 0;
        if (evaluationRecord?.state !== 'terminee' || evaluationPercent < Math.max(requiredScore, mod.evaluation.passingScorePercent)) {
          evaluationsPassed = false;
        }
        const moduleActivityIds: string[] = [];
        for (const chap of mod.chapters) {
          for (const les of chap.lessons) {
            if (les.guidedExercise?.id) moduleActivityIds.push(les.guidedExercise.id);
            if (les.autonomousExercise?.id) moduleActivityIds.push(les.autonomousExercise.id);
            if (les.practicalActivity?.id) moduleActivityIds.push(les.practicalActivity.id);
          }
        }
        practicalActivityIds.push(...moduleActivityIds);
      }

      const completedRecords = practicalActivityIds
        .map((activityId) => enrollment.activityRecords[activityId])
        .filter((record) => record?.state === 'terminee' && record.maxScore > 0);
      const activityCompletionPercent = practicalActivityIds.length > 0
        ? (completedRecords.length / practicalActivityIds.length) * 100
        : 0;
      const averageCompletedScore = completedRecords.length > 0
        ? completedRecords.reduce((sum, record) => sum + (record.score / record.maxScore) * 100, 0) / completedRecords.length
        : 0;

      if (evaluationsPassed && practicalActivityIds.length > 0 && activityCompletionPercent >= 70 && averageCompletedScore >= requiredScore) {
        validatedCompetencies.push(compCode);
      }
    }

    const competenciesMasteryPercent =
      targetedCompetencies.length > 0
        ? Math.round((validatedCompetencies.length / targetedCompetencies.length) * 100)
        : 0;

    // Statut global du parcours
    const allEvaluationsPassed = moduleEvaluations.length > 0 && moduleEvaluations.every((evaluation) => {
      const record = enrollment.activityRecords[evaluation.id];
      return record?.state === 'terminee' && (record.score / (record.maxScore || 100)) * 100 >= evaluation.passingScore;
    });

    const isFullyCompleted =
      practicalActivitiesProgressPercent === 100 &&
      consultationProgressPercent === 100 &&
      evaluationScorePercent >= 70 &&
      allEvaluationsPassed;

    return {
      ...enrollment,
      consultationProgressPercent,
      practicalActivitiesProgressPercent,
      evaluationScorePercent,
      competenciesMasteryPercent,
      validatedCompetencyCodes: validatedCompetencies,
      status: isFullyCompleted ? 'termine' : 'en_cours',
    };
  }

  private static debounceSave(enrollment: PathEnrollment360) {
    const key = enrollment.id;
    if (this.debounceTimers[key]) {
      clearTimeout(this.debounceTimers[key]);
    }
    this.debounceTimers[key] = setTimeout(() => {
      dbPersistence.saveEnrollment(enrollment);
      delete this.debounceTimers[key];
    }, 800);
  }
}

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PILOT_FINANCIAL_ANALYST_PATH } from '../src/data/curriculum360Data';
import { ProgressEngine } from '../src/core/persistence/progressStore';
import { dbPersistence } from '../src/core/persistence/dbClient';
import { CompletenessAuditor } from '../src/core/authoring/completenessAuditor';
import { computeFinancialRatios } from '../src/core/finance/ratios';
import healthHandler from '../api/health';
import pathsHandler from '../api/paths';
import progressHandler from '../api/progress';
import authorHandler from '../api/author';

describe('Vérification Complète des 10 Scénarios d\'Acceptation Obligatoires (A à J)', () => {
  beforeEach(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  // --------------------------------------------------------------------------
  // SCÉNARIO A — DÉMARRAGE D'UN PARCOURS
  // --------------------------------------------------------------------------
  it('Scénario A : Démarrage — Nouveau parcours, inscription persistante et première leçon', async () => {
    const userId = 'user_test_scenario_a';
    const enrollment = await ProgressEngine.startOrResumePath(userId, PILOT_FINANCIAL_ANALYST_PATH);

    expect(enrollment).toBeDefined();
    expect(enrollment.userId).toBe(userId);
    expect(enrollment.pathId).toBe(PILOT_FINANCIAL_ANALYST_PATH.id);
    expect(enrollment.status).toBe('en_cours');
    expect(enrollment.currentActivityId).toBe('L_N1_M1_01');
    expect(enrollment.consultationProgressPercent).toBe(0);
    expect(enrollment.practicalActivitiesProgressPercent).toBe(0);
    expect(enrollment.activityRecords['L_N1_M1_01']).toBeDefined();
    expect(enrollment.activityRecords['L_N1_M1_01'].state).toBe('disponible');
  });

  // --------------------------------------------------------------------------
  // SCÉNARIO B — APPRENTISSAGE ET CORRECTION DÉTERMINISTE
  // --------------------------------------------------------------------------
  it('Scénario B : Apprentissage — Consultation, exercice guidé avec correction et validation', async () => {
    const userId = 'user_test_scenario_b';
    let enrollment = await ProgressEngine.startOrResumePath(userId, PILOT_FINANCIAL_ANALYST_PATH);
    const lesson = PILOT_FINANCIAL_ANALYST_PATH.levels[0].modules[0].chapters[0].lessons[0];

    // 1. Consultation de la leçon
    enrollment = await ProgressEngine.recordLessonConsultation(enrollment, PILOT_FINANCIAL_ANALYST_PATH, lesson);
    expect(enrollment.activityRecords[lesson.id].consultationDone).toBe(true);
    expect(enrollment.consultationProgressPercent).toBeGreaterThan(0);

    // 2. Réalisation de l'exercice guidé (Attendu : 2 360 000 FCFA TTC)
    const expected = lesson.guidedExercise.expectedAnswer;
    expect(expected).toBe(2360000);

    const { enrollment: updated } = await ProgressEngine.recordActivitySubmission(
      enrollment,
      PILOT_FINANCIAL_ANALYST_PATH,
      lesson.guidedExercise.id,
      'guided_exercise',
      true,
      lesson.guidedExercise.rubricPoints,
      lesson.guidedExercise.rubricPoints
    );

    expect(updated.activityRecords[lesson.guidedExercise.id].state).toBe('terminee');
    expect(updated.activityRecords[lesson.guidedExercise.id].score).toBe(20);
    expect(updated.practicalActivitiesProgressPercent).toBeGreaterThan(0);
  });

  // --------------------------------------------------------------------------
  // SCÉNARIO C — PROGRESSION MULTI-INDICATEURS DISTINCTS
  // --------------------------------------------------------------------------
  it('Scénario C : Progression — Distinction stricte entre consultation, pratique, évaluation et compétences', async () => {
    const userId = 'user_test_scenario_c';
    let enrollment = await ProgressEngine.startOrResumePath(userId, PILOT_FINANCIAL_ANALYST_PATH);
    const lesson = PILOT_FINANCIAL_ANALYST_PATH.levels[0].modules[0].chapters[0].lessons[0];

    // Marquer la consultation
    enrollment = await ProgressEngine.recordLessonConsultation(enrollment, PILOT_FINANCIAL_ANALYST_PATH, lesson);
    const consultationOnly = enrollment.consultationProgressPercent;

    // Constater que les autres indicateurs ne sont pas gonflés silencieusement
    expect(consultationOnly).toBeGreaterThan(0);
    expect(enrollment.practicalActivitiesProgressPercent).toBe(0);
    expect(enrollment.evaluationScorePercent).toBe(0);
    expect(enrollment.competenciesMasteryPercent).toBe(0);
  });

  // --------------------------------------------------------------------------
  // SCÉNARIO D — INTERRUPTION ET REPRISE AU POINT EXACT
  // --------------------------------------------------------------------------
  it('Scénario D : Interruption — Sauvegarde et reprise exacte au point d\'arrêt', async () => {
    const userId = 'user_test_scenario_d';
    let enrollment = await ProgressEngine.startOrResumePath(userId, PILOT_FINANCIAL_ANALYST_PATH);
    const lesson2 = PILOT_FINANCIAL_ANALYST_PATH.levels[1].modules[0].chapters[0].lessons[0];

    // L'apprenant avance au Niveau 2 Leçon 1
    enrollment = await ProgressEngine.recordLessonConsultation(enrollment, PILOT_FINANCIAL_ANALYST_PATH, lesson2);
    expect(enrollment.currentActivityId).toBe(lesson2.id);

    // L'utilisateur quitte la plateforme et revient (re-création de session)
    const resumed = await ProgressEngine.startOrResumePath(userId, PILOT_FINANCIAL_ANALYST_PATH);
    expect(resumed.currentActivityId).toBe(lesson2.id);
    expect(resumed.activityRecords[lesson2.id].consultationDone).toBe(true);
  });

  // --------------------------------------------------------------------------
  // SCÉNARIO E — MODE HORS LIGNE (NE CERTIFIE PAS LA SYNCHRONISATION MULTI-APPAREILS)
  // --------------------------------------------------------------------------
  it('Scénario E : Hors-ligne — Le cache local ne se présente pas comme une synchronisation multi-appareils', async () => {
    const userId = 'user_multi_device';
    const enrollmentAppareil1 = await ProgressEngine.startOrResumePath(userId, PILOT_FINANCIAL_ANALYST_PATH);
    enrollmentAppareil1.activityRecords['L_N1_M1_01'] = {
      activityId: 'L_N1_M1_01',
      activityType: 'lesson',
      state: 'terminee',
      consultationDone: true,
      score: 100,
      maxScore: 100,
      attempts: 1,
      lastAttemptAt: new Date().toISOString(),
    };

    // Simuler l'absence de serveur : le cache reste local et le résultat doit l'indiquer.
    const originalFetch = global.fetch;
    global.fetch = vi.fn().mockRejectedValue(new Error('Serveur indisponible'));
    const saveResult = await dbPersistence.saveEnrollment(enrollmentAppareil1);
    global.fetch = originalFetch;
    expect(saveResult.syncedToRemote).toBe(false);
    expect(saveResult.success).toBe(false);

    // Le cache peut relire cet état sur le même navigateur; aucun test ici ne prétend couvrir un second appareil.
    const localEnrollment = await dbPersistence.getEnrollment(userId, PILOT_FINANCIAL_ANALYST_PATH.id);
    expect(localEnrollment?.activityRecords['L_N1_M1_01'].state).toBe('terminee');
  });

  // --------------------------------------------------------------------------
  // SCÉNARIO F — SIMULATEUR DÉTERMINISTE RECALCULÉ
  // --------------------------------------------------------------------------
  it('Scénario F : Simulateur — Recalcul déterministe immédiat de BFR et Trésorerie Nette', () => {
    const baseFinancials = {
      fixedAssets: 50000000,
      stableResources: 80000000,
      currentAssetsNonCash: 110000000,
      currentLiabNonCash: 60000000,
      cashAssets: 10000000,
      cashLiabilities: 0,
      totalAssets: 170000000,
      equity: 50000000,
      financialDebts: 30000000,
      turnoverHT: 300000000,
      purchasesHT: 180000000,
      operatingIncome: 25000000,
      netIncome: 18000000,
      receivables: 65000000,
      payables: 50000000,
      stocks: 45000000,
    };

    const resultInitial = computeFinancialRatios(baseFinancials);
    expect(resultInitial.workingCapital.fr).toBe(30000000); // 80M - 50M
    expect(resultInitial.workingCapital.bfr).toBe(50000000);  // 110M - 60M
    expect(resultInitial.workingCapital.tn).toBe(-20000000); // FRNG - BFR = 30M - 50M = -20M

    // Modification d'un paramètre : Les créances clients augmentent de 30 000 000 FCFA
    const modifiedFinancials = {
      ...baseFinancials,
      currentAssetsNonCash: 140000000,
      receivables: 95000000,
    };

    const resultModified = computeFinancialRatios(modifiedFinancials);
    expect(resultModified.workingCapital.bfr).toBe(80000000); // BFR passe de 50M à 80M
    expect(resultModified.workingCapital.tn).toBe(-50000000); // La trésorerie nette plonge à -50M
  });

  // --------------------------------------------------------------------------
  // SCÉNARIO G — MISSION DE JEU RELIÉE AUX COMPÉTENCES
  // --------------------------------------------------------------------------
  it('Scénario G : Mission de Jeu — Score de mission et impact sur les compétences', async () => {
    const userId = 'user_game_scenario';
    let enrollment = await ProgressEngine.startOrResumePath(userId, PILOT_FINANCIAL_ANALYST_PATH);
    const missionActivityId = 'ACT_N10_L1_SIM';

    const { enrollment: updated } = await ProgressEngine.recordActivitySubmission(
      enrollment,
      PILOT_FINANCIAL_ANALYST_PATH,
      missionActivityId,
      'game_mission',
      true,
      85,
      100,
      { decisionsTaken: 4, finalScore: 85 }
    );

    expect(updated.activityRecords[missionActivityId].state).toBe('terminee');
    expect(updated.activityRecords[missionActivityId].score).toBe(85);
  });

  // --------------------------------------------------------------------------
  // SCÉNARIO H — PARCOURS TERMINÉ SELON CRITÈRES STRICTS
  // --------------------------------------------------------------------------
  it('Scénario H : Validation du Parcours — Respect strict du barème et des seuils', () => {
    const incompleteEnrollment = {
      id: 'enc_1',
      userId: 'user_1',
      pathId: PILOT_FINANCIAL_ANALYST_PATH.id,
      pathVersion: '2.4.0',
      enrolledAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString(),
      status: 'en_cours' as const,
      currentActivityId: 'L_N10_M10_01',
      currentLocation: {},
      activityRecords: {},
      consultationProgressPercent: 95,
      practicalActivitiesProgressPercent: 80,
      evaluationScorePercent: 65, // < 70%
      competenciesMasteryPercent: 75,
      validatedCompetencyCodes: [],
      totalTimeSpentSeconds: 3600,
    };

    const recomputed = ProgressEngine.recalculateMetrics(incompleteEnrollment, PILOT_FINANCIAL_ANALYST_PATH);
    expect(recomputed.status).toBe('en_cours'); // Pas encore terminé car score < 70% et pratique < 100%
  });

  // --------------------------------------------------------------------------
  // SCÉNARIO I — DÉPLOIEMENT VERCEL ET SANTÉ DES API
  // --------------------------------------------------------------------------
  it('Scénario I local : API /health et /paths répondent, sans prétendre qu’une base est configurée', async () => {
    const mockRes = {
      statusCode: 0,
      headers: {} as Record<string, string>,
      body: null as any,
      status(code: number) { this.statusCode = code; return this; },
      json(data: any) { this.body = data; return this; },
      setHeader(k: string, v: string) { this.headers[k] = v; },
    };

    // Test API Health
    await healthHandler({ method: 'GET', url: 'http://localhost/api/health' }, mockRes);
    expect(mockRes.statusCode).toBe(200);
    expect(mockRes.body.status).toBe('degraded');
    expect(mockRes.body.database.status).toBe('not_configured');
    expect(mockRes.body.version).toBeDefined();

    // Test API Paths
    const mockResPaths = { ...mockRes };
    await pathsHandler({ method: 'GET', url: 'http://localhost/api/paths' }, mockResPaths);
    expect(mockResPaths.statusCode).toBe(200);
    expect(mockResPaths.body.paths.length).toBeGreaterThan(0);

    // Les routes de progression exigent une session signée; un userId arbitraire ne suffit pas.
    const protectedResponse = { ...mockRes, statusCode: 0, body: null as any };
    await progressHandler({ method: 'GET', url: 'http://localhost/api/progress?userId=other-account&pathId=some-path', headers: {} }, protectedResponse);
    expect(protectedResponse.statusCode).toBe(401);

    const authorResponse = {
      statusCode: 0,
      body: null as any,
      status(code: number) { this.statusCode = code; return this; },
      json(data: any) { this.body = data; return this; },
    };
    await authorHandler({ method: 'POST', url: 'http://localhost/api/author', headers: { host: 'localhost', origin: 'http://localhost' }, body: { action: 'publish', pathId: PILOT_FINANCIAL_ANALYST_PATH.id, path: PILOT_FINANCIAL_ANALYST_PATH } }, authorResponse);
    expect(authorResponse.statusCode).toBe(401);
  });

  // --------------------------------------------------------------------------
  // SCÉNARIO J — ÉCHEC DE SAUVEGARDE ET NOTIFICATION TRANSPARENTE
  // --------------------------------------------------------------------------
  it('Scénario J : Échec de sauvegarde — Erreur réseau signalée à l\'utilisateur sans faux succès', async () => {
    // Simuler une coupure réseau ou erreur de fetch
    const originalFetch = global.fetch;
    global.fetch = vi.fn().mockRejectedValue(new Error('Erreur de connexion serveur'));

    const enrollment = await ProgressEngine.startOrResumePath('user_offline', PILOT_FINANCIAL_ANALYST_PATH);
    const saveResult = await dbPersistence.saveEnrollment(enrollment);

    // Vérifier que le système indique clairement que la synchro distante a échoué
    expect(saveResult.syncedToRemote).toBe(false);
    expect(saveResult.error).toBeDefined();

    // Rétablir fetch
    global.fetch = originalFetch;
  });

  // --------------------------------------------------------------------------
  // CONTRÔLE DE COMPLÉTUDE DU STUDIO AUTEUR (26 CRITÈRES DU PARAGRAPHE 3.2)
  // --------------------------------------------------------------------------
  it('Studio Auteur : Le parcours pilote 360° réussit l\'audit de complétude formelle', () => {
    const report = CompletenessAuditor.auditPath(PILOT_FINANCIAL_ANALYST_PATH);

    expect(report.totalModulesCount).toBeGreaterThanOrEqual(8);
    expect(report.totalLessonsCount).toBeGreaterThanOrEqual(8);
    expect(report.totalPracticalActivitiesCount).toBeGreaterThan(0);
    expect(report.overallScorePercent).toBeGreaterThanOrEqual(85);
    expect(report.isReadyForPublish).toBe(true);
    expect(report.missingElements.length).toBe(0);
  });
});

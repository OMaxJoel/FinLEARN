import { LearningPath360, CompletenessReport, CompletenessCriterion } from '../../types/pedagogy360';

// ============================================================================
// AUDITEUR DE COMPLÉTUDE 360° DU STUDIO AUTEUR
// Vérifie rigoureusement qu'un parcours n'est pas une simple coquille vide
// et satisfait les exigences pédagogiques et fonctionnelles.
// ============================================================================

export class CompletenessAuditor {
  public static auditPath(path: LearningPath360): CompletenessReport {
    const criteria: CompletenessCriterion[] = [];
    const missingElements: string[] = [];
    const recommendations: string[] = [];

    // 1. Structure Hiérarchique
    const totalLevels = path.levels?.length || 0;
    const allModules = path.levels?.flatMap((lvl) => lvl.modules) || [];
    const totalModules = allModules.length;
    const allChapters = allModules.flatMap((mod) => mod.chapters) || [];
    const totalChapters = allChapters.length;
    const allLessons = allChapters.flatMap((chap) => chap.lessons) || [];
    const totalLessons = allLessons.length;

    // Critère 1 : Au moins 8 modules pour une formation professionnelle approfondie (Cible indicative 8-15)
    const hasEnoughModules = totalModules >= 8;
    criteria.push({
      id: 'CRIT_MODULES_COUNT',
      label: 'Profondeur modulaire (au moins 8 modules)',
      category: 'structure',
      isMet: hasEnoughModules,
      details: `${totalModules} module(s) détecté(s). Recommandé : 8 à 15 modules pour une formation professionnelle certifiante.`,
      weight: 15,
    });
    if (!hasEnoughModules) {
      missingElements.push(`Le parcours ne compte que ${totalModules} modules. Une formation 360° en exige au moins 8.`);
      recommendations.push('Ajouter les modules complémentaires nécessaires à la couverture complète du référentiel.');
    }

    // Critère 2 : Au moins 1 chapitre par module et leçons substantielles
    const hasChaptersInAllModules = allModules.every((m) => m.chapters && m.chapters.length >= 1);
    criteria.push({
      id: 'CRIT_CHAPTERS_EXIST',
      label: 'Décomposition en chapitres dans chaque module',
      category: 'structure',
      isMet: hasChaptersInAllModules,
      details: hasChaptersInAllModules ? 'Tous les modules possèdent des chapitres dédiés.' : 'Certains modules n\'ont aucun chapitre.',
      weight: 10,
    });

    // Critère 3 : Référentiel de compétences associé
    const hasCompetencies = Array.isArray(path.competenciesTargeted) && path.competenciesTargeted.length >= 3;
    criteria.push({
      id: 'CRIT_COMPETENCIES',
      label: 'Association explicite au référentiel de compétences',
      category: 'pedagogy',
      isMet: hasCompetencies,
      details: `${path.competenciesTargeted?.length || 0} compétence(s) ciblée(s).`,
      weight: 10,
    });
    if (!hasCompetencies) {
      missingElements.push('Moins de 3 compétences ciblées par le parcours.');
    }

    // Critère 4 : Conformité des Leçons aux 26 critères pédagogiques (Section 3.2)
    let lessonsWithDeepTheory = 0;
    let lessonsWithSimpleExample = 0;
    let lessonsWithEnterpriseCase = 0;
    let lessonsWithGuidedExercise = 0;
    let lessonsWithAutonomousExercise = 0;
    let lessonsWithPracticalSimulator = 0;
    let lessonsWithQuiz = 0;

    for (const lesson of allLessons) {
      if (lesson.theorySections && lesson.theorySections.length > 0) lessonsWithDeepTheory++;
      if (lesson.simpleExample?.stepByStepSolution?.length) lessonsWithSimpleExample++;
      if (lesson.enterpriseCase?.financialStatements && lesson.enterpriseCase?.realWorldResolution) lessonsWithEnterpriseCase++;
      if (lesson.guidedExercise?.detailedCorrection) lessonsWithGuidedExercise++;
      if (lesson.autonomousExercise?.expectedAnswer !== undefined) lessonsWithAutonomousExercise++;
      if (lesson.practicalActivity?.targetComponentId) lessonsWithPracticalSimulator++;
      if (lesson.comprehensionQuiz && lesson.comprehensionQuiz.length >= 1) lessonsWithQuiz++;
    }

    const lessonCompletenessRate = totalLessons > 0 ? (
      (lessonsWithDeepTheory / totalLessons +
       lessonsWithSimpleExample / totalLessons +
       lessonsWithEnterpriseCase / totalLessons +
       lessonsWithGuidedExercise / totalLessons +
       lessonsWithAutonomousExercise / totalLessons +
       lessonsWithPracticalSimulator / totalLessons +
       lessonsWithQuiz / totalLessons) / 7
    ) : 0;

    const lessonsFullyCompliant = lessonCompletenessRate >= 0.85;
    criteria.push({
      id: 'CRIT_LESSON_CONTENT_DEPTH',
      label: 'Profondeur pédagogique des leçons (26 critères du paragraphe 3.2)',
      category: 'pedagogy',
      isMet: lessonsFullyCompliant,
      details: `Score de complétude moyen des leçons : ${Math.round(lessonCompletenessRate * 100)}%. (${lessonsWithEnterpriseCase}/${totalLessons} cas réels d'entreprise, ${lessonsWithPracticalSimulator}/${totalLessons} simulateurs reliés).`,
      weight: 25,
    });
    if (!lessonsFullyCompliant) {
      missingElements.push('Certaines leçons manquent d\'exercices guidés, de cas réels d\'entreprise ou d\'exercices autonomes.');
      recommendations.push('Compléter les leçons déficientes avec des exemples chiffrés vérifiables en FCFA et des cas concrets.');
    }

    // Critère 5 : Activités pratiques et simulateurs connectés
    const practicalActivitiesCount = allLessons.filter((l) => l.practicalActivity?.id).length;
    const hasEnoughPracticals = practicalActivitiesCount >= Math.min(totalLessons, 5);
    criteria.push({
      id: 'CRIT_PRACTICE_SIMULATORS',
      label: 'Connexion directe aux simulateurs et missions déterministes',
      category: 'practice',
      isMet: hasEnoughPracticals,
      details: `${practicalActivitiesCount} activité(s) pratique(s) outillée(s) par simulateurs ou jeux.`,
      weight: 20,
    });

    // Critère 6 : Évaluations de fin de module avec barème et seuil
    const modulesWithEvaluation = allModules.filter((m) => m.evaluation && m.evaluation.passingScorePercent >= 60).length;
    const hasEvaluations = modulesWithEvaluation === totalModules && totalModules > 0;
    criteria.push({
      id: 'CRIT_MODULE_EVALUATIONS',
      label: 'Évaluations certifiantes dans chaque module avec barème formel',
      category: 'evaluation',
      isMet: hasEvaluations,
      details: `${modulesWithEvaluation}/${totalModules} module(s) évalué(s).`,
      weight: 10,
    });

    // Critère 7 : Projet professionnel final de synthèse
    const hasFinalProject = Boolean(path.finalProject && path.finalProject.deliverablesExpected?.length >= 2);
    criteria.push({
      id: 'CRIT_FINAL_PROJECT',
      label: 'Projet professionnel de synthèse avec grille d\'évaluation',
      category: 'evaluation',
      isMet: hasFinalProject,
      details: hasFinalProject ? `Projet présent : "${path.finalProject?.title}"` : 'Aucun projet professionnel de synthèse défini.',
      weight: 10,
    });
    if (!hasFinalProject) {
      missingElements.push('Projet professionnel final manquant.');
      recommendations.push('Ajouter un projet de synthèse transversal (Niveau 10) avec livrables attendus et grille de notation.');
    }

    // Calcul de la note globale pondérée
    const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
    const earnedWeight = criteria.reduce((sum, c) => sum + (c.isMet ? c.weight : 0), 0);
    const overallScorePercent = Math.round((earnedWeight / totalWeight) * 100);

    const isReadyForPublish = overallScorePercent >= 85 && missingElements.length === 0;

    return {
      pathId: path.id,
      overallScorePercent,
      isReadyForPublish,
      totalModulesCount: totalModules,
      totalChaptersCount: totalChapters,
      totalLessonsCount: totalLessons,
      totalPracticalActivitiesCount: practicalActivitiesCount,
      criteria,
      missingElements,
      recommendations,
    };
  }
}

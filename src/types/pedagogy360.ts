import { NavigationTab } from '../components/common/Sidebar';

// ============================================================================
// 1. STRUCTURE HIÉRARCHIQUE 360°
// Domaine → Parcours → Niveau → Module → Chapitre → Leçon → Activité pratique 
// → Simulateur ou mission → Évaluation → Validation de la compétence
// ============================================================================

export type DomainType = 
  | 'finance'
  | 'comptabilite'
  | 'controle'
  | 'tresorerie'
  | 'excel'
  | 'assurance'
  | 'consolidation';

export type ActivityState = 
  | 'non_commencee'
  | 'disponible'
  | 'en_cours'
  | 'en_attente_validation'
  | 'terminee'
  | 'a_reviser'
  | 'bloquee';

export type DifficultyLevel = 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';

export interface CompetencyRef {
  code: string;
  domain: DomainType;
  title: string;
  description: string;
  requiredScorePercent: number; // ex: 75%
  subCompetencies: string[];
}

// ----------------------------------------------------------------------------
// 2. LEÇON 360° AVEC LES 26 COMPOSANTS PÉDAGOGIQUES
// ----------------------------------------------------------------------------

export interface DeepTheorySection {
  title: string;
  content: string;
  keyDefinitions?: { term: string; definition: string }[];
  rulesAndPrinciples?: string[];
  formulas?: {
    name: string;
    formula: string;
    interpretation: string;
    syscohadaRef?: string;
  }[];
  commonMistakes?: string[];
  professionalBestPractices?: string[];
  memorizationTips?: string[];
  visualDiagram?: {
    type: 'flowchart' | 't_account' | 'table' | 'financial_statement';
    data: any;
    caption: string;
  };
}

export interface SolvedExampleCase {
  title: string;
  context?: string;
  scenario?: string;
  dataset: Record<string, any>;
  stepByStepSolution: {
    step: number;
    action: string;
    calculation?: string;
    justification: string;
  }[];
}

export interface RealWorldEnterpriseCase {
  companyName: string;
  locationContext: string; // Ex: Abidjan, Zone Industrielle Vridi, PME Agroalimentaire FCFA
  sector: string;
  currency: string;
  problemStatement: string;
  financialStatements: Record<string, any>;
  realWorldResolution: string;
  recommendationToBoard: string;
}

export interface GuidedExercise {
  id: string;
  title: string;
  instruction: string;
  dataset: any;
  stepByStepGuidance?: string[];
  stepByStepHelp?: string[];
  expectedAnswer: any;
  detailedCorrection: string;
  rubricPoints: number;
}

export interface AutonomousExercise {
  id: string;
  title: string;
  instruction: string;
  dataset: any;
  hints: string[];
  expectedAnswer: any;
  detailedCorrection: string;
  rubricPoints: number;
}

export interface PracticalActivityRef {
  id: string;
  title: string;
  type: 'simulator' | 'game_mission' | 'interactive_lab' | 'case_study';
  targetComponentId: 
    | 'accounting_simulator'
    | 'financial_analysis_lab'
    | 'excel_lab'
    | 'variance_simulator'
    | 'investment_simulator'
    | 'treasury_simulator'
    | 'brokerage_simulator'
    | 'consolidation_cockpit'
    | 'breakeven_simulator'
    | 'pivot_lab'
    | 'game_mission';
  missionId?: string;
  presetConfig?: Record<string, any>;
  completionCriteria: {
    metric: string;
    targetValue: any;
    description: string;
  };
  assessment?: {
    prompt: string;
    expectedAnswer: number;
    tolerance?: number;
    correction: string;
    unit?: string;
  };
  rubricPoints: number;
}

export interface ComprehensionQuizItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson360 {
  id: string;
  chapterId: string;
  moduleId: string;
  pathId: string;
  title: string;
  durationMinutes: number;
  difficulty: DifficultyLevel;
  objectives: string[];
  prerequisites: string[];
  contextIntro: string;
  theorySections: DeepTheorySection[];
  simpleExample: SolvedExampleCase;
  intermediateExample: SolvedExampleCase;
  enterpriseCase: RealWorldEnterpriseCase;
  guidedExercise: GuidedExercise;
  autonomousExercise: AutonomousExercise;
  practicalActivity: PracticalActivityRef;
  comprehensionQuiz: ComprehensionQuizItem[];
  keyTakeawaySummary: string[];
  nextStepRecommendation: string;
}

// ----------------------------------------------------------------------------
// 3. CHAPITRES, MODULES & NIVEAUX
// ----------------------------------------------------------------------------

export interface Chapter360 {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  lessons: Lesson360[];
}

export interface ModuleEvaluation {
  id: string;
  moduleId: string;
  title: string;
  passingScorePercent: number; // seuil de validation
  timeLimitMinutes?: number;
  questions: ComprehensionQuizItem[];
  practicalCase?: AutonomousExercise;
}

export interface Module360 {
  id: string;
  levelId: string;
  pathId: string;
  moduleNumber: number;
  title: string;
  description: string;
  competencyCodes: string[];
  durationHours: number;
  chapters: Chapter360[];
  evaluation: ModuleEvaluation;
}

export interface Level360 {
  id: string;
  pathId: string;
  levelNumber: number;
  title: string;
  description: string;
  targetMastery: string;
  modules: Module360[];
}

export interface FinalProjectSpec {
  id: string;
  title: string;
  businessScenario: string;
  companyContext: string;
  deliverablesExpected: string[];
  gradingRubric: { criterion: string; weightPercent: number; description: string }[];
  passingScorePercent: number;
}

export interface LearningPath360 {
  id: string;
  domainId: DomainType;
  title: string;
  tagline: string;
  description: string;
  targetRole: string;
  levelBadge: string;
  color: string;
  iconName: string;
  version: string;
  status: 'draft' | 'published' | 'archived';
  estimatedHours: number;
  prerequisites: string[];
  competenciesTargeted: string[];
  initialDiagnosticId?: string;
  finalProject?: FinalProjectSpec;
  levels: Level360[];
  completenessScore?: number; // 0-100% vérifié par le Studio Auteur
  completenessChecklist?: CompletenessReport;
}

// ----------------------------------------------------------------------------
// 4. PROGRESSION PERSISTANTE & ÉTATS D'APPRENANT
// ----------------------------------------------------------------------------

export interface ActivityProgressRecord {
  activityId: string;
  activityType: 'lesson' | 'guided_exercise' | 'autonomous_exercise' | 'simulator' | 'game_mission' | 'quiz' | 'evaluation';
  state: ActivityState;
  consultationDone: boolean;
  score: number;
  maxScore: number;
  attempts: number;
  savedState?: any;
  lastAttemptAt: string;
  completedAt?: string;
}

export interface PathEnrollment360 {
  id: string;
  userId: string;
  pathId: string;
  pathVersion: string;
  enrolledAt: string;
  lastActivityAt: string;
  status: 'en_cours' | 'termine' | 'suspendu';
  currentActivityId: string; // Prochaine activité ou dernière activité ouverte
  currentLocation: {
    levelId?: string;
    moduleId?: string;
    chapterId?: string;
    lessonId?: string;
  };
  activityRecords: Record<string, ActivityProgressRecord>;
  
  // 4 Indicateurs distincts rigoureusement calculés
  consultationProgressPercent: number;    // % leçons lues
  practicalActivitiesProgressPercent: number; // % exercices/simulateurs validés
  evaluationScorePercent: number;         // Score moyen pondéré aux évaluations
  competenciesMasteryPercent: number;     // % compétences avec score >= seuil

  validatedCompetencyCodes: string[];
  totalTimeSpentSeconds: number;
}

export interface SyncStatus {
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncedAt: string | null;
  pendingChangesCount: number;
  hasSyncError: boolean;
  syncErrorMessage?: string;
}

// ----------------------------------------------------------------------------
// 5. STUDIO AUTEUR ET GRILLE DE COMPLÉTUDE
// ----------------------------------------------------------------------------

export interface CompletenessCriterion {
  id: string;
  label: string;
  category: 'structure' | 'pedagogy' | 'practice' | 'evaluation';
  isMet: boolean;
  details: string;
  weight: number;
}

export interface CompletenessReport {
  pathId: string;
  overallScorePercent: number;
  isReadyForPublish: boolean;
  totalModulesCount: number;
  totalChaptersCount: number;
  totalLessonsCount: number;
  totalPracticalActivitiesCount: number;
  criteria: CompletenessCriterion[];
  missingElements: string[];
  recommendations: string[];
}

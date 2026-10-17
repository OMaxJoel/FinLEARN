export type CareerGoal =
  | 'analyste_financier'
  | 'comptable_junior'
  | 'controleur_gestion'
  | 'tresorier'
  | 'courtier_assurance'
  | 'directeur_pme';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'apprenant' | 'formateur' | 'admin';
  careerGoal: CareerGoal;
  experienceLevel: 'debutant' | 'intermediaire' | 'avance';
  weeklyHours: number;
  totalXp: number;
  completedLessons: string[];
  completedExercises: string[];
  completedMissions: string[];
}

export interface CompetencyScore {
  code: string;
  domain: string;
  title: string;
  level: number; // 0 à 100%
  status: 'non_debute' | 'en_cours' | 'maitrise';
}

export interface DiagnosticQuestion {
  id: string;
  domain: string;
  competencyCode: string;
  question: string;
  context?: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface LearningObjective {
  id: string;
  label: string;
  achieved?: boolean;
}

export interface LessonContent {
  id: string;
  moduleId: string;
  pathId: string;
  title: string;
  durationMinutes: number;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  objectives: string[];
  theorySections: {
    title: string;
    content: string;
    keyTakeaway?: string;
    syscohadaRef?: string;
  }[];
  solvedExample: {
    context: string;
    data: Record<string, any>;
    stepByStepSolution: {
      step: number;
      action: string;
      calculation?: string;
      justification: string;
    }[];
  };
  exercise: {
    id: string;
    instruction: string;
    dataset: any;
    expectedAnswer: any;
    hints: string[];
    explanation: string;
    rubricPoints: number;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface ModuleInfo {
  id: string;
  pathId: string;
  title: string;
  description: string;
  lessonsCount: number;
  durationHours: number;
  competencies: string[];
}

export interface LearningPathInfo {
  id: string;
  title: string;
  tagline: string;
  description: string;
  targetRole: string;
  iconName: string;
  color: string;
  modules: ModuleInfo[];
}

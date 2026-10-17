export interface MissionDocument {
  id: string;
  title: string;
  type: 'invoice' | 'bank_statement' | 'contract' | 'trial_balance' | 'email' | 'spreadsheet';
  content: string;
  metadata?: Record<string, any>;
}

export interface MissionDecisionOption {
  id: string;
  label: string;
  explanation: string;
  pointsDelta: number;
  cashImpactFCFA?: number;
  feedbackImmediate: string;
  isOptimal: boolean;
}

export interface MissionStep {
  id: string;
  title: string;
  speaker: {
    name: string;
    role: string;
    avatar: string;
  };
  dialogue: string;
  taskInstruction: string;
  documentIdsToInspect: string[];
  options: MissionDecisionOption[];
}

export interface GameMission {
  id: string;
  title: string;
  subtitle: string;
  companyName: string;
  companyContext: string;
  location: string;
  currency: string;
  roleAssigned: string;
  difficulty: 'Débutant' | 'Opérationnel' | 'Expert';
  timeLimitMinutes?: number;
  briefing: {
    situation: string;
    objectives: string[];
    risks: string[];
  };
  documents: MissionDocument[];
  steps: MissionStep[];
  debriefing: {
    goldStandard: string;
    commonPitfalls: string[];
    keyTakeaway: string;
  };
}

export interface MissionAttemptResult {
  missionId: string;
  scorePercent: number;
  decisionsTaken: {
    stepId: string;
    chosenOptionId: string;
    isOptimal: boolean;
    pointsEarned: number;
  }[];
  passed: boolean;
  feedbackText: string;
}

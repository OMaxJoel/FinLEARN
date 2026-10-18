import React, { useEffect, useState } from 'react';
import { PracticalActivityRef } from '../../types/pedagogy360';
import { GAME_MISSIONS } from '../../data/gameMissionsData';
import { AccountingSimulator } from './AccountingSimulator';
import { FinancialAnalysisLab } from './FinancialAnalysisLab';
import { ExcelLab } from './ExcelLab';
import { VarianceAnalysisSimulator } from './VarianceAnalysisSimulator';
import { InvestmentAppraisalSimulator } from './InvestmentAppraisalSimulator';
import { TreasuryStressSimulator } from './TreasuryStressSimulator';
import { ConsolidationCockpit } from './ConsolidationCockpit';
import { BrokeragePortfolioSimulator } from './BrokeragePortfolioSimulator';
import { BreakevenSimulator } from './BreakevenSimulator';
import { PivotTableLab } from './PivotTableLab';
import { GameMissionModal } from '../game/GameMissionModal';
import {
  X,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sliders,
  Sparkles,
  Maximize2,
  Award,
} from 'lucide-react';

interface PracticalActivityBridgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: PracticalActivityRef | null;
  onComplete: (
    activityId: string,
    isSuccess: boolean,
    score: number,
    maxScore: number,
    savedState?: any
  ) => void;
  isAlreadyCompleted?: boolean;
}

export const PracticalActivityBridgeModal: React.FC<PracticalActivityBridgeModalProps> = ({
  isOpen,
  onClose,
  activity,
  onComplete,
  isAlreadyCompleted = false,
}) => {
  const [hasValidated, setHasValidated] = useState(isAlreadyCompleted);
  const [assessmentAnswer, setAssessmentAnswer] = useState('');
  const [assessmentFeedback, setAssessmentFeedback] = useState<'correct' | 'incorrect' | null>(null);
  useEffect(() => {
    setHasValidated(isAlreadyCompleted);
    setAssessmentAnswer('');
    setAssessmentFeedback(null);
  }, [isOpen, activity?.id, isAlreadyCompleted]);

  if (!isOpen || !activity) return null;

  const handleValidateActivity = () => {
    const assessment = activity.assessment;
    if (!assessment) return;
    const answer = Number(assessmentAnswer.trim().replace(',', '.'));
    if (!assessmentAnswer.trim() || !Number.isFinite(answer)) {
      setAssessmentFeedback('incorrect');
      return;
    }
    const isCorrect = Math.abs(answer - assessment.expectedAnswer) <= (assessment.tolerance ?? 0);
    setAssessmentFeedback(isCorrect ? 'correct' : 'incorrect');
    if (!isCorrect) return;
    setHasValidated(true);
    onComplete(activity.id, true, activity.rubricPoints, activity.rubricPoints, {
      validatedAt: new Date().toISOString(),
      targetComponentId: activity.targetComponentId,
      assessmentAnswer: answer,
    });
  };

  // Rendu conditionnel du composant métier partagé
  const renderTargetSimulator = () => {
    switch (activity.targetComponentId) {
      case 'accounting_simulator':
        return <AccountingSimulator />;
      case 'financial_analysis_lab':
        return <FinancialAnalysisLab />;
      case 'excel_lab':
        return <ExcelLab />;
      case 'variance_simulator':
        return <VarianceAnalysisSimulator />;
      case 'investment_simulator':
        return <InvestmentAppraisalSimulator />;
      case 'treasury_simulator':
        return <TreasuryStressSimulator />;
      case 'consolidation_cockpit':
        return <ConsolidationCockpit />;
      case 'brokerage_simulator':
        return <BrokeragePortfolioSimulator />;
      case 'breakeven_simulator':
        return <BreakevenSimulator />;
      case 'pivot_lab':
        return <PivotTableLab />;
      case 'game_mission': {
        const mission = GAME_MISSIONS.find((m) => m.id === activity.missionId) || GAME_MISSIONS[0];
        return (
          <GameMissionModal
            isOpen={true}
            mission={mission}
            onClose={onClose}
            onMissionCompleted={(mId, score) => {
              setHasValidated(true);
              onComplete(activity.id, score >= 70, Math.round((score / 100) * activity.rubricPoints), activity.rubricPoints, {
                missionScore: score,
              });
            }}
          />
        );
      }
      default:
        return (
          <div className="p-8 text-center text-slate-500">
            Simulateur en cours de chargement...
          </div>
        );
    }
  };

  if (activity.targetComponentId === 'game_mission') {
    return renderTargetSimulator();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-7xl max-h-[96vh] flex flex-col overflow-hidden">
        {/* En-tête Contextualisé de l'Atelier Pratique */}
        <div className="bg-gradient-to-r from-[#0E1A38] to-[#162D63] text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-700/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-sky-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-400/30">
                  Mise en Pratique Métier Directe
                </span>
                <span className="text-xs text-slate-400">• +{activity.rubricPoints} pts</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                {activity.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!hasValidated ? (
              activity.assessment ? (
                <button
                  onClick={handleValidateActivity}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Vérifier ma réponse</span>
                </button>
              ) : (
                <span className="px-3 py-2 rounded-xl bg-amber-950/70 text-amber-300 border border-amber-500/40 text-xs font-bold">Validation indisponible</span>
              )
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/70 text-emerald-400 border border-emerald-500/40 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Activité Validée (+{activity.rubricPoints} pts)</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              aria-label="Fermer la modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Barre d'objectifs et critères de validation */}
        <div className="bg-slate-50 border-b border-slate-200/80 px-5 py-3 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="font-semibold text-slate-900">Objectif d'entraînement :</span>
            <span>{activity.completionCriteria.description}</span>
          </div>
          <div className="text-[11px] text-slate-500 italic">
            La validation porte sur la réponse vérifiable ci-dessous. Le simulateur reste un atelier d’entraînement.
          </div>
        </div>

        {activity.assessment && (
          <div className="px-5 py-4 bg-white border-b border-slate-200 shrink-0">
            <label htmlFor="practical-answer" className="block text-sm font-bold text-slate-900 mb-2">{activity.assessment.prompt}</label>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <input
                  id="practical-answer"
                  type="number"
                  value={assessmentAnswer}
                  onChange={(event) => { setAssessmentAnswer(event.target.value); setAssessmentFeedback(null); }}
                  disabled={hasValidated}
                  className="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  aria-describedby="practical-feedback"
                />
                {activity.assessment.unit && <span className="text-sm text-slate-500">{activity.assessment.unit}</span>}
              </div>
              <span id="practical-feedback" aria-live="polite" className={`text-sm ${assessmentFeedback === 'correct' ? 'text-emerald-700' : assessmentFeedback === 'incorrect' ? 'text-rose-700' : 'text-slate-500'}`}>
                {assessmentFeedback === 'correct' ? activity.assessment.correction : assessmentFeedback === 'incorrect' ? 'Réponse incorrecte ou manquante. Reprenez les données et réessayez.' : 'Résolvez le cas, puis vérifiez votre résultat.'}
              </span>
            </div>
          </div>
        )}

        {/* Contenu Déterministe du Simulateur */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F8FAFC]">
          {renderTargetSimulator()}
        </div>
      </div>
    </div>
  );
};

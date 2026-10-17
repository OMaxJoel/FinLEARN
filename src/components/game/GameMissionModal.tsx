import React, { useState } from 'react';
import { GameMission } from '../../types/game';
import {
  X,
  Play,
  FileText,
  CheckCircle2,
  AlertCircle,
  Award,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Building2,
  Clock,
  ShieldAlert,
} from 'lucide-react';

interface GameMissionModalProps {
  mission: GameMission | null;
  isOpen: boolean;
  onClose: () => void;
  onMissionCompleted: (missionId: string, scorePercent: number) => void;
}

export const GameMissionModal: React.FC<GameMissionModalProps> = ({
  mission,
  isOpen,
  onClose,
  onMissionCompleted,
}) => {
  if (!isOpen || !mission) return null;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(mission.documents[0]?.id || null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [stepFeedback, setStepFeedback] = useState<any | null>(null);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentStep = mission.steps[currentStepIndex];
  const maxPossiblePoints = mission.steps.reduce(
    (acc, s) => acc + Math.max(...s.options.map((o) => o.pointsDelta)),
    0
  );

  const handleSelectOption = (option: any) => {
    if (stepFeedback) return;
    setSelectedOptionId(option.id);
    setStepFeedback(option);
    setEarnedPoints((prev) => prev + option.pointsDelta);
  };

  const handleNextStep = () => {
    setSelectedOptionId(null);
    setStepFeedback(null);

    if (currentStepIndex < mission.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      const finalScorePercent = Math.max(0, Math.round((earnedPoints / maxPossiblePoints) * 100));
      onMissionCompleted(mission.id, finalScorePercent);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setSelectedOptionId(null);
    setStepFeedback(null);
    setEarnedPoints(0);
    setIsFinished(false);
  };

  const activeDoc = mission.documents.find((d) => d.id === selectedDocId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-5xl h-[92vh] overflow-hidden shadow-2xl border border-slate-700 flex flex-col">
        {/* En-tête de la Mission (HUD) */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-sky-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Play className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm md:text-base tracking-tight">{mission.title}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {mission.difficulty}
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" /> {mission.companyName} ({mission.location})
                </span>
                <span>• Rôle : {mission.roleAssigned}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-amber-300 font-mono text-xs font-bold border border-slate-700">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Score : {earnedPoints} pts
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Corps de la Mission en 2 Colonnes */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {!isFinished ? (
            <>
              {/* Colonne Gauche : Bureau Virtuel & Documents Justificatifs (5 cols) */}
              <div className="lg:col-span-5 bg-slate-50 border-r border-slate-200 flex flex-col overflow-hidden">
                <div className="p-3 bg-slate-100/90 border-b border-slate-200 flex items-center justify-between shrink-0">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-sky-600" />
                    Pièces & Documents à Examiner :
                  </span>
                </div>

                {/* Onglets des documents */}
                <div className="flex border-b border-slate-200 bg-white overflow-x-auto shrink-0">
                  {mission.documents.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => setSelectedDocId(doc.id)}
                      className={`px-3 py-2 text-xs font-semibold whitespace-nowrap transition-all border-b-2 ${
                        selectedDocId === doc.id
                          ? 'border-sky-600 text-sky-900 bg-sky-50/50'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {doc.title}
                    </button>
                  ))}
                </div>

                {/* Visualiseur de Document Actif */}
                <div className="flex-1 p-4 overflow-y-auto">
                  {activeDoc && (
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3 font-mono text-xs leading-relaxed text-slate-800 whitespace-pre-line">
                      {activeDoc.content}
                    </div>
                  )}
                </div>

                {/* Rappel des Objectifs de la Mission */}
                <div className="p-3 bg-slate-100 border-t border-slate-200 text-xs shrink-0">
                  <span className="font-bold text-slate-700 block mb-1">Rappel de la mission :</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">
                    {mission.briefing.situation}
                  </p>
                </div>
              </div>

              {/* Colonne Droite : Dialogue Interactif & Prise de Décision (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between overflow-y-auto p-6 space-y-6">
                <div className="space-y-6">
                  {/* Jauge d'Étapes */}
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold border-b border-slate-100 pb-3">
                    <span>
                      Étape {currentStepIndex + 1} sur {mission.steps.length}
                    </span>
                    <span className="font-mono text-purple-600">{currentStep.title}</span>
                  </div>

                  {/* Dialogue du Personnage */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg space-y-2 border border-slate-800">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{currentStep.speaker.avatar}</span>
                      <div>
                        <h4 className="font-bold text-sm text-sky-300">{currentStep.speaker.name}</h4>
                        <span className="text-[11px] text-slate-400">{currentStep.speaker.role}</span>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-slate-200 leading-relaxed italic pl-1">
                      « {currentStep.dialogue} »
                    </p>
                  </div>

                  {/* Consigne d'action */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Votre Décision Professionnelle :
                    </span>
                    <p className="text-sm font-semibold text-slate-900">{currentStep.taskInstruction}</p>
                  </div>

                  {/* Choix d'Actions */}
                  <div className="space-y-3">
                    {currentStep.options.map((option) => {
                      const isSelected = selectedOptionId === option.id;
                      let btnStyle = 'border-slate-200 hover:border-sky-300 bg-white text-slate-800';

                      if (stepFeedback) {
                        if (option.isOptimal) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-500 font-medium';
                        } else if (isSelected && !option.isOptimal) {
                          btnStyle = 'border-red-400 bg-red-50 text-red-950';
                        } else {
                          btnStyle = 'border-slate-200 opacity-50';
                        }
                      } else if (isSelected) {
                        btnStyle = 'border-sky-500 bg-sky-50 text-sky-950 font-bold';
                      }

                      return (
                        <button
                          key={option.id}
                          onClick={() => handleSelectOption(option)}
                          disabled={Boolean(stepFeedback)}
                          className={`w-full text-left p-4 rounded-xl border text-xs md:text-sm transition-all space-y-1.5 ${btnStyle}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">{option.label}</span>
                            {stepFeedback && option.isOptimal && (
                              <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Choix Optimal
                              </span>
                            )}
                          </div>
                          {stepFeedback && isSelected && (
                            <p className="text-xs leading-relaxed mt-2 pt-2 border-t border-slate-200 font-normal">
                              {option.feedbackImmediate}
                            </p>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bouton de Passage à l'Étape Suivante */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {stepFeedback ? 'Décision enregistrée.' : 'Veuillez sélectionner votre arbitrage.'}
                  </span>
                  <button
                    onClick={handleNextStep}
                    disabled={!stepFeedback}
                    className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-slate-300 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                  >
                    {currentStepIndex < mission.steps.length - 1 ? 'Continuer la mission' : 'Voir le débriefing'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* ÉCRAN DE DÉBRIEFING DE MISSION */
            <div className="col-span-12 p-8 overflow-y-auto space-y-6 text-center max-w-3xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-emerald-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-purple-500/25">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                  Mission Terminée avec Succès
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
                  Débriefing Opérationnel & Analyse des Décisions
                </h3>
                <p className="text-xs text-slate-500">
                  Votre performance a été confrontée aux standards de la profession.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto space-y-1">
                <span className="text-xs text-slate-500 font-medium">Score d'Exactitude Obtenu</span>
                <p className="text-4xl font-extrabold font-mono text-purple-700">
                  {Math.round((earnedPoints / maxPossiblePoints) * 100)}%
                </p>
                <p className="text-xs font-bold text-emerald-600">
                  +{earnedPoints * 10} XP ajoutés à votre profil
                </p>
              </div>

              <div className="text-left space-y-4">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1.5">
                  <h4 className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Meilleure Pratique de Place (Gold Standard) :
                  </h4>
                  <p className="text-emerald-800 leading-relaxed">{mission.debriefing.goldStandard}</p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-1.5">
                  <h4 className="font-bold text-amber-900 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600" /> Pièges Fréquents Évités :
                  </h4>
                  <ul className="space-y-1 text-amber-800">
                    {mission.debriefing.commonPitfalls.map((pit, pIdx) => (
                      <li key={pIdx}>• {pit}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Rejouer la mission
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md"
                >
                  Enregistrer et retourner au tableau de bord
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { DIAGNOSTIC_QUESTIONS } from '../../data/diagnosticData';
import { X, CheckCircle2, AlertCircle, ArrowRight, Award, Compass, RefreshCw } from 'lucide-react';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (scorePercent: number, domainScores: Record<string, number>) => void;
}

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<Record<string, { isCorrect: boolean; domain: string }>>({});
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setShowExplanation(false);
    setAnswers({});
    setIsFinished(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const currentQ = DIAGNOSTIC_QUESTIONS[currentIndex];

  const handleSelectOption = (optionId: string) => {
    if (showExplanation) return;
    setSelectedOptionId(optionId);
    setShowExplanation(true);

    const chosen = currentQ.options.find((o) => o.id === optionId);
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        isCorrect: chosen?.isCorrect ?? false,
        domain: currentQ.domain,
      },
    }));
  };

  const handleNext = () => {
    setSelectedOptionId(null);
    setShowExplanation(false);

    if (currentIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  // Calcul des scores par domaine
  const domainStats: Record<string, { correct: number; total: number }> = {};
  for (const q of DIAGNOSTIC_QUESTIONS) {
    if (!domainStats[q.domain]) {
      domainStats[q.domain] = { correct: 0, total: 0 };
    }
    domainStats[q.domain].total++;
    if (answers[q.id]?.isCorrect) {
      domainStats[q.domain].correct++;
    }
  }

  const domainScores: Record<string, number> = {};
  let totalCorrect = 0;
  for (const [domain, stat] of Object.entries(domainStats)) {
    domainScores[domain] = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
    totalCorrect += stat.correct;
  }
  const globalScore = Math.round((totalCorrect / DIAGNOSTIC_QUESTIONS.length) * 100);

  const handleFinishAndSave = () => {
    onComplete(globalScore, domainScores);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] sm:max-h-[90vh]">
        {/* En-tête */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Diagnostic Initial Adaptatif</h3>
              <p className="text-[11px] text-slate-400">Positionnement comptable, Excel, finance & courtage</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Corps */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {!isFinished ? (
            <>
              {/* Progression */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>
                    Question {currentIndex + 1} sur {DIAGNOSTIC_QUESTIONS.length}
                  </span>
                  <span className="font-semibold text-sky-600 uppercase tracking-wider text-[11px]">
                    {currentQ.domain}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-sky-500 h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentIndex + 1) / DIAGNOSTIC_QUESTIONS.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Contexte & Question */}
              <div className="space-y-2">
                {currentQ.context && (
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    {currentQ.context}
                  </span>
                )}
                <h4 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
                  {currentQ.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((option) => {
                  const isSelected = selectedOptionId === option.id;
                  let optionClass = 'border-slate-200 hover:border-sky-300 bg-white';

                  if (showExplanation) {
                    if (option.isCorrect) {
                      optionClass = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-medium ring-1 ring-emerald-500';
                    } else if (isSelected && !option.isCorrect) {
                      optionClass = 'border-red-400 bg-red-50 text-red-950';
                    } else {
                      optionClass = 'border-slate-200 opacity-60';
                    }
                  } else if (isSelected) {
                    optionClass = 'border-sky-500 bg-sky-50 text-sky-950 ring-1 ring-sky-500';
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(option.id)}
                      disabled={showExplanation}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 ${optionClass}`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {option.id}
                      </span>
                      <span className="flex-1 leading-relaxed">{option.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explication immédiate */}
              {showExplanation && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 animate-fadeIn">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    {currentQ.options.find((o) => o.id === selectedOptionId)?.isCorrect ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Réponse exacte
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> Réponse inexacte
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {currentQ.options.find((o) => o.id === selectedOptionId)?.explanation}
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Écran de Résultats de Diagnostic */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-sky-500/25">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-extrabold text-slate-900">Diagnostic Complété !</h3>
                <p className="text-xs text-slate-500">
                  Votre profil cognitif a été recalculé sur les 6 domaines d'apprentissage.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto">
                <span className="text-xs text-slate-500 font-medium">Score Global de Positionnement</span>
                <p className="text-3xl font-extrabold font-mono text-slate-900 mt-1">{globalScore}%</p>
                <p className="text-xs font-semibold text-emerald-600 mt-1">+150 XP accordés</p>
              </div>

              {/* Scores par domaine */}
              <div className="space-y-3 text-left">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Détail par domaine de compétence :
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(domainScores).map(([dom, sc]) => (
                    <div key={dom} className="p-3 rounded-xl border border-slate-200 bg-white space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-700">{dom}</span>
                        <span className="font-mono text-slate-900">{sc}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            sc >= 70 ? 'bg-emerald-500' : sc >= 50 ? 'bg-amber-500' : 'bg-red-400'
                          }`}
                          style={{ width: `${sc}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pied de page */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {!isFinished ? (
            <>
              <button
                onClick={onClose}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Passer et quitter
              </button>
              <button
                onClick={handleNext}
                disabled={!showExplanation}
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:bg-slate-300 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm"
              >
                {currentIndex < DIAGNOSTIC_QUESTIONS.length - 1 ? 'Question suivante' : 'Voir mon bilan'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <button
              onClick={handleFinishAndSave}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              Appliquer à mon Parcours d'Apprentissage
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

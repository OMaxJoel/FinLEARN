import React, { useState } from 'react';
import { LEARNING_PATHS, DETAILED_LESSONS } from '../../data/coursesData';
import { LessonContent } from '../../types/pedagogy';
import {
  BookOpen,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Clock,
  Award,
  BookMarked,
  Layers,
} from 'lucide-react';

interface CourseReaderProps {
  onLessonCompleted: (lessonId: string, xpEarned: number) => void;
  completedLessonIds: string[];
}

export const CourseReader: React.FC<CourseReaderProps> = ({
  onLessonCompleted,
  completedLessonIds,
}) => {
  const [selectedPathId, setSelectedPathId] = useState<string>('PATH_COMPT');
  const [activeLessonId, setActiveLessonId] = useState<string>('C1_L1');

  // État de l'exercice interactif
  const [exerciseInput, setExerciseInput] = useState<string>('');
  const [exerciseStatus, setExerciseStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showHintIndex, setShowHintIndex] = useState<number>(0);

  // État du mini-quiz
  const [quizSelectedIndex, setQuizSelectedIndex] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const activePath = LEARNING_PATHS.find((p) => p.id === selectedPathId) || LEARNING_PATHS[0];

  // Récupérer la leçon active ou fallback sur la première du parcours
  const allPathLessons = Object.values(DETAILED_LESSONS).filter((l) => l.pathId === activePath.id);
  const lesson: LessonContent =
    DETAILED_LESSONS[activeLessonId] || allPathLessons[0] || DETAILED_LESSONS['C1_L1'];
  const isLessonCompleted = completedLessonIds.includes(lesson.id);

  const handleSelectPath = (pathId: string) => {
    setSelectedPathId(pathId);
    const firstLessonInPath = Object.values(DETAILED_LESSONS).find((l) => l.pathId === pathId);
    if (firstLessonInPath) {
      setActiveLessonId(firstLessonInPath.id);
    }
    setExerciseStatus('idle');
    setExerciseInput('');
    setShowHintIndex(0);
    setQuizSelectedIndex(null);
    setQuizSubmitted(false);
  };

  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setExerciseStatus('idle');
    setExerciseInput('');
    setShowHintIndex(0);
    setQuizSelectedIndex(null);
    setQuizSubmitted(false);
  };

  const handleVerifyExercise = () => {
    const rawExpected = String(lesson.exercise.expectedAnswer).trim().toLowerCase();
    const rawInput = exerciseInput.trim().toLowerCase();

    // Normalisation des formules Excel éventuelles
    const cleanExpected = rawExpected.replace(/\s+/g, '');
    const cleanInput = rawInput.replace(/\s+/g, '');

    // Comparaison numérique ou textuelle
    const numExpected = Number(rawExpected);
    const numInput = Number(rawInput.replace(/\s/g, '').replace(',', '.'));

    let isMatch = false;
    if (!isNaN(numExpected) && !isNaN(numInput)) {
      isMatch = Math.abs(numExpected - numInput) < 1; // tolérance 1 FCFA
    } else {
      isMatch =
        cleanInput === cleanExpected ||
        rawInput === rawExpected ||
        rawInput.includes(rawExpected);
    }

    if (isMatch) {
      setExerciseStatus('success');
      onLessonCompleted(lesson.id, lesson.exercise.rubricPoints);
    } else {
      setExerciseStatus('error');
    }
  };

  const handleSelectQuizOption = (index: number) => {
    if (quizSubmitted) return;
    setQuizSelectedIndex(index);
    setQuizSubmitted(true);
    if (index === lesson.quiz[0]?.correctIndex) {
      onLessonCompleted(lesson.id, 50);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 animate-fadeIn">
      {/* 1. Barre Latérale Gauche : Sélecteur de Parcours et Sommaire des Modules */}
      <div className="lg:col-span-4 space-y-6">
        {/* Sélecteur de Parcours Métier */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Parcours par Métier :</span>
            </label>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/50">
              {LEARNING_PATHS.length} Métiers
            </span>
          </div>

          <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
            {LEARNING_PATHS.map((path) => (
              <button
                key={path.id}
                onClick={() => handleSelectPath(path.id)}
                className={`w-full text-left p-3 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-between ${
                  selectedPathId === path.id
                    ? 'border-blue-500 bg-blue-50/70 text-blue-950 font-bold shadow-2xs'
                    : 'border-slate-100 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <div className="truncate pr-2">
                  <span className="block truncate font-bold text-slate-900">{path.title}</span>
                  <span className="text-[10px] text-slate-400 block font-normal">{path.targetRole}</span>
                </div>
                <ChevronRight className="w-4 h-4 shrink-0 text-slate-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Sommaire des Modules et Leçons Dynamique */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-sm">Programme du Parcours</h3>
            </div>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              {activePath.levelBadge}
            </span>
          </div>

          <div className="space-y-4">
            {activePath.modules.map((mod) => {
              // Récupérer dynamiquement toutes les leçons rattachées à ce module
              const modLessons = Object.values(DETAILED_LESSONS).filter(
                (l) => l.moduleId === mod.id
              );

              return (
                <div key={mod.id} className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    {mod.title}
                  </span>

                  <div className="space-y-1 pl-2 border-l-2 border-slate-200">
                    {modLessons.length > 0 ? (
                      modLessons.map((les) => {
                        const isCurrent = lesson.id === les.id;
                        const isDone = completedLessonIds.includes(les.id);

                        return (
                          <button
                            key={les.id}
                            onClick={() => handleSelectLesson(les.id)}
                            className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                              isCurrent
                                ? 'bg-blue-600 text-white font-bold shadow-xs'
                                : 'text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span className="line-clamp-1">{les.title}</span>
                            {isDone && (
                              <CheckCircle2
                                className={`w-3.5 h-3.5 shrink-0 ${
                                  isCurrent ? 'text-white' : 'text-emerald-500'
                                }`}
                              />
                            )}
                          </button>
                        );
                      })
                    ) : (
                      <div className="p-2 text-xs text-slate-400 italic">
                        Leçons en cours de chargement...
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Zone Principale : Contenu Structuré de la Leçon Active */}
      <div className="lg:col-span-8 space-y-6">
        {/* En-tête de la Leçon */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-700 border border-blue-500/20">
              {lesson.difficulty} • Conforme OHADA / UEMOA / CIMA
            </span>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {lesson.durationMinutes} minutes
              </span>
              {isLessonCompleted && (
                <span className="flex items-center gap-1 text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Validé (+100 XP)
                </span>
              )}
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {lesson.title}
          </h1>

          {/* Objectifs d'apprentissage */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Objectifs d'apprentissage de la séance :
            </h4>
            <ul className="space-y-1">
              {lesson.objectives.map((obj, idx) => (
                <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sections Théoriques avec Analogies & Explications Intuitives */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
          {lesson.theorySections.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                {sec.title}
              </h2>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-3 font-normal">
                {sec.content}
              </div>

              {sec.keyTakeaway && (
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 font-medium flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-blue-900">Règle d'or : </strong>
                    <span>{sec.keyTakeaway}</span>
                  </div>
                </div>
              )}

              {sec.syscohadaRef && (
                <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
                  <BookMarked className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>
                    <strong>Référence officielle :</strong> {sec.syscohadaRef}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Exemple Résolu Pas à Pas */}
        {lesson.solvedExample && (
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-base text-slate-900">
                Cas Pratique Résolu Pas à Pas
              </h3>
            </div>

            <p className="text-xs text-slate-600 bg-amber-50/50 p-3.5 rounded-2xl border border-amber-200/50">
              <strong>Contexte réel : </strong>
              {lesson.solvedExample.context}
            </p>

            <div className="space-y-3 pt-2">
              {lesson.solvedExample.stepByStepSolution.map((st) => (
                <div
                  key={st.step}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 uppercase">
                      Étape {st.step} : {st.action}
                    </span>
                  </div>
                  {st.calculation && (
                    <div className="font-mono text-xs font-bold bg-white p-2 rounded-lg border border-slate-200 text-slate-800">
                      {st.calculation}
                    </div>
                  )}
                  <p className="text-xs text-slate-600">{st.justification}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exercice d'Application Interactive avec Évaluateur */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-base text-slate-900">
                Exercice d'Application Autonome
              </h3>
            </div>
            <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              +{lesson.exercise.rubricPoints} XP
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {lesson.exercise.instruction}
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={exerciseInput}
                onChange={(e) => {
                  setExerciseInput(e.target.value);
                  if (exerciseStatus !== 'idle') setExerciseStatus('idle');
                }}
                placeholder="Votre réponse (ex: montant FCFA ou formule)..."
                className="w-full sm:flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
              <button
                onClick={handleVerifyExercise}
                className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition shadow-sm hover:shadow-md shrink-0"
              >
                Vérifier ma réponse
              </button>
            </div>

            {/* Retour Pédagogique Immédiat */}
            {exerciseStatus === 'success' && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-1 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Excellent ! Réponse exacte.</span>
                </div>
                <p>{lesson.exercise.explanation}</p>
              </div>
            )}

            {exerciseStatus === 'error' && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-sm text-rose-700">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Réponse incorrecte ou imprécise.</span>
                </div>
                <p>
                  Revoyez attentivement la formule et le calcul pas à pas. Vous pouvez afficher un
                  indice pour vous débloquer.
                </p>
                {showHintIndex < lesson.exercise.hints.length && (
                  <button
                    onClick={() => setShowHintIndex((prev) => prev + 1)}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Afficher un indice ({showHintIndex + 1}/{lesson.exercise.hints.length})</span>
                  </button>
                )}
              </div>
            )}

            {/* Indices Débloqués */}
            {showHintIndex > 0 && (
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-xs text-amber-900 space-y-1">
                <strong className="block font-bold">Indice méthodologique :</strong>
                <p>{lesson.exercise.hints[showHintIndex - 1]}</p>
              </div>
            )}
          </div>
        </div>

        {/* Mini-Quiz Évaluatif */}
        {lesson.quiz && lesson.quiz.length > 0 && (
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-base text-slate-900">
                Quiz Formatif de Validation
              </h3>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-800">
              {lesson.quiz[0].question}
            </p>

            <div className="space-y-2 pt-1">
              {lesson.quiz[0].options.map((opt, i) => {
                const isSelected = quizSelectedIndex === i;
                const isCorrect = i === lesson.quiz[0].correctIndex;

                let btnStyle =
                  'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';
                if (quizSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-50 border-rose-300 text-rose-900 font-bold';
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelectQuizOption(i)}
                    disabled={quizSubmitted}
                    className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {quizSubmitted && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {quizSubmitted && (
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-slate-700 space-y-1 animate-fadeIn">
                <span className="font-bold text-blue-900 block">Explication détaillée :</span>
                <p>{lesson.quiz[0].explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

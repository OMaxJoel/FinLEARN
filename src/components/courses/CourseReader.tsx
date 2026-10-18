import React, { useState, useEffect } from 'react';
import { PILOT_FINANCIAL_ANALYST_PATH } from '../../data/curriculum360Data';
import { LEARNING_PATHS, DETAILED_LESSONS } from '../../data/coursesData';
import { Lesson360, PathEnrollment360, SyncStatus } from '../../types/pedagogy360';
import { ProgressEngine } from '../../core/persistence/progressStore';
import { dbPersistence } from '../../core/persistence/dbClient';
import { PracticalActivityBridgeModal } from '../simulators/PracticalActivityBridgeModal';
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
  Sliders,
  Building2,
  FileText,
  AlertTriangle,
  Play,
  RotateCcw,
  Wifi,
  WifiOff,
  Flame,
} from 'lucide-react';

interface CourseReaderProps {
  onLessonCompleted: (lessonId: string, xpEarned: number) => void;
  completedLessonIds: string[];
  initialLessonId?: string;
}

export const CourseReader: React.FC<CourseReaderProps> = ({
  onLessonCompleted,
  completedLessonIds,
  initialLessonId,
}) => {
  // Sélection du parcours (par défaut le parcours pilote 360°)
  const [selectedPathId, setSelectedPathId] = useState<string>('PATH_FIN_ANALYST_360');
  
  // Aplatir toutes les leçons 360° du parcours pilote
  const all360Lessons: Lesson360[] = PILOT_FINANCIAL_ANALYST_PATH.levels.flatMap((lvl) =>
    lvl.modules.flatMap((mod) => mod.chapters.flatMap((chap) => chap.lessons))
  );

  const [activeLessonId, setActiveLessonId] = useState<string>(
    initialLessonId || all360Lessons[0]?.id || 'L_N1_M1_01'
  );

  // Inscription et état de progression persistant
  const [enrollment, setEnrollment] = useState<PathEnrollment360 | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isOnline: true,
    isSyncing: false,
    lastSyncedAt: null,
    pendingChangesCount: 0,
    hasSyncError: false,
  });

  // Modal d'activité pratique / simulateur
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  // États des exercices
  const [guidedInput, setGuidedInput] = useState('');
  const [guidedStatus, setGuidedStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showGuidedHelp, setShowGuidedHelp] = useState(false);

  const [autoInput, setAutoInput] = useState('');
  const [autoStatus, setAutoStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [autoHintIndex, setAutoHintIndex] = useState(0);

  // État du quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Notification d'état de sauvegarde (exigence Scénario J)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'warning' | 'error' } | null>(null);

  // Synchronisation du statut réseau
  useEffect(() => {
    const unsub = dbPersistence.subscribeSyncStatus((status) => {
      setSyncStatus(status);
      if (status.hasSyncError && status.syncErrorMessage) {
        setNotification({ message: status.syncErrorMessage, type: 'warning' });
      }
    });
    return unsub;
  }, []);

  // Chargement de l'inscription persistante
  useEffect(() => {
    async function loadEnrollment() {
      const userEnrollment = await ProgressEngine.startOrResumePath(
        'max_oura',
        PILOT_FINANCIAL_ANALYST_PATH
      );
      setEnrollment(userEnrollment);
      if (initialLessonId) {
        setActiveLessonId(initialLessonId);
      } else if (userEnrollment.currentActivityId) {
        setActiveLessonId(userEnrollment.currentActivityId);
      }
    }
    loadEnrollment();
  }, [initialLessonId]);

  // Récupération de la leçon active
  const lesson360: Lesson360 =
    all360Lessons.find((l) => l.id === activeLessonId) || all360Lessons[0];

  // Marquer comme consultée lors de l'ouverture
  useEffect(() => {
    if (enrollment && lesson360) {
      ProgressEngine.recordLessonConsultation(enrollment, PILOT_FINANCIAL_ANALYST_PATH, lesson360)
        .then((updated) => setEnrollment(updated));
    }
    // Réinitialiser les inputs des exercices
    setGuidedInput('');
    setGuidedStatus('idle');
    setShowGuidedHelp(false);
    setAutoInput('');
    setAutoStatus('idle');
    setAutoHintIndex(0);
    setQuizAnswers({});
    setQuizSubmitted(false);
  }, [activeLessonId]);

  const isCurrentLessonValidated =
    completedLessonIds.includes(lesson360.id) ||
    enrollment?.activityRecords[lesson360.id]?.state === 'terminee';

  // Vérification de l'exercice guidé
  const handleVerifyGuidedExercise = async () => {
    const rawExpected = String(lesson360.guidedExercise.expectedAnswer).trim().toLowerCase();
    const rawInput = guidedInput.trim().toLowerCase();
    const numExpected = Number(rawExpected);
    const numInput = Number(rawInput.replace(/\s/g, '').replace(',', '.'));

    let isMatch = false;
    if (!isNaN(numExpected) && !isNaN(numInput)) {
      isMatch = Math.abs(numExpected - numInput) < 1;
    } else {
      isMatch = rawInput === rawExpected || rawInput.includes(rawExpected);
    }

    if (isMatch) {
      setGuidedStatus('success');
      onLessonCompleted(lesson360.id, lesson360.guidedExercise.rubricPoints);

      if (enrollment) {
        const { enrollment: nextEnrollment, saveResult } = await ProgressEngine.recordActivitySubmission(
          enrollment,
          PILOT_FINANCIAL_ANALYST_PATH,
          lesson360.guidedExercise.id,
          'guided_exercise',
          true,
          lesson360.guidedExercise.rubricPoints,
          lesson360.guidedExercise.rubricPoints
        );
        setEnrollment(nextEnrollment);
        const res = await saveResult;
        if (!res.success) {
          setNotification({ message: res.error || 'Erreur lors de la sauvegarde distante.', type: 'warning' });
        }
      }
    } else {
      setGuidedStatus('error');
    }
  };

  // Vérification de l'exercice autonome
  const handleVerifyAutonomousExercise = async () => {
    const rawExpected = String(lesson360.autonomousExercise.expectedAnswer).trim().toLowerCase();
    const rawInput = autoInput.trim().toLowerCase();
    const numExpected = Number(rawExpected);
    const numInput = Number(rawInput.replace(/\s/g, '').replace(',', '.'));

    let isMatch = false;
    if (!isNaN(numExpected) && !isNaN(numInput)) {
      isMatch = Math.abs(numExpected - numInput) < 1;
    } else {
      isMatch = rawInput === rawExpected || rawInput.includes(rawExpected);
    }

    if (isMatch) {
      setAutoStatus('success');
      onLessonCompleted(lesson360.id, lesson360.autonomousExercise.rubricPoints);

      if (enrollment) {
        const { enrollment: nextEnrollment, saveResult } = await ProgressEngine.recordActivitySubmission(
          enrollment,
          PILOT_FINANCIAL_ANALYST_PATH,
          lesson360.autonomousExercise.id,
          'autonomous_exercise',
          true,
          lesson360.autonomousExercise.rubricPoints,
          lesson360.autonomousExercise.rubricPoints
        );
        setEnrollment(nextEnrollment);
        const res = await saveResult;
        if (!res.success) {
          setNotification({ message: res.error || 'Erreur lors de la sauvegarde distante.', type: 'warning' });
        }
      }
    } else {
      setAutoStatus('error');
    }
  };

  // Callback de validation du simulateur
  const handlePracticalActivityComplete = async (
    activityId: string,
    isSuccess: boolean,
    score: number,
    maxScore: number,
    savedState?: any
  ) => {
    setIsActivityModalOpen(false);
    onLessonCompleted(lesson360.id, score);

    if (enrollment) {
      const { enrollment: nextEnrollment, saveResult } = await ProgressEngine.recordActivitySubmission(
        enrollment,
        PILOT_FINANCIAL_ANALYST_PATH,
        activityId,
        'simulator',
        isSuccess,
        score,
        maxScore,
        savedState
      );
      setEnrollment(nextEnrollment);
      setNotification({ message: `Activité pratique enregistrée avec succès (+${score} pts) !`, type: 'success' });
      await saveResult;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 1. Bandeau de Statut et Sauvegarde Réseau (Scénario J) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs text-xs">
        <div className="flex items-center gap-2">
          {syncStatus.isOnline ? (
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <Wifi className="w-4 h-4" /> En ligne
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-amber-600 font-semibold">
              <WifiOff className="w-4 h-4" /> Mode Hors-Ligne (Sauvegarde locale active)
            </span>
          )}
          <span className="text-slate-300">•</span>
          <span className="text-slate-500">
            {syncStatus.isSyncing
              ? 'Synchronisation distante en cours...'
              : syncStatus.lastSyncedAt
              ? `Dernière synchro : ${new Date(syncStatus.lastSyncedAt).toLocaleTimeString()}`
              : 'Sauvegarde persistante connectée'}
          </span>
        </div>

        {/* 4 Indicateurs distincts certifiés */}
        {enrollment && (
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
              <span className="text-slate-400">Consultation :</span>
              <strong className="text-blue-700">{enrollment.consultationProgressPercent}%</strong>
            </div>
            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
              <span className="text-slate-400">Pratique :</span>
              <strong className="text-emerald-700">{enrollment.practicalActivitiesProgressPercent}%</strong>
            </div>
            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
              <span className="text-slate-400">Évaluations :</span>
              <strong className="text-amber-700">{enrollment.evaluationScorePercent}%</strong>
            </div>
            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
              <span className="text-slate-400">Compétences :</span>
              <strong className="text-purple-700">{enrollment.competenciesMasteryPercent}%</strong>
            </div>
          </div>
        )}
      </div>

      {notification && (
        <div
          className={`p-3 rounded-xl text-xs font-semibold flex items-center justify-between ${
            notification.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : notification.type === 'warning'
              ? 'bg-amber-50 text-amber-800 border border-amber-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            )}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-slate-600">
            ×
          </button>
        </div>
      )}

      {/* 2. Navigation de Leçons Latérale et Zone de Lecture Centrale */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Colonne Navigation des 10 Niveaux / Modules (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
              Parcours Professionnel 360°
            </span>
            <h2 className="text-sm font-extrabold text-slate-900 leading-snug">
              {PILOT_FINANCIAL_ANALYST_PATH.title}
            </h2>
            <div className="text-[11px] text-slate-500 mt-1">
              10 Niveaux • 10 Modules • 65 Heures
            </div>
          </div>

          <div className="space-y-3">
            {PILOT_FINANCIAL_ANALYST_PATH.levels.map((level) => (
              <div key={level.id} className="space-y-1">
                <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-2 py-1">
                  {level.title}
                </div>

                {level.modules.map((mod) => (
                  <div key={mod.id} className="space-y-1">
                    {mod.chapters.flatMap((chap) => chap.lessons).map((les) => {
                      const isActive = les.id === activeLessonId;
                      const isDone = completedLessonIds.includes(les.id) ||
                        enrollment?.activityRecords[les.id]?.state === 'terminee';

                      return (
                        <button
                          key={les.id}
                          onClick={() => setActiveLessonId(les.id)}
                          className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-between gap-2 ${
                            isActive
                              ? 'bg-blue-600 text-white shadow-sm'
                              : isDone
                              ? 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200/50'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {isDone ? (
                              <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                            ) : (
                              <BookOpen className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                            )}
                            <span className="truncate">{les.title}</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Colonne Centrale de Lecture Complète de la Leçon (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header de la Leçon */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
                {lesson360.difficulty} • {lesson360.durationMinutes} min
              </span>
              {isCurrentLessonValidated && (
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Leçon validée
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {lesson360.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              {lesson360.contextIntro}
            </p>

            {/* Objectifs d'apprentissage */}
            <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-2">
              <span className="text-xs font-bold text-sky-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                Objectifs d'apprentissage visés :
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-sky-900">
                {lesson360.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-sky-500 font-bold">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Théorie Approfondie (Définitions, Principes, Formules, Erreurs fréquentes) */}
          {lesson360.theorySections.map((sec, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                {sec.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {sec.content}
              </p>

              {/* Formules et Interprétation */}
              {sec.formulas && sec.formulas.length > 0 && (
                <div className="space-y-3">
                  {sec.formulas.map((form, fIdx) => (
                    <div key={fIdx} className="p-4 rounded-2xl bg-[#0B132B] text-white space-y-2 shadow-inner">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-sky-300 font-bold uppercase tracking-wider">{form.name}</span>
                        {form.syscohadaRef && (
                          <span className="text-[10px] text-slate-400 font-mono">{form.syscohadaRef}</span>
                        )}
                      </div>
                      <div className="font-mono text-sm sm:text-base font-bold text-emerald-400 p-2 bg-slate-900/60 rounded-xl">
                        {form.formula}
                      </div>
                      <p className="text-xs text-slate-300 italic">{form.interpretation}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Définitions Essentielles */}
              {sec.keyDefinitions && sec.keyDefinitions.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {sec.keyDefinitions.map((def, dIdx) => (
                    <div key={dIdx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                      <strong className="text-xs font-bold text-slate-900">{def.term}</strong>
                      <p className="text-xs text-slate-600 leading-relaxed">{def.definition}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Erreurs Fréquentes & Bonnes Pratiques */}
              {sec.commonMistakes && sec.commonMistakes.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2 text-xs">
                  <span className="font-bold text-amber-950 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    Erreurs fréquentes à éviter :
                  </span>
                  <ul className="list-disc pl-5 space-y-1 text-amber-900">
                    {sec.commonMistakes.map((err, eIdx) => (
                      <li key={eIdx}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {/* Exemples Résolus (Simple & Intermédiaire) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                Exemple Simple Résolu
              </span>
              <h3 className="text-sm font-bold text-slate-900">{lesson360.simpleExample.title}</h3>
              <p className="text-xs text-slate-600">{lesson360.simpleExample.scenario || lesson360.simpleExample.context}</p>
              <div className="space-y-2 pt-2 border-t border-slate-100">
                {lesson360.simpleExample.stepByStepSolution.map((st, i) => (
                  <div key={i} className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                    <span className="font-bold text-slate-800">Étape {st.step} : {st.action}</span>
                    {st.calculation && <div className="font-mono text-emerald-700">{st.calculation}</div>}
                    <div className="text-[11px] text-slate-500 italic">{st.justification}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                Exemple Intermédiaire Résolu
              </span>
              <h3 className="text-sm font-bold text-slate-900">{lesson360.intermediateExample.title}</h3>
              <p className="text-xs text-slate-600">{lesson360.intermediateExample.scenario || lesson360.intermediateExample.context}</p>
              <div className="space-y-2 pt-2 border-t border-slate-100">
                {lesson360.intermediateExample.stepByStepSolution.map((st, i) => (
                  <div key={i} className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                    <span className="font-bold text-slate-800">Étape {st.step} : {st.action}</span>
                    {st.calculation && <div className="font-mono text-blue-700">{st.calculation}</div>}
                    <div className="text-[11px] text-slate-500 italic">{st.justification}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cas Réel d'Entreprise Ivoirienne / UEMOA / OHADA (Exigence 4) */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF6B00] bg-orange-950/60 px-3 py-1 rounded-full border border-orange-500/30">
                Cas Réel d'Entreprise • FCFA / SYSCOHADA
              </span>
              <span className="text-xs text-slate-400">{lesson360.enterpriseCase.locationContext}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white">
              {lesson360.enterpriseCase.companyName}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              {lesson360.enterpriseCase.problemStatement}
            </p>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2 text-xs">
              <span className="font-bold text-emerald-400">Résolution en Pratique Professionnelle :</span>
              <p className="text-slate-300">{lesson360.enterpriseCase.realWorldResolution}</p>
            </div>

            <div className="text-xs text-sky-300 border-l-2 border-sky-400 pl-3 italic">
              <strong>Recommandation à la Direction Générale :</strong> {lesson360.enterpriseCase.recommendationToBoard}
            </div>
          </div>

          {/* Exercice Guidé (Pas à pas) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                1. Exercice Guidé (+{lesson360.guidedExercise.rubricPoints} pts)
              </span>
              <button
                onClick={() => setShowGuidedHelp((prev) => !prev)}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showGuidedHelp ? 'Masquer l\'aide' : 'Afficher les étapes de résolution'}</span>
              </button>
            </div>

            <h3 className="text-sm font-bold text-slate-900">{lesson360.guidedExercise.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{lesson360.guidedExercise.instruction}</p>

            {showGuidedHelp && (
              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 space-y-1.5 text-xs text-blue-900">
                <span className="font-bold">Étapes guidées :</span>
                {(lesson360.guidedExercise.stepByStepGuidance || lesson360.guidedExercise.stepByStepHelp || []).map((g, i) => (
                  <div key={i} className="pl-3 border-l-2 border-blue-400">{g}</div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <input
                type="text"
                value={guidedInput}
                onChange={(e) => setGuidedInput(e.target.value)}
                placeholder="Votre réponse (ex : montant en FCFA)"
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500"
              />
              <button
                onClick={handleVerifyGuidedExercise}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition"
              >
                Valider l'exercice
              </button>
            </div>

            {guidedStatus === 'success' && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lesson360.guidedExercise.detailedCorrection}</span>
              </div>
            )}
            {guidedStatus === 'error' && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-800 text-xs font-semibold flex items-center gap-2 border border-rose-200">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Résultat incorrect. Vérifiez vos calculs ou consultez l'aide étape par étape.</span>
              </div>
            )}
          </div>

          {/* Exercice Autonome */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                2. Exercice Autonome (+{lesson360.autonomousExercise.rubricPoints} pts)
              </span>
              <button
                onClick={() => setAutoHintIndex((prev) => Math.min(prev + 1, lesson360.autonomousExercise.hints.length))}
                className="text-xs text-purple-600 hover:text-purple-800 font-semibold flex items-center gap-1"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Indice ({autoHintIndex}/{lesson360.autonomousExercise.hints.length})</span>
              </button>
            </div>

            <h3 className="text-sm font-bold text-slate-900">{lesson360.autonomousExercise.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{lesson360.autonomousExercise.instruction}</p>

            {autoHintIndex > 0 && (
              <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 space-y-1 text-xs text-purple-900">
                {lesson360.autonomousExercise.hints.slice(0, autoHintIndex).map((h, i) => (
                  <div key={i}>💡 {h}</div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <input
                type="text"
                value={autoInput}
                onChange={(e) => setAutoInput(e.target.value)}
                placeholder="Votre réponse calculée"
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-hidden focus:border-purple-500"
              />
              <button
                onClick={handleVerifyAutonomousExercise}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition"
              >
                Vérifier
              </button>
            </div>

            {autoStatus === 'success' && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lesson360.autonomousExercise.detailedCorrection}</span>
              </div>
            )}
            {autoStatus === 'error' && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-800 text-xs font-semibold flex items-center gap-2 border border-rose-200">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Valeur incorrecte. Réessayez ou demandez un indice complémentaire.</span>
              </div>
            )}
          </div>

          {/* Activité Pratique / Simulateur Déterministe Relié */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-sky-300 text-xs font-bold border border-blue-400/30">
                <Sliders className="w-3.5 h-3.5" />
                <span>Laboratoire Pratique Associé (+{lesson360.practicalActivity.rubricPoints} pts)</span>
              </div>
              <h3 className="text-lg font-bold text-white">{lesson360.practicalActivity.title}</h3>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                {lesson360.practicalActivity.completionCriteria.description}
              </p>
            </div>

            <button
              onClick={() => setIsActivityModalOpen(true)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#EA580C] text-white font-bold text-xs shadow-lg shadow-orange-600/30 flex items-center gap-2 hover:scale-[1.02] transition cursor-pointer shrink-0"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Ouvrir l'Atelier Pratique</span>
            </button>
          </div>

          {/* Quiz de Compréhension */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Quiz de Compréhension Rapide</span>
            </h3>

            {lesson360.comprehensionQuiz.map((q, qIdx) => (
              <div key={q.id} className="space-y-2 pt-2 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-800">
                  {qIdx + 1}. {q.question}
                </div>
                <div className="space-y-1.5">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = quizAnswers[q.id] === optIdx;
                    const isCorrect = optIdx === q.correctIndex;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => {
                          setQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
                        }}
                        className={`w-full text-left p-2.5 rounded-xl text-xs transition border ${
                          isSelected
                            ? quizSubmitted
                              ? isCorrect
                                ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold'
                                : 'bg-rose-50 border-rose-400 text-rose-950'
                              : 'bg-blue-50 border-blue-400 text-blue-950 font-semibold'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {quizSubmitted && (
                  <div className="text-[11px] text-slate-500 italic p-2 bg-slate-50 rounded-lg">
                    {q.explanation}
                  </div>
                )}
              </div>
            ))}

            {!quizSubmitted && (
              <button
                onClick={() => setQuizSubmitted(true)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition"
              >
                Vérifier le quiz
              </button>
            )}
          </div>

          {/* Résumé des Notions & Recommandation Suite */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              📌 Points Clés à Retenir
            </span>
            <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
              {lesson360.keyTakeawaySummary.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 italic">{lesson360.nextStepRecommendation}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'Activité Pratique (Simulateur relié) */}
      <PracticalActivityBridgeModal
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
        activity={lesson360.practicalActivity}
        onComplete={handlePracticalActivityComplete}
      />
    </div>
  );
};

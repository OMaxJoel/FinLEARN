import React, { useState } from 'react';
import { LearningPath360, PathEnrollment360 } from '../../types/pedagogy360';
import { ProgressEngine } from '../../core/persistence/progressStore';
import {
  X,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Award,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface PathEnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  path: LearningPath360;
  existingEnrollment: PathEnrollment360 | null;
  onEnrollmentConfirmed: (enrollment: PathEnrollment360, targetLessonId?: string) => void;
  onOpenDiagnostic?: () => void;
}

export const PathEnrollmentModal: React.FC<PathEnrollmentModalProps> = ({
  isOpen,
  onClose,
  path,
  existingEnrollment,
  onEnrollmentConfirmed,
  onOpenDiagnostic,
}) => {
  if (!isOpen) return null;

  const [isLoading, setIsLoading] = useState(false);
  const [prerequisitesAccepted, setPrerequisitesAccepted] = useState(true);

  const isAlreadyEnrolled = Boolean(existingEnrollment);
  const isCompleted = existingEnrollment?.status === 'termine';

  const handleStartOrResume = async () => {
    setIsLoading(true);
    try {
      const enrollment = await ProgressEngine.startOrResumePath('max_oura', path);
      setIsLoading(false);
      onEnrollmentConfirmed(enrollment, enrollment.currentActivityId);
      onClose();
    } catch (e) {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden">
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-[#0E1A38] via-[#122853] to-[#0B152E] text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{path.levelBadge}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {path.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {path.tagline}
            </p>
          </div>
        </div>

        {/* Détails du programme & Prérequis */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <Clock className="w-4 h-4 text-slate-500 mx-auto mb-1" />
              <div className="text-[10px] text-slate-400 font-bold uppercase">Durée estimée</div>
              <div className="text-sm font-extrabold text-slate-800">{path.estimatedHours}h</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <Layers className="w-4 h-4 text-blue-500 mx-auto mb-1" />
              <div className="text-[10px] text-slate-400 font-bold uppercase">Niveaux & Modules</div>
              <div className="text-sm font-extrabold text-slate-800">
                {path.levels.length} Niveaux
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <Award className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
              <div className="text-[10px] text-slate-400 font-bold uppercase">Certification</div>
              <div className="text-sm font-extrabold text-slate-800">OHADA / UEMOA</div>
            </div>
          </div>

          {/* Prérequis */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-900 block">
              Prérequis obligatoires :
            </span>
            <ul className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              {path.prerequisites.map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Diagnostic initial recommandé si pas encore inscrit */}
          {!isAlreadyEnrolled && path.initialDiagnosticId && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-amber-900">Diagnostic de positionnement recommandé</span>
                <p className="text-amber-700">Évaluez vos acquis actuels pour adapter vos premières activités.</p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenDiagnostic?.();
                }}
                className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shrink-0 transition"
              >
                Passer le test
              </button>
            </div>
          )}

          {/* Boutons d'Action selon le Statut */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleStartOrResume}
              disabled={isLoading}
              className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] text-white font-bold text-sm shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              {isCompleted ? (
                <>
                  <RotateCcw className="w-4 h-4" />
                  <span>Revoir le parcours certifié</span>
                </>
              ) : isAlreadyEnrolled ? (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Reprendre le parcours (continuer là où vous vous êtes arrêté)</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Démarrer le parcours de formation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

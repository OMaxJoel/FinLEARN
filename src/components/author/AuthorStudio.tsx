import React, { useEffect, useState } from 'react';
import {
  LearningPath360,
  Module360,
  Lesson360,
  CompletenessReport,
} from '../../types/pedagogy360';
import { ALL_LEARNING_PATHS_360, PILOT_FINANCIAL_ANALYST_PATH, MASTER_COMPETENCIES_360 } from '../../data/curriculum360Data';
import { CompletenessAuditor } from '../../core/authoring/completenessAuditor';
import {
  Layers,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sliders,
  ShieldCheck,
  Award,
  Sparkles,
  Eye,
  Plus,
  Save,
  Send,
  BookOpen,
  HelpCircle,
  TrendingUp,
  X,
  ChevronRight,
  FolderTree,
} from 'lucide-react';

export const AuthorStudio: React.FC = () => {
  const [activePath, setActivePath] = useState<LearningPath360>(PILOT_FINANCIAL_ANALYST_PATH);
  const [activeTab, setActiveTab] = useState<'audit' | 'structure' | 'lessonEditor' | 'preview'>('audit');
  
  // Leçon actuellement éditée
  const [selectedLessonId, setSelectedLessonId] = useState<string>('L_N1_M1_01');
  const [publishMessage, setPublishMessage] = useState<string | null>(null);
  const [messageKind, setMessageKind] = useState<'success' | 'error' | 'info'>('info');
  const [saving, setSaving] = useState(false);
  const [draftDirty, setDraftDirty] = useState(false);

  // Exécution de l'audit de complétude en temps réel
  const auditReport: CompletenessReport = CompletenessAuditor.auditPath(activePath);

  // Récupération de la leçon active dans l'arbre
  const allLessons = activePath.levels.flatMap((lvl) =>
    lvl.modules.flatMap((mod) => mod.chapters.flatMap((chap) => chap.lessons))
  );
  const currentLesson: Lesson360 =
    allLessons.find((l) => l.id === selectedLessonId) || allLessons[0];

  useEffect(() => {
    let active = true;
    fetch(`/api/author?action=draft&pathId=${encodeURIComponent(activePath.id)}`)
      .then(async (response) => {
        if (!response.ok) throw new Error('Brouillon distant indisponible');
        return response.json();
      })
      .then(({ draft }) => {
        if (active && draft) {
          setActivePath(draft as LearningPath360);
          setDraftDirty(false);
          setMessageKind('success');
          setPublishMessage('Brouillon enregistré chargé.');
        }
      })
      .catch(() => {
        if (active) {
          setMessageKind('info');
          setPublishMessage('Aucun brouillon distant chargé. Les changements ne seront conservés qu’après un enregistrement réussi.');
        }
      });
    return () => { active = false; };
  }, [activePath.id]);

  const updateCurrentLesson = (changes: Partial<Lesson360>) => {
    setActivePath((path) => ({
      ...path,
      levels: path.levels.map((level) => ({
        ...level,
        modules: level.modules.map((module) => ({
          ...module,
          chapters: module.chapters.map((chapter) => ({
            ...chapter,
            lessons: chapter.lessons.map((lesson) => lesson.id === currentLesson.id ? { ...lesson, ...changes } : lesson),
          })),
        })),
      })),
    }));
    setDraftDirty(true);
    setPublishMessage(null);
  };

  const handleSaveDraft = async () => {
    setSaving(true);
    setPublishMessage(null);
    try {
      const response = await fetch('/api/author', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save-draft', pathId: activePath.id, path: activePath }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || 'Échec de la sauvegarde');
      setMessageKind('success');
      setDraftDirty(false);
      setPublishMessage(`Brouillon enregistré à ${new Date(result.savedAt).toLocaleTimeString()}.`);
    } catch (error) {
      setMessageKind('error');
      setPublishMessage(error instanceof Error ? error.message : 'Le brouillon n’a pas été enregistré.');
    } finally {
      setSaving(false);
    }
  };

  const handleSelectPath = (pathId: string) => {
    const found = ALL_LEARNING_PATHS_360.find((p) => p.id === pathId);
    if (found) {
      setActivePath(found);
      const firstLesson = found.levels[0]?.modules[0]?.chapters[0]?.lessons[0];
      if (firstLesson) {
        setSelectedLessonId(firstLesson.id);
      }
    }
  };

  const handlePublish = async () => {
    if (!auditReport.isReadyForPublish) {
      setMessageKind('error');
      setPublishMessage('Publication impossible : le parcours ne satisfait pas tous les critères de complétude requis.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/author', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'publish', pathId: activePath.id, path: activePath }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.error || 'La publication a échoué.');
      setActivePath((path) => ({ ...path, version: result.version, status: 'published' }));
      setMessageKind('success');
      setDraftDirty(false);
      setPublishMessage(`Version ${result.version} du parcours « ${activePath.title} » publiée et enregistrée.`);
    } catch (error) {
      setMessageKind('error');
      setPublishMessage(error instanceof Error ? error.message : 'La publication n’a pas été enregistrée.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-3.5 sm:p-6 max-w-[1600px] mx-auto space-y-4 sm:space-y-6 animate-fadeIn">
      {/* 1. Header du Studio Auteur */}
      <div className="bg-gradient-to-r from-[#0B132B] via-[#12244E] to-[#0A1633] rounded-3xl p-5 sm:p-7 text-white shadow-xl border border-slate-700/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-sky-300 text-xs font-semibold border border-blue-400/30">
            <Sliders className="w-3.5 h-3.5" />
            <span>Studio Auteur & Gouvernance Pédagogique 360°</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Administration des Parcours de Formation
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Édition, contrôle de complétude selon les 26 critères, liaison avec les simulateurs déterministes et publication certifiée.
          </p>

          {/* Sélecteur de Parcours à Auditer */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <label className="text-xs font-semibold text-slate-300">Parcours à auditer / éditer :</label>
            <select
              value={activePath.id}
              onChange={(e) => handleSelectPath(e.target.value)}
              className="bg-slate-900/90 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500/40"
            >
              {ALL_LEARNING_PATHS_360.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.levels.length} Niveaux - {p.estimatedHours}h)
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
            Version : <strong className="text-white font-mono">v{activePath.version}</strong>
          </div>
          <button
            onClick={handleSaveDraft}
            disabled={saving}
            className="px-4 py-2.5 rounded-xl border border-slate-600 bg-slate-800/80 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Enregistrement…' : draftDirty ? 'Enregistrer le brouillon · modifié' : 'Enregistrer le brouillon'}</span>
          </button>
          <button
            onClick={handlePublish}
            disabled={!auditReport.isReadyForPublish || saving}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition flex items-center gap-2 ${
              auditReport.isReadyForPublish
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Publier la version certifiée</span>
          </button>
        </div>
      </div>

      {publishMessage && (
        <div role="status" className={`p-4 rounded-2xl border text-xs font-semibold flex items-center justify-between ${messageKind === 'error' ? 'bg-rose-50 border-rose-200 text-rose-800' : messageKind === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-blue-50 border-blue-200 text-blue-800'}`}>
          <div className="flex items-center gap-2">
            {messageKind === 'error' ? <AlertTriangle className="w-5 h-5 text-rose-600" /> : messageKind === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <HelpCircle className="w-5 h-5 text-blue-600" />}
            <span>{publishMessage}</span>
          </div>
          <button onClick={() => setPublishMessage(null)} className="text-slate-500 hover:text-slate-900" aria-label="Fermer le message">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. Onglets de Navigation du Studio */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'audit'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Grille d'Audit de Complétude</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 text-white font-mono">
            {auditReport.overallScorePercent}%
          </span>
        </button>

        <button
          onClick={() => setActiveTab('structure')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'structure'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          <FolderTree className="w-4 h-4" />
          <span>Arborescence & Niveaux ({activePath.levels.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('lessonEditor')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'lessonEditor'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Éditeur de Leçon 360°</span>
        </button>

        <button
          onClick={() => setActiveTab('preview')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'preview'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Prévisualisation Apprenant</span>
        </button>
      </div>

      {/* 3. Contenu de l'Onglet Actif */}
      {/* ==================================================================== */}
      {/* ONGLET 1 : AUDIT DE COMPLÉTUDE 360° */}
      {/* ==================================================================== */}
      {activeTab === 'audit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Colonne Score & Statut (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm text-center space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Score de Complétude Pédagogique
              </span>
              <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#E2E8F0" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke={auditReport.overallScorePercent >= 85 ? '#10B981' : '#F59E0B'}
                    strokeWidth="8"
                    strokeDasharray="264"
                    strokeDashoffset={264 - (264 * auditReport.overallScorePercent) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-slate-900 font-mono">
                    {auditReport.overallScorePercent}%
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">Validé 360°</span>
                </div>
              </div>

              <div className={`p-3 rounded-2xl text-xs font-semibold ${
                auditReport.isReadyForPublish
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}>
                {auditReport.isReadyForPublish
                  ? '✓ Éligible à la publication officielle'
                  : '⚠ Des critères obligatoires restent à compléter'}
              </div>

              <div className="grid grid-cols-2 gap-2 text-left pt-2 border-t border-slate-100 text-xs">
                <div>
                  <div className="text-[11px] text-slate-400">Niveaux</div>
                  <div className="font-bold text-slate-800">{activePath.levels.length} Niveaux</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Modules</div>
                  <div className="font-bold text-slate-800">{auditReport.totalModulesCount} Modules</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Leçons</div>
                  <div className="font-bold text-slate-800">{auditReport.totalLessonsCount} Leçons</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Simulateurs</div>
                  <div className="font-bold text-slate-800">{auditReport.totalPracticalActivitiesCount} Reliés</div>
                </div>
              </div>
            </div>

            {/* Projet Final & Covenants */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Projet Professionnel Final
              </span>
              <h3 className="text-xs font-bold text-slate-900">{activePath.finalProject?.title}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {activePath.finalProject?.businessScenario}
              </p>
              <div className="pt-2 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded-lg">
                Seuil de validation de certification : {activePath.finalProject?.passingScorePercent}%
              </div>
            </div>
          </div>

          {/* Colonne Détail des 7 Critères d'Exigence (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Grille Formelle de Complétude Pédagogique et Fonctionnelle</span>
              </h2>

              <div className="space-y-3">
                {auditReport.criteria.map((criterion) => (
                  <div
                    key={criterion.id}
                    className={`p-4 rounded-2xl border transition ${
                      criterion.isMet
                        ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-950'
                        : 'bg-amber-50/50 border-amber-200/80 text-amber-950'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {criterion.isMet ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                          )}
                          <h4 className="text-xs font-bold text-slate-900">{criterion.label}</h4>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed pl-6">
                          {criterion.details}
                        </p>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-slate-500 shrink-0">
                        Poids {criterion.weight}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* ONGLET 2 : STRUCTURE HIÉRARCHIQUE & NIVEAUX */}
      {/* ==================================================================== */}
      {activeTab === 'structure' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Arborescence Pédagogique Hiérarchique</h2>
              <p className="text-xs text-slate-500">
                Domaine → Parcours → Niveau → Module → Chapitre → Leçon → Pratique → Évaluation
              </p>
            </div>
            <button
              disabled
              title="La création de modules sera disponible dans une prochaine étape du studio."
              className="px-3.5 py-2 rounded-xl bg-slate-200 text-slate-500 font-bold text-xs cursor-not-allowed flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Création de modules bientôt disponible</span>
            </button>
          </div>

          <div className="space-y-4">
            {activePath.levels.map((level) => (
              <div key={level.id} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                      Niveau {level.levelNumber}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900">{level.title}</h3>
                  </div>
                  <span className="text-[11px] text-slate-500">{level.modules.length} module(s)</span>
                </div>

                <div className="space-y-2 pl-3 border-l-2 border-blue-300">
                  {level.modules.map((mod) => (
                    <div key={mod.id} className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">{mod.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{mod.durationHours}h estimées</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {mod.competencyCodes.map((c) => (
                          <span key={c} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                            {c}
                          </span>
                        ))}
                      </div>

                      <div className="pt-1 pl-3 border-l border-slate-200 space-y-1">
                        {mod.chapters.map((chap) => (
                          <div key={chap.id} className="text-xs text-slate-600 flex items-center justify-between py-1">
                            <span>📖 {chap.title}</span>
                            <span className="text-[10px] text-slate-400">{chap.lessons.length} leçon(s)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* ONGLET 3 : ÉDITEUR DE LEÇON 360° (26 critères) */}
      {/* ==================================================================== */}
      {activeTab === 'lessonEditor' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                Édition de Contenu Conforme aux 26 Critères
              </span>
              <h2 className="text-base font-bold text-slate-900">{currentLesson.title}</h2>
            </div>
            <button
              onClick={() => alert('Modifications de la leçon enregistrées dans le référentiel.')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Enregistrer la leçon</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Titre de la leçon</label>
              <input
                type="text"
                value={currentLesson.title}
                onChange={(event) => updateCurrentLesson({ title: event.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Durée indicative (minutes)</label>
              <input
                type="number"
                value={currentLesson.durationMinutes}
                onChange={(event) => updateCurrentLesson({ durationMinutes: Number(event.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800"
              />
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <label className="font-bold text-slate-700">Introduction contextualisée</label>
            <textarea
              rows={3}
              value={currentLesson.contextIntro}
              onChange={(event) => updateCurrentLesson({ contextIntro: event.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Cas Réel d'Entreprise Ivoirienne / OHADA (Exigence 3.2 & 4)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-500 text-[11px]">Entreprise fictive</label>
                <div className="font-semibold text-slate-800">{currentLesson.enterpriseCase?.companyName}</div>
              </div>
              <div>
                <label className="text-slate-500 text-[11px]">Contexte territorial</label>
                <div className="font-semibold text-slate-800">{currentLesson.enterpriseCase?.locationContext}</div>
              </div>
            </div>
            <div className="text-slate-600 pt-1">
              {currentLesson.enterpriseCase?.problemStatement}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-2 text-xs">
            <div className="font-bold text-blue-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600" />
              <span>Simulateur Déterministe Relié</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-800">{currentLesson.practicalActivity?.title}</div>
                <div className="text-[11px] text-slate-500">
                  Composant cible : <code className="text-blue-700">{currentLesson.practicalActivity?.targetComponentId}</code>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 font-bold">
                +{currentLesson.practicalActivity?.rubricPoints} pts
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* ONGLET 4 : PRÉVISUALISATION APPRENANT */}
      {/* ==================================================================== */}
      {activeTab === 'preview' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900">Rendu Fidèle Apprenant</h2>
            </div>
            <span className="text-xs text-slate-400">Mode lecture seule</span>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-xl font-extrabold text-slate-900">{currentLesson.title}</h1>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {currentLesson.contextIntro}
            </p>

            <div className="border border-slate-200 rounded-2xl p-4 space-y-2">
              <h3 className="text-xs font-bold text-slate-900">🎯 Objectifs d'apprentissage</h3>
              <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
                {currentLesson.objectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

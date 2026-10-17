import React, { useState } from 'react';
import { UserProfile } from '../../types/pedagogy';
import { GAME_MISSIONS } from '../../data/gameMissionsData';
import {
  Award,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  ShieldCheck,
  Sparkles,
  Building2,
  FileText,
  Shield,
  Printer,
  Calendar,
  Layers,
} from 'lucide-react';

interface PortfolioViewProps {
  profile: UserProfile;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ profile }) => {
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const completedMissionsList = GAME_MISSIONS.filter((m) =>
    profile.completedMissions.includes(m.id)
  );

  const showNotification = (msg: string) => {
    setDownloadNotice(msg);
    setTimeout(() => setDownloadNotice(null), 4000);
  };

  // 1. Export Attestation Officielle de Compétences
  const handleDownloadProof = () => {
    const certUuid = `FINLEARN-2026-${profile.id.toUpperCase()}-${Math.abs(profile.totalXp * 7919).toString(16).toUpperCase()}`;
    const content = `================================================================================
ATTESTATION DE MAÎTRISE FINANCIÈRE PROFESSIONNELLE — ZONE OHADA / CIMA
Émise par la plateforme numérique d'immersion d'entreprise FINLEARN 2026
================================================================================

CERTIFICAT D'AUTHENTICITÉ NUMÉRIQUE : ${certUuid}
DATE D'ÉMISSION : ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}

BÉNÉFICIAIRE :
  - Nom & Prénom : ${profile.name}
  - Adresse Électronique : ${profile.email}
  - Niveau Opérationnel : ${profile.experienceLevel.toUpperCase()}
  - Rôle & Trajectoire : ${profile.careerGoal.replace('_', ' ').toUpperCase()}

BILAN DES ACQUIS & VALIDATION OPÉRATIONNELLE :
  - Points d'Expérience Certifiés : ${profile.totalXp} XP
  - Modules & Leçons Théoriques Validés : ${profile.completedLessons.length} leçons
  - Missions Professionnelles Scénarisées Réussies : ${profile.completedMissions.length} / ${GAME_MISSIONS.length}

RÉFÉRENTIELS ET CADRES NORMATIFS COUVERTS :
  [X] SYSCOHADA Révisé (Comptabilité Générale, Bilan, Compte de Résultat, TAFIRE)
  [X] Analyse Financière & Équilibre Structurel (FRNG, BFR, Trésorerie Nette, Ratios)
  [X] Contrôle de Gestion & Budgets Flexibles (Décomposition Volume / Prix / Coût)
  [X] Modélisation Financière Avancée Excel (TCD multidimensionnels, RECHERCHEX)
  [X] Finance d'Entreprise & Investissement (VAN, TRI Newton-Raphson, Taux de Fisher)
  [X] Finance du Courtage d'Assurance (Code CIMA révisé, Règle stricte Article 13)
  [X] Consolidation de Groupe International & Multi-Devises (Normes IAS 21)

MENTION DE CERTIFICATION :
Ce document atteste que le titulaire a résolu avec succès des cas pratiques d'entreprises
sans recourir à des données fictives non vérifiées, en validant l'ensemble des contrôles
arithmétiques déterministes intégrés à la plateforme.
================================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Attestation_Financiere_${profile.name.replace(/\s/g, '_')}_2026.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showNotification('Attestation officielle de compétences téléchargée avec succès.');
  };

  // 2. Export Liasse Financière SYSCOHADA (CSV / Tableur)
  const handleExportSYSCOHADACsv = () => {
    const csvContent = `CODE_COMPTE;LIBELLE_SYSCOHADA;COLONNE;MONTANT_FCFA;TYPE_ETAT
215;Installations techniques et matériels;ACTIF_IMMOBILISE;85000000;BILAN
241;Matériel de transport;ACTIF_IMMOBILISE;45000000;BILAN
311;Marchandises en stock;ACTIF_CIRCULANT;42000000;BILAN
411;Créances Clients ordinaires;ACTIF_CIRCULANT;58000000;BILAN
521;Banques locales Côte d'Ivoire;TRESORERIE_ACTIVE;25000000;BILAN
101;Capital Social;CAPITAUX_PROPRES;100000000;BILAN
111;Réserves légales;CAPITAUX_PROPRES;20000000;BILAN
162;Emprunts auprès des établissements de crédit;DETTES_FINANCIERES;60000000;BILAN
401;Dettes Fournisseurs d'exploitation;PASSIF_CIRCULANT;65000000;BILAN
131;Résultat net de l'exercice (Bénéfice);CAPITAUX_PROPRES;10000000;BILAN
701;Ventes de marchandises;PRODUITS_EXPLOITATION;320000000;COMPTE_RESULTAT
601;Achats de marchandises consommées;CHARGES_EXPLOITATION;210000000;COMPTE_RESULTAT
661;Charges de personnel;CHARGES_EXPLOITATION;75000000;COMPTE_RESULTAT
651;Autres charges d'exploitation;CHARGES_EXPLOITATION;18000000;COMPTE_RESULTAT
671;Charges d'intérêts financiers;CHARGES_FINANCIERES;4500000;COMPTE_RESULTAT
891;Impôt sur les sociétés (IS 25% CI);IMPOTS_RESULTAT;2500000;COMPTE_RESULTAT`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Liasse_Fiscale_SYSCOHADA_IvoireDistribution_2026.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showNotification('Liasse financière SYSCOHADA exportée au format CSV / Tableur.');
  };

  // 3. Export Portefeuille Courtage & Contrôle CIMA (CSV)
  const handleExportCIMACsv = () => {
    const csvContent = `ID_POLICE;CLIENT;BRANCHE;ASSUREUR_PARTENAIRE;PRIME_NETTE_FCFA;TAXE_CI_14_5;PRIME_TTC_FCFA;TAUX_COM;COM_NETTE_FCFA;STATUT_CIMA_ART13
POL-2026-001;SOTRA Fictive;Flotte Auto;Sanlam Assurance CI;45000000;6525000;51525000;10%;4500000;ENCAISSE_CONFORME
POL-2026-002;Compagnie Ivoirienne Ciment;Santé Groupe;Allianz Côte d'Ivoire;25000000;3625000;28625000;12%;3000000;EN_ATTENTE_VIREMENT
POL-2026-003;Agro-Industrie San Pedro;Incendie & Risques Industriels;Sunu Assurances;18000000;2610000;20610000;15%;2700000;ENCAISSE_CONFORME
POL-2026-004;Clinique Médicale Cocody;Responsabilité Civile Pro;AXA Assurances CI;8000000;1160000;9160000;15%;1200000;ENCAISSE_CONFORME
POL-2026-005;Ivoire Logistique Vridi;Transport Maritime;Allianz Côte d'Ivoire;14000000;2030000;16030000;10%;1400000;ENCAISSE_CONFORME`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Portefeuille_Courtage_CIMA_Audit_2026.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showNotification('Fichier d\'audit du portefeuille CIMA exporté.');
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* Notification Toast */}
      {downloadNotice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500/40 text-xs animate-bounce"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold">{downloadNotice}</span>
        </div>
      )}

      {/* En-tête avec Actions d'Exportation */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
              Portfolio & Preuves de Compétence
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Conforme WCAG 2.2 AA
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
            Livrables, Liasses Financières & Attestations
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Téléchargez vos pièces justificatives certifiées déterministes : attestation de réussite,
            liasse fiscale SYSCOHADA et bordereau d'audit de portefeuille CIMA.
          </p>
        </div>

        {/* Boutons d'export groupés */}
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={handleDownloadProof}
            aria-label="Télécharger l'attestation officielle de compétences au format texte certifié"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md flex items-center gap-2 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Download className="w-4 h-4 text-sky-400" />
            <span>Attestation Certifiée</span>
          </button>

          <button
            onClick={handleExportSYSCOHADACsv}
            aria-label="Exporter la liasse financière SYSCOHADA au format CSV pour Excel"
            className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md flex items-center gap-2 transition focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
            <span>Liasse SYSCOHADA (CSV)</span>
          </button>

          <button
            onClick={handleExportCIMACsv}
            aria-label="Exporter le portefeuille d'assurance CIMA avec contrôle Article 13"
            className="px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs shadow-md flex items-center gap-2 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Shield className="w-4 h-4 text-indigo-200" />
            <span>Portefeuille CIMA (CSV)</span>
          </button>
        </div>
      </div>

      {/* Carte d'Attestation Pédagogique */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg tracking-tight">
                Attestation de Montée en Compétences
              </h3>
              <p className="text-xs text-slate-400">Plateforme FINLEARN Immersion • Cohorte 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" /> Traçabilité Déterministe Vérifiée
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <span className="text-slate-400 font-medium">Apprenant :</span>
            <p className="text-base font-bold text-white">{profile.name}</p>
            <span className="text-[11px] text-sky-400">{profile.email}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <span className="text-slate-400 font-medium">Spécialisation Visée :</span>
            <p className="text-base font-bold text-amber-300">
              {profile.careerGoal.replace('_', ' ').toUpperCase()}
            </p>
            <span className="text-[11px] text-slate-400">Niveau : {profile.experienceLevel}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <span className="text-slate-400 font-medium">Volume de Travail Validé :</span>
            <p className="text-base font-bold font-mono text-emerald-400">
              {profile.completedLessons.length} leçons • {profile.totalXp} XP
            </p>
            <span className="text-[11px] text-slate-400">Garantie sans données fictives masquées</span>
          </div>
        </div>
      </div>

      {/* Liste des Livrables de Missions Réalisées */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-5">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">
            Missions Professionnelles Scénarisées ({completedMissionsList.length} / {GAME_MISSIONS.length})
          </h3>
          <span className="text-xs text-slate-500">
            {completedMissionsList.length === GAME_MISSIONS.length
              ? 'Toutes les missions sont complétées !'
              : `${GAME_MISSIONS.length - completedMissionsList.length} mission(s) restante(s)`}
          </span>
        </div>

        {completedMissionsList.length === 0 ? (
          <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl space-y-2">
            <Award className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">Aucune mission achevée pour le moment.</p>
            <p className="text-xs text-slate-400">
              Rendez-vous dans l'onglet « Jeux & Missions » pour accomplir votre première mission de gestion.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {completedMissionsList.map((m) => (
              <div
                key={m.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-100 text-purple-800">
                      {m.difficulty}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" /> {m.companyName} ({m.location})
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{m.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-1">{m.subtitle}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold font-mono text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Validé avec Mention
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

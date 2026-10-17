import { useState } from 'react';
import {
  computeBudgetVariance,
  ProductBudgetLine,
  GlobalVarianceReport,
} from '../../core/controlling/variance';
import {
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Sliders,
  DollarSign,
  Package,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

const PRESET_PRODUCTS: ProductBudgetLine[] = [
  {
    productId: 'P1',
    productName: 'Jus d\'Ananas Ivoire 1L',
    budgetQuantity: 15000,
    actualQuantity: 18000,
    budgetUnitPrice: 1200,
    actualUnitPrice: 1050, // Concession tarifaire (-150 FCFA)
    budgetUnitVariableCost: 700,
    actualUnitVariableCost: 780, // Hausse matière première (+80 FCFA)
  },
  {
    productId: 'P2',
    productName: 'Purée de Mangue 500g',
    budgetQuantity: 8000,
    actualQuantity: 7200,
    budgetUnitPrice: 2500,
    actualUnitPrice: 2600,
    budgetUnitVariableCost: 1400,
    actualUnitVariableCost: 1450,
  },
];

export const VarianceAnalysisSimulator: React.FC = () => {
  const [products, setProducts] = useState<ProductBudgetLine[]>(PRESET_PRODUCTS);
  const [budgetFixedCosts, setBudgetFixedCosts] = useState<number>(8000000);
  const [actualFixedCosts, setActualFixedCosts] = useState<number>(8800000);

  // Recalcul en temps réel
  const report: GlobalVarianceReport = computeBudgetVariance({
    products,
    budgetFixedCosts,
    actualFixedCosts,
  });

  const handleUpdateProduct = (index: number, field: keyof ProductBudgetLine, value: number) => {
    setProducts((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleReset = () => {
    setProducts(PRESET_PRODUCTS);
    setBudgetFixedCosts(8000000);
    setActualFixedCosts(8800000);
  };

  const formatFCFA = (val: number) => `${Math.round(val).toLocaleString('fr-FR')} FCFA`;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* En-tête Pédagogique */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-3xl text-white shadow-xl border border-indigo-900/40">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-2">
              <Sliders className="w-3.5 h-3.5" /> Contrôle de Gestion & Budgets (GEST-04)
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              Détecteur d'Écarts & Modèle de Budget Flexible
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-3xl">
              Décomposez l'écart global sur résultat entre <strong>Effet Volume</strong> (activité),{' '}
              <strong>Effet Prix</strong> (tarification), <strong>Effet Coûts Variables</strong> (rendement matières/MOD) et{' '}
              <strong>Écart sur Coûts Fixes</strong>. Testez vos hypothèses en direct.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Réinitialiser
          </button>
        </div>
      </div>

      {/* Cartes KPI Synthétiques : Budget vs Flexible vs Réalisé */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Budget Initial</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{formatFCFA(report.budget.operatingIncome)}</p>
          <div className="mt-2 text-xs text-slate-500 space-y-0.5">
            <p>CA : {formatFCFA(report.budget.totalRevenue)}</p>
            <p>Coûts : {formatFCFA(report.budget.totalVariableCosts + report.budget.fixedCosts)}</p>
          </div>
        </div>

        <div className="bg-indigo-50/70 p-5 rounded-2xl border border-indigo-100 shadow-sm">
          <p className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Budget Flexible (Vol. Réel)</p>
          <p className="text-2xl font-black text-indigo-900 mt-1">{formatFCFA(report.flexible.operatingIncome)}</p>
          <div className="mt-2 text-xs text-indigo-700 space-y-0.5">
            <p>CA Flexible : {formatFCFA(report.flexible.totalRevenue)}</p>
            <p>Marge Flexible : {formatFCFA(report.flexible.totalMargin)}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Réalisé Effectif</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{formatFCFA(report.actual.operatingIncome)}</p>
          <div className="mt-2 text-xs text-slate-500 space-y-0.5">
            <p>CA Réalisé : {formatFCFA(report.actual.totalRevenue)}</p>
            <p>Marge Réalisée : {formatFCFA(report.actual.totalMargin)}</p>
          </div>
        </div>

        <div
          className={`p-5 rounded-2xl border shadow-sm ${
            report.variances.operatingIncomeVariance >= 0
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}
        >
          <p className="text-xs font-bold uppercase tracking-wider opacity-80">Écart Global Résultat</p>
          <div className="flex items-center gap-2 mt-1">
            {report.variances.operatingIncomeVariance >= 0 ? (
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            ) : (
              <TrendingDown className="w-6 h-6 text-rose-600" />
            )}
            <p className="text-2xl font-black">
              {report.variances.operatingIncomeVariance >= 0 ? '+' : ''}
              {formatFCFA(report.variances.operatingIncomeVariance)}
            </p>
          </div>
          <p className="text-xs mt-2 opacity-80">
            {report.variances.operatingIncomeVariance >= 0 ? 'Favorable au budget' : 'Défavorable au budget'}
          </p>
        </div>
      </div>

      {/* Décomposition Factorielle Rigoureuse (Waterfall) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            Décomposition Mathématique Certifiée des Écarts
          </h3>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            Égalité Arithmétique 100% Vérifiée
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          {/* Effet Volume */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1">
              <span>Effet Volume (Marge)</span>
              <span className="text-[10px] font-mono">(Qr - Qb) × Mb</span>
            </div>
            <p
              className={`text-lg font-black ${
                report.variances.volumeEffectOnMargin >= 0 ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {report.variances.volumeEffectOnMargin >= 0 ? '+' : ''}
              {formatFCFA(report.variances.volumeEffectOnMargin)}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Gain ou perte imputable à la variation des quantités vendues.
            </p>
          </div>

          {/* Effet Prix */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1">
              <span>Effet Prix de Vente</span>
              <span className="text-[10px] font-mono">(Pr - Pb) × Qr</span>
            </div>
            <p
              className={`text-lg font-black ${
                report.variances.priceEffectOnRevenue >= 0 ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {report.variances.priceEffectOnRevenue >= 0 ? '+' : ''}
              {formatFCFA(report.variances.priceEffectOnRevenue)}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Impact des augmentations de tarifs ou concessions de remises.
            </p>
          </div>

          {/* Effet Coûts Variables */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1">
              <span>Dérive Coûts Variables</span>
              <span className="text-[10px] font-mono">(Cvur - Cvub) × Qr</span>
            </div>
            <p
              className={`text-lg font-black ${
                report.variances.costEffectOnVariableCosts <= 0 ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {report.variances.costEffectOnVariableCosts > 0 ? '+' : ''}
              {formatFCFA(report.variances.costEffectOnVariableCosts)}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Surcoût d'approvisionnement ou perte de productivité matière/MOD.
            </p>
          </div>

          {/* Écart Coûts Fixes */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1">
              <span>Dépassement Coûts Fixes</span>
              <span className="text-[10px] font-mono">CFr - CFb</span>
            </div>
            <p
              className={`text-lg font-black ${
                report.variances.fixedCostSpendingVariance <= 0 ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {report.variances.fixedCostSpendingVariance > 0 ? '+' : ''}
              {formatFCFA(report.variances.fixedCostSpendingVariance)}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Frais généraux réels comparés à l'enveloppe budgétaire allouée.
            </p>
          </div>
        </div>

        {/* Effet Mix (si multi-produits) */}
        {report.mixVariance && (
          <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <p className="text-xs font-bold text-indigo-900">
                Analyse Fine du Panier Commercial (Effet Mix de Vente)
              </p>
              <p className="text-xs text-indigo-700 mt-0.5">
                Sur un effet volume global de {formatFCFA(report.variances.volumeEffectOnMargin)}, la déformation du
                mix produit a généré :
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono font-bold">
              <span>
                Volume Pur :{' '}
                <strong className={report.mixVariance.volumeActivityEffect >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                  {formatFCFA(report.mixVariance.volumeActivityEffect)}
                </strong>
              </span>
              <span>
                Effet Mix :{' '}
                <strong className={report.mixVariance.mixCompositionEffect >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                  {formatFCFA(report.mixVariance.mixCompositionEffect)}
                </strong>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Paramètres Modifiables par Produit */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Package className="w-4 h-4 text-indigo-600" />
          Paramètres Opérationnels par Produit (Atelier de Simulation)
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {products.map((p, idx) => (
            <div key={p.productId} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900 text-sm">{p.productName}</span>
                <span className="text-xs font-mono text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  {p.productId}
                </span>
              </div>

              {/* Quantités */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Volume Vendu : Budget vs Réalisé</span>
                  <span className="font-mono font-bold text-slate-900">
                    {p.actualQuantity.toLocaleString('fr-FR')} / {p.budgetQuantity.toLocaleString('fr-FR')} unités
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="30000"
                  step="500"
                  value={p.actualQuantity}
                  onChange={(e) => handleUpdateProduct(idx, 'actualQuantity', Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              {/* Prix de vente */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Prix Unitaire HT : Budget vs Réalisé</span>
                  <span className="font-mono font-bold text-slate-900">
                    {p.actualUnitPrice.toLocaleString('fr-FR')} / {p.budgetUnitPrice.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="50"
                  value={p.actualUnitPrice}
                  onChange={(e) => handleUpdateProduct(idx, 'actualUnitPrice', Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              {/* Coût variable unitaire */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Coût Variable Unitaire HT : Budget vs Réalisé</span>
                  <span className="font-mono font-bold text-slate-900">
                    {p.actualUnitVariableCost.toLocaleString('fr-FR')} / {p.budgetUnitVariableCost.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="3500"
                  step="25"
                  value={p.actualUnitVariableCost}
                  onChange={(e) => handleUpdateProduct(idx, 'actualUnitVariableCost', Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Coûts Fixes Globaux */}
        <div className="p-5 rounded-2xl bg-indigo-50/40 border border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-900">Frais Généraux & Coûts Fixes de Structure</span>
            <p className="text-xs text-slate-500">Loyers, abonnements, salaires fixes et charges administratives.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-500">Coûts Fixes Réalisés</span>
              <input
                type="number"
                step="100000"
                value={actualFixedCosts}
                onChange={(e) => setActualFixedCosts(Number(e.target.value))}
                className="w-36 px-3 py-1.5 text-xs font-mono font-bold border rounded-xl bg-white border-slate-300"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-500">Budget Fixe</span>
              <span className="block px-3 py-1.5 text-xs font-mono text-slate-600 bg-slate-100 rounded-xl">
                {formatFCFA(budgetFixedCosts)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostic Managérial & Recommandations d'Action */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg space-y-4">
        <h3 className="text-base font-bold flex items-center gap-2 text-indigo-400">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          Synthèse du Contrôleur de Gestion & Préconisations
        </h3>
        <div className="space-y-2.5">
          {report.managerialDiagnosis.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-slate-800/80 rounded-xl text-xs text-slate-200 border border-slate-700">
              <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

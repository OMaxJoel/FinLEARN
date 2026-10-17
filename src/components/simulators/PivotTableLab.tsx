import { useState } from 'react';
import {
  computePivotTable,
  PivotConfig,
  PivotResult,
  AggregationFunction,
} from '../../core/excel/pivot';
import {
  Table,
  Filter,
  BarChart3,
  Layers,
  Database,
  RotateCcw,
  Sliders,
  DollarSign,
  Check,
  Building2,
  Download,
} from 'lucide-react';

interface SalesRecord {
  id: string;
  date: string;
  region: string;
  productFamily: string;
  salesRep: string;
  channel: string;
  unitsSold: number;
  revenue: number;
  cost: number;
  margin: number;
}

const SAMPLE_DATASET: SalesRecord[] = [
  { id: 'T01', date: '2026-01-05', region: 'Abidjan Sud', productFamily: 'Boissons', salesRep: 'Koffi', channel: 'Grossistes', unitsSold: 500, revenue: 12500000, cost: 7500000, margin: 5000000 },
  { id: 'T02', date: '2026-01-08', region: 'Abidjan Sud', productFamily: 'Cosmétiques', salesRep: 'Aminata', channel: 'Supermarchés', unitsSold: 200, revenue: 6000000, cost: 3200000, margin: 2800000 },
  { id: 'T03', date: '2026-01-12', region: 'Abidjan Nord', productFamily: 'Boissons', salesRep: 'Ibrahim', channel: 'Grossistes', unitsSold: 600, revenue: 15000000, cost: 9000000, margin: 6000000 },
  { id: 'T04', date: '2026-01-15', region: 'San Pedro', productFamily: 'Agro-alimentaire', salesRep: 'Mariam', channel: 'Grossistes', unitsSold: 350, revenue: 8750000, cost: 5250000, margin: 3500000 },
  { id: 'T05', date: '2026-01-18', region: 'San Pedro', productFamily: 'Boissons', salesRep: 'Mariam', channel: 'Boutiques', unitsSold: 180, revenue: 4500000, cost: 2700000, margin: 1800000 },
  { id: 'T06', date: '2026-01-22', region: 'Bouaké', productFamily: 'Agro-alimentaire', salesRep: 'Ibrahim', channel: 'Grossistes', unitsSold: 450, revenue: 11250000, cost: 6750000, margin: 4500000 },
  { id: 'T07', date: '2026-01-25', region: 'Bouaké', productFamily: 'Cosmétiques', salesRep: 'Koffi', channel: 'Boutiques', unitsSold: 120, revenue: 3600000, cost: 1920000, margin: 1680000 },
  { id: 'T08', date: '2026-02-02', region: 'Abidjan Nord', productFamily: 'Cosmétiques', salesRep: 'Aminata', channel: 'Supermarchés', unitsSold: 300, revenue: 9000000, cost: 4800000, margin: 4200000 },
  { id: 'T09', date: '2026-02-05', region: 'Abidjan Sud', productFamily: 'Agro-alimentaire', salesRep: 'Koffi', channel: 'Supermarchés', unitsSold: 400, revenue: 10000000, cost: 6000000, margin: 4000000 },
  { id: 'T10', date: '2026-02-10', region: 'Yamoussoukro', productFamily: 'Boissons', salesRep: 'Mariam', channel: 'Grossistes', unitsSold: 320, revenue: 8000000, cost: 4800000, margin: 3200000 },
  { id: 'T11', date: '2026-02-14', region: 'Yamoussoukro', productFamily: 'Agro-alimentaire', salesRep: 'Mariam', channel: 'Boutiques', unitsSold: 150, revenue: 3750000, cost: 2250000, margin: 1500000 },
  { id: 'T12', date: '2026-02-20', region: 'Abidjan Nord', productFamily: 'Agro-alimentaire', salesRep: 'Ibrahim', channel: 'Grossistes', unitsSold: 500, revenue: 12500000, cost: 7500000, margin: 5000000 },
];

export const PivotTableLab: React.FC = () => {
  const [rowField, setRowField] = useState<string>('region');
  const [colField, setColField] = useState<string>('channel');
  const [valField, setValField] = useState<string>('revenue');
  const [aggregation, setAggregation] = useState<AggregationFunction>('SUM');

  // Filtres segments (Slicers)
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);
  const [showRawData, setShowRawData] = useState<boolean>(false);

  // Configuration TCD
  const filters: Record<string, string[]> = {};
  if (selectedChannels.length > 0) filters.channel = selectedChannels;
  if (selectedFamilies.length > 0) filters.productFamily = selectedFamilies;

  const pivotConfig: PivotConfig = {
    rowField,
    colField: colField === 'none' ? undefined : colField,
    valField,
    aggregation,
    filters,
    includeAllDimensions: true,
  };

  const pivotResult: PivotResult = computePivotTable(SAMPLE_DATASET, pivotConfig);

  const formatValue = (val: number) => {
    if (valField === 'unitsSold') {
      return `${Math.round(val).toLocaleString('fr-FR')} u`;
    }
    return `${Math.round(val).toLocaleString('fr-FR')} FCFA`;
  };

  const toggleChannelFilter = (channel: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]
    );
  };

  const toggleFamilyFilter = (fam: string) => {
    setSelectedFamilies((prev) =>
      prev.includes(fam) ? prev.filter((f) => f !== fam) : [...prev, fam]
    );
  };

  const handleResetFilters = () => {
    setSelectedChannels([]);
    setSelectedFamilies([]);
    setRowField('region');
    setColField('channel');
    setValField('revenue');
    setAggregation('SUM');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* En-tête Pédagogique */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-6 rounded-3xl text-white shadow-xl border border-sky-900/40">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30 mb-2">
              <Table className="w-3.5 h-3.5" /> Compétence 3 — Excel Avancé (EXCEL-05)
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              Studio de Reporting & Tableaux Croisés Dynamiques (TCD)
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-3xl">
              Générez des synthèses multidimensionnelles à partir de la base de données commerciale d'Ivoire Distribution.
              Glissez-déposez les axes, appliquez des segments (slicers) et analysez les ventes par région et canal.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRawData(!showRawData)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all shadow-sm"
            >
              <Database className="w-3.5 h-3.5" /> {showRawData ? 'Masquer Base Brute' : 'Voir Base Brute'}
            </button>
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Réinitialiser
            </button>
          </div>
        </div>
      </div>

      {/* Base Brute Dépliable */}
      {showRawData && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-sky-600" />
              Extrait de la Base de Données Commerciale ({SAMPLE_DATASET.length} transactions)
            </h3>
            <span className="text-xs text-slate-500">Source : ERP Ivoire Distribution SARL</span>
          </div>
          <div className="overflow-x-auto max-h-64">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold sticky top-0">
                <tr>
                  <th className="p-2.5">ID</th>
                  <th className="p-2.5">Date</th>
                  <th className="p-2.5">Région</th>
                  <th className="p-2.5">Famille</th>
                  <th className="p-2.5">Commercial</th>
                  <th className="p-2.5">Canal</th>
                  <th className="p-2.5 text-right">Volume</th>
                  <th className="p-2.5 text-right">CA (FCFA)</th>
                  <th className="p-2.5 text-right">Marge (FCFA)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {SAMPLE_DATASET.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-slate-900">{r.id}</td>
                    <td className="p-2 text-slate-600">{r.date}</td>
                    <td className="p-2 text-slate-800">{r.region}</td>
                    <td className="p-2 text-slate-800">{r.productFamily}</td>
                    <td className="p-2 text-slate-600">{r.salesRep}</td>
                    <td className="p-2 text-slate-800">{r.channel}</td>
                    <td className="p-2 text-right">{r.unitsSold}</td>
                    <td className="p-2 text-right font-bold text-emerald-700">{r.revenue.toLocaleString('fr-FR')}</td>
                    <td className="p-2 text-right text-indigo-700">{r.margin.toLocaleString('fr-FR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Panneau de Configuration du TCD */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-sky-600" />
          Champs du Tableau Croisé Dynamique & Slicers
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Lignes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Lignes (Dimensions)</label>
            <select
              value={rowField}
              onChange={(e) => setRowField(e.target.value)}
              className="w-full text-xs font-bold p-2.5 border rounded-xl bg-slate-50 border-slate-300 text-slate-900"
            >
              <option value="region">Région (Abidjan, San Pedro, Bouaké...)</option>
              <option value="productFamily">Famille de Produits</option>
              <option value="salesRep">Commercial</option>
              <option value="channel">Canal de Vente</option>
            </select>
          </div>

          {/* Colonnes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Colonnes (Dimensions)</label>
            <select
              value={colField}
              onChange={(e) => setColField(e.target.value)}
              className="w-full text-xs font-bold p-2.5 border rounded-xl bg-slate-50 border-slate-300 text-slate-900"
            >
              <option value="channel">Canal de Vente</option>
              <option value="productFamily">Famille de Produits</option>
              <option value="salesRep">Commercial</option>
              <option value="none">(Aucune colonne croisée - Synthèse 1D)</option>
            </select>
          </div>

          {/* Valeur */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Valeurs (Métrique)</label>
            <select
              value={valField}
              onChange={(e) => setValField(e.target.value)}
              className="w-full text-xs font-bold p-2.5 border rounded-xl bg-slate-50 border-slate-300 text-slate-900"
            >
              <option value="revenue">Chiffre d'Affaires (FCFA)</option>
              <option value="margin">Marge Brute (FCFA)</option>
              <option value="unitsSold">Volume Vendu (Unités)</option>
              <option value="cost">Coût de Vente (FCFA)</option>
            </select>
          </div>

          {/* Opération d'agrégation */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Synthèse (Fonction)</label>
            <select
              value={aggregation}
              onChange={(e) => setAggregation(e.target.value as AggregationFunction)}
              className="w-full text-xs font-bold p-2.5 border rounded-xl bg-slate-50 border-slate-300 text-slate-900"
            >
              <option value="SUM">SOMME (Total)</option>
              <option value="AVERAGE">MOYENNE</option>
              <option value="COUNT">NB (Nombre de transactions)</option>
              <option value="MAX">MAX (Valeur maximale)</option>
              <option value="MIN">MIN (Valeur minimale)</option>
            </select>
          </div>
        </div>

        {/* Segments (Slicers) */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-6 items-center">
          {/* Slicer Canaux */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Segment Canal de Vente :
            </span>
            <div className="flex gap-2">
              {['Grossistes', 'Supermarchés', 'Boutiques'].map((ch) => {
                const isActive = selectedChannels.includes(ch);
                return (
                  <button
                    key={ch}
                    onClick={() => toggleChannelFilter(ch)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      isActive
                        ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {ch}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slicer Familles */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Segment Famille de Produits :
            </span>
            <div className="flex gap-2">
              {['Boissons', 'Cosmétiques', 'Agro-alimentaire'].map((f) => {
                const isActive = selectedFamilies.includes(f);
                return (
                  <button
                    key={f}
                    onClick={() => toggleFamilyFilter(f)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Grille du Tableau Croisé Dynamique */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Tableau Croisé Dynamique Généré
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Agrégation : {aggregation} de {valField} | {pivotResult.filteredCount} lignes filtrées sur{' '}
              {pivotResult.totalRecordsCount} au total.
            </p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-right">
            <span className="text-[10px] uppercase font-bold text-emerald-800 block">Total Général</span>
            <span className="text-lg font-black text-emerald-950 font-mono">
              {formatValue(pivotResult.grandTotal)}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-3 font-bold border-r border-slate-800 uppercase tracking-wider">
                  {rowField}
                </th>
                {pivotResult.colKeys.map((c) => (
                  <th key={c} className="p-3 font-bold text-right border-r border-slate-800 uppercase tracking-wider">
                    {c}
                  </th>
                ))}
                {pivotResult.colKeys.length > 1 && (
                  <th className="p-3 font-black text-right uppercase tracking-wider bg-slate-950 text-amber-300">
                    Total Général
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 border-b border-slate-200">
              {pivotResult.rowKeys.map((r) => (
                <tr key={r} className="hover:bg-sky-50/50 transition-colors">
                  <td className="p-3 font-bold text-slate-900 bg-slate-50 border-r border-slate-200">
                    {r}
                  </td>
                  {pivotResult.colKeys.map((c) => {
                    const val = pivotResult.matrix[r]?.[c] ?? 0;
                    return (
                      <td key={c} className="p-3 text-right font-mono text-slate-800 border-r border-slate-100">
                        {val > 0 ? (
                          formatValue(val)
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </td>
                    );
                  })}
                  {pivotResult.colKeys.length > 1 && (
                    <td className="p-3 text-right font-mono font-black text-slate-900 bg-slate-50">
                      {formatValue(pivotResult.rowTotals[r] ?? 0)}
                    </td>
                  )}
                </tr>
              ))}

              {/* Ligne des Totaux de Colonnes */}
              <tr className="bg-slate-100 font-black text-slate-900 border-t-2 border-slate-300">
                <td className="p-3 uppercase">Total Colonnes</td>
                {pivotResult.colKeys.map((c) => (
                  <td key={c} className="p-3 text-right font-mono border-r border-slate-200">
                    {formatValue(pivotResult.colTotals[c] ?? 0)}
                  </td>
                ))}
                {pivotResult.colKeys.length > 1 && (
                  <td className="p-3 text-right font-mono font-black text-emerald-800 bg-emerald-100">
                    {formatValue(pivotResult.grandTotal)}
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Graphique de Répartition Associé */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-sky-600" />
          Répartition Visuelle par {rowField}
        </h3>

        <div className="space-y-3">
          {pivotResult.rowKeys.map((r) => {
            const rowVal = pivotResult.rowTotals[r] ?? 0;
            const pct = pivotResult.grandTotal > 0 ? (rowVal / pivotResult.grandTotal) * 100 : 0;
            return (
              <div key={r} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">{r}</span>
                  <span className="font-mono text-slate-600">
                    {formatValue(rowVal)} ({Math.round(pct)}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div
                    className="bg-sky-600 h-3 rounded-full transition-all"
                    style={{ width: `${Math.min(100, pct)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

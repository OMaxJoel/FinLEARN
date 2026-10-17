/**
 * FINLEARN IMMERSION 2026 - Moteur de Tableaux Croisés Dynamiques (TCD / Pivot Table)
 * Moteur d'agrégation multidimensionnelle, segments (slicers), calculs et totaux garantis.
 */

export type AggregationFunction = 'SUM' | 'AVERAGE' | 'COUNT' | 'MIN' | 'MAX';

export interface PivotConfig {
  rowField: string;
  colField?: string;
  valField: string;
  aggregation: AggregationFunction;
  filters?: Record<string, string[]>; // champ -> valeurs sélectionnées
  includeAllDimensions?: boolean;     // Conserver les catégories même si valeur 0
}

export interface PivotResult {
  rowKeys: string[];
  colKeys: string[];
  // matrix[rowKey][colKey] = aggregated value
  matrix: Record<string, Record<string, number>>;
  rowTotals: Record<string, number>;
  colTotals: Record<string, number>;
  grandTotal: number;
  filteredCount: number;
  totalRecordsCount: number;
}

export function computePivotTable<T extends Record<string, any>>(
  data: T[],
  config: PivotConfig
): PivotResult {
  const { rowField, colField, valField, aggregation, filters, includeAllDimensions } = config;

  // 1. Filtrage (Slicers)
  const filteredData = data.filter((item) => {
    if (!filters) return true;
    for (const [filterField, allowedValues] of Object.entries(filters)) {
      if (allowedValues.length === 0) continue;
      const itemVal = String(item[filterField] ?? '');
      if (!allowedValues.includes(itemVal)) {
        return false;
      }
    }
    return true;
  });

  // 2. Extraction des dimensions uniques (ordonnées)
  const sourceForDimensions = includeAllDimensions ? data : filteredData;
  const rowKeySet = new Set<string>();
  const colKeySet = new Set<string>();

  for (const item of sourceForDimensions) {
    rowKeySet.add(String(item[rowField] ?? '(Vide)'));
    if (colField) {
      colKeySet.add(String(item[colField] ?? '(Vide)'));
    }
  }

  const rowKeys = Array.from(rowKeySet).sort();
  const colKeys = colField ? Array.from(colKeySet).sort() : ['Total'];

  // 3. Accumulateurs pour chaque cellule [row][col]
  const buckets: Record<string, Record<string, number[]>> = {};

  for (const r of rowKeys) {
    buckets[r] = {};
    for (const c of colKeys) {
      buckets[r][c] = [];
    }
  }

  for (const item of filteredData) {
    const rKey = String(item[rowField] ?? '(Vide)');
    const cKey = colField ? String(item[colField] ?? '(Vide)') : 'Total';
    const rawVal = Number(item[valField]);
    const numVal = isNaN(rawVal) ? 0 : rawVal;

    if (buckets[rKey] && buckets[rKey][cKey]) {
      buckets[rKey][cKey].push(numVal);
    }
  }

  // 4. Fonction d'agrégation
  const aggregateValues = (vals: number[]): number => {
    if (vals.length === 0) return 0;
    switch (aggregation) {
      case 'SUM':
        return vals.reduce((a, b) => a + b, 0);
      case 'COUNT':
        return vals.length;
      case 'AVERAGE': {
        const sum = vals.reduce((a, b) => a + b, 0);
        return Math.round((sum / vals.length) * 100) / 100;
      }
      case 'MIN':
        return Math.min(...vals);
      case 'MAX':
        return Math.max(...vals);
      default:
        return vals.reduce((a, b) => a + b, 0);
    }
  };

  // 5. Calcul de la matrice
  const matrix: Record<string, Record<string, number>> = {};
  const rowTotals: Record<string, number> = {};
  const colTotals: Record<string, number> = {};

  for (const c of colKeys) {
    colTotals[c] = 0;
  }

  for (const r of rowKeys) {
    matrix[r] = {};
    const rowAllValues: number[] = [];

    for (const c of colKeys) {
      const cellVals = buckets[r][c] || [];
      const cellAgg = aggregateValues(cellVals);
      matrix[r][c] = cellAgg;
      rowAllValues.push(...cellVals);
    }

    rowTotals[r] = aggregateValues(rowAllValues);
  }

  // Totaux des colonnes
  for (const c of colKeys) {
    const colAllValues: number[] = [];
    for (const r of rowKeys) {
      const cellVals = buckets[r][c] || [];
      colAllValues.push(...cellVals);
    }
    colTotals[c] = aggregateValues(colAllValues);
  }

  // Grand Total
  const allValues = filteredData.map((d) => {
    const raw = Number(d[valField]);
    return isNaN(raw) ? 0 : raw;
  });
  const grandTotal = aggregateValues(allValues);

  return {
    rowKeys,
    colKeys,
    matrix,
    rowTotals,
    colTotals,
    grandTotal,
    filteredCount: filteredData.length,
    totalRecordsCount: data.length,
  };
}

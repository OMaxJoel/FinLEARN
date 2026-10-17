import { describe, it, expect } from 'vitest';
import { computePivotTable, PivotConfig } from '../src/core/excel/pivot';

describe('Laboratoire Excel Avancé - Moteur de Tableaux Croisés Dynamiques (TCD)', () => {
  const sampleSales = [
    { region: 'Abidjan Sud', product: 'Boissons', revenue: 10000000, channel: 'Grossistes' },
    { region: 'Abidjan Sud', product: 'Cosmétiques', revenue: 5000000, channel: 'Détail' },
    { region: 'Abidjan Nord', product: 'Boissons', revenue: 15000000, channel: 'Grossistes' },
    { region: 'San Pedro', product: 'Boissons', revenue: 8000000, channel: 'Grossistes' },
    { region: 'San Pedro', product: 'Cosmétiques', revenue: 4000000, channel: 'Détail' },
    { region: 'Bouaké', product: 'Boissons', revenue: 12000000, channel: 'Grossistes' },
  ];

  it('doit agréger correctement en somme 2D (Lignes = Région, Colonnes = Produit)', () => {
    const config: PivotConfig = {
      rowField: 'region',
      colField: 'product',
      valField: 'revenue',
      aggregation: 'SUM',
    };

    const pivot = computePivotTable(sampleSales, config);

    expect(pivot.rowKeys).toEqual(['Abidjan Nord', 'Abidjan Sud', 'Bouaké', 'San Pedro']);
    expect(pivot.colKeys).toEqual(['Boissons', 'Cosmétiques']);

    // Abidjan Sud : Boissons 10M, Cosmetiques 5M -> Total 15M
    expect(pivot.matrix['Abidjan Sud']['Boissons']).toBe(10000000);
    expect(pivot.matrix['Abidjan Sud']['Cosmétiques']).toBe(5000000);
    expect(pivot.rowTotals['Abidjan Sud']).toBe(15000000);

    // Abidjan Nord n'a pas de cosmétiques -> 0
    expect(pivot.matrix['Abidjan Nord']['Cosmétiques']).toBe(0);
    expect(pivot.rowTotals['Abidjan Nord']).toBe(15000000);

    // Totaux des colonnes
    // Boissons : 10M + 15M + 8M + 12M = 45M
    expect(pivot.colTotals['Boissons']).toBe(45000000);
    // Cosmétiques : 5M + 4M = 9M
    expect(pivot.colTotals['Cosmétiques']).toBe(9000000);

    // Grand Total : 45M + 9M = 54M
    expect(pivot.grandTotal).toBe(54000000);
    expect(pivot.totalRecordsCount).toBe(6);
    expect(pivot.filteredCount).toBe(6);
  });

  it('doit filtrer les données avec des segments (slicers)', () => {
    const config: PivotConfig = {
      rowField: 'region',
      colField: 'product',
      valField: 'revenue',
      aggregation: 'SUM',
      filters: {
        channel: ['Grossistes'], // Ne garder que les grossistes (exclut Cosmétiques au détail)
      },
      includeAllDimensions: true,
    };

    const pivot = computePivotTable(sampleSales, config);

    expect(pivot.filteredCount).toBe(4);
    expect(pivot.grandTotal).toBe(45000000);
    expect(pivot.colTotals['Cosmétiques']).toBe(0);
    expect(pivot.colTotals['Boissons']).toBe(45000000);
  });

  it('doit calculer les moyennes et effectifs (COUNT et AVERAGE)', () => {
    const configCount: PivotConfig = {
      rowField: 'region',
      valField: 'revenue',
      aggregation: 'COUNT',
    };
    const pivotCount = computePivotTable(sampleSales, configCount);
    expect(pivotCount.grandTotal).toBe(6);
    expect(pivotCount.rowTotals['Abidjan Sud']).toBe(2);

    const configAvg: PivotConfig = {
      rowField: 'product',
      valField: 'revenue',
      aggregation: 'AVERAGE',
    };
    const pivotAvg = computePivotTable(sampleSales, configAvg);
    // Boissons : 45 000 000 / 4 = 11 250 000
    expect(pivotAvg.rowTotals['Boissons']).toBe(11250000);
    // Cosmétiques : 9 000 000 / 2 = 4 500 000
    expect(pivotAvg.rowTotals['Cosmétiques']).toBe(4500000);
  });
});

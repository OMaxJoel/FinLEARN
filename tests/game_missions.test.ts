import { describe, it, expect } from 'vitest';
import { GAME_MISSIONS } from '../src/data/gameMissionsData';

describe('Vérification d\'Intégrité des Serious Games Financiers (GAME_MISSIONS)', () => {
  it('doit contenir au moins 12 missions professionnelles complètes (couverture 360°)', () => {
    expect(GAME_MISSIONS.length).toBeGreaterThanOrEqual(12);
  });

  it('doit vérifier que les Missions 10, 11 et 12 sont conformes et complètes', () => {
    const mission10 = GAME_MISSIONS.find((m) => m.id === 'MISSION_10');
    expect(mission10).toBeDefined();
    expect(mission10?.title).toBe('Le Sauvetage de Trésorerie à 13 Semaines');
    expect(mission10?.steps.length).toBeGreaterThanOrEqual(2);

    const mission11 = GAME_MISSIONS.find((m) => m.id === 'MISSION_11');
    expect(mission11).toBeDefined();
    expect(mission11?.title).toBe('Le Contrôle Fiscal & TVA SYSCOHADA');
    expect(mission11?.steps.length).toBeGreaterThanOrEqual(2);

    const mission12 = GAME_MISSIONS.find((m) => m.id === 'MISSION_12');
    expect(mission12).toBeDefined();
    expect(mission12?.title).toBe('Le Tour de Table & Rachat d\'Entreprise (M&A)');
    expect(mission12?.steps.length).toBeGreaterThanOrEqual(2);
  });

  it('doit vérifier que la Mission 9 (Consolidation du Groupe Régional) est conforme et complète', () => {
    const mission9 = GAME_MISSIONS.find((m) => m.id === 'MISSION_09');
    expect(mission9).toBeDefined();
    expect(mission9?.title).toBe('La Consolidation du Groupe Régional');
    expect(mission9?.difficulty).toBe('Expert');
    expect(mission9?.documents.length).toBeGreaterThanOrEqual(2);
    expect(mission9?.steps.length).toBe(3);

    // Vérifier chaque étape de la mission 9
    mission9?.steps.forEach((step) => {
      expect(step.options.length).toBeGreaterThanOrEqual(2);
      expect(step.documentIdsToInspect.length).toBeGreaterThan(0);
      const optimalCount = step.options.filter((o) => o.isOptimal).length;
      expect(optimalCount).toBe(1);
    });
  });

  it('doit garantir que chaque mission possède des documents valides et un débriefing rigoureux', () => {
    GAME_MISSIONS.forEach((m) => {
      expect(m.id).toBeDefined();
      expect(m.title).toBeTruthy();
      expect(m.briefing.objectives.length).toBeGreaterThan(0);
      expect(m.documents.length).toBeGreaterThan(0);
      expect(m.steps.length).toBeGreaterThanOrEqual(2);
      expect(m.debriefing.goldStandard).toBeTruthy();
      expect(m.debriefing.commonPitfalls.length).toBeGreaterThan(0);
      expect(m.debriefing.keyTakeaway).toBeTruthy();

      // Vérifier la conformité des documents
      m.documents.forEach((doc) => {
        expect(['invoice', 'bank_statement', 'contract', 'trial_balance', 'email', 'spreadsheet']).toContain(doc.type);
        expect(doc.content.length).toBeGreaterThan(20);
      });
    });
  });
});

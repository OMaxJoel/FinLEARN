import { describe, it, expect } from 'vitest';
import { askTutor, KNOWLEDGE_BASE } from '../src/core/ai/tutor';

describe('Tuteur Pédagogique IA avec Garde-fous Déterministes (US-701)', () => {
  it('doit refuser les requêtes hors sujet et réorienter l\'apprenant vers le périmètre financier', () => {
    const response = askTutor('Donne-moi une recette de cuisine pour le dîner');
    expect(response.confidenceScore).toBeLessThan(0.5);
    expect(response.socraticGuidance).toContain('Tuteur Spécialisé en Gestion Financière');
    expect(response.matchedConcept).toBeUndefined();
  });

  it('doit détecter la confusion classique entre Résultat Net et Trésorerie Nette', () => {
    const response = askTutor(
      'Mon entreprise fait 50 millions de bénéfice net mais mon compte bancaire est à découvert, pourquoi ?'
    );
    expect(response.matchedConcept).toBe(KNOWLEDGE_BASE.cash_vs_profit.name);
    expect(response.identifiedMisconception).toContain('Confondre une entreprise très rentable');
    expect(response.formula).toContain('Trésorerie Nette =');
    expect(response.socraticGuidance).toContain('décalage temporel');
    expect(response.confidenceScore).toBeGreaterThanOrEqual(0.9);
  });

  it('doit guider l\'apprenant sur la relation entre FRNG, BFR et Trésorerie', () => {
    const response = askTutor('Comment calculer le BFR et le fonds de roulement dans le bilan fonctionnel ?');
    expect(response.matchedConcept).toBe(KNOWLEDGE_BASE.frng_vs_bfr.name);
    expect(response.standardReference).toContain('SYSCOHADA');
    expect(response.formula).toContain('Trésorerie Nette = FRNG - BFR');
    expect(response.socraticGuidance).toContain('BESOIN de financement');
  });

  it('doit alerter sur l\'arbitrage VAN vs TRI et proposer le calcul du taux de Fisher', () => {
    const response = askTutor('Est-ce que je dois toujours retenir le projet avec le plus fort TRI ?');
    expect(response.matchedConcept).toBe(KNOWLEDGE_BASE.npv_vs_irr.name);
    expect(response.socraticGuidance).toContain('Fisher');
    expect(response.suggestedAction).toContain('Fisher');
  });

  it('doit rappeler l\'interdiction stricte de l\'Article 13 CIMA concernant les primes reçues', () => {
    const response = askTutor(
      'Puis-je utiliser les primes d\'assurance encaissées pour payer les salaires de mon cabinet de courtage ?'
    );
    expect(response.matchedConcept).toBe(KNOWLEDGE_BASE.cima_art13.name);
    expect(response.standardReference).toContain('Article 13');
    expect(response.socraticGuidance).toContain('faute lourde pénalement réprimée');
    expect(response.suggestedAction).toContain('467');
  });

  it('doit expliquer la réserve de conversion IAS 21 et le traitement des intérêts minoritaires', () => {
    const response = askTutor('Pourquoi a-t-on un écart de conversion en consolidant la filiale de Paris ?');
    expect(response.matchedConcept).toBe(KNOWLEDGE_BASE.consolidation_translation.name);
    expect(response.standardReference).toContain('IAS 21');
    expect(response.socraticGuidance).toContain('Autres Éléments du Résultat Global');
  });
});

# FINLEARN IMMERSION 2026

> **Plateforme professionnelle, moderne et immersive de formation financière, comptable et gamifiée.**  
> **Contextes d'application :** Côte d'Ivoire (SYSCOHADA Révisé / UEMOA / Code CIMA), Entreprise Générale, Courtage International en Assurance.

---

## 1. Présentation Générale

**FINLEARN IMMERSION** est un produit d'ingénierie logicielle et pédagogique réunissant :
- **Un centre d'apprentissage structuré :** Parcours complets allant des fondations comptables jusqu'à l'analyse financière avancée et la finance de courtage.
- **Un laboratoire de calcul déterministe :** Journal comptable SYSCOHADA interactif avec mise à jour en temps réel du Grand Livre, de la Balance à 6 colonnes et des États Financiers (Bilan et Compte de Résultat).
- **Un Laboratoire Excel intégré :** Grille de tableur interactive avec évaluation de formules (`SOMME`, `MOYENNE`, `SI`, `RECHERCHEX`, `SIERREUR`), gestion des références absolues (`$A$1`) et auditeur de classeurs repérant le hardcoding.
- **Des Simulateurs Métier spécialisés :**
  - Rapprochement bancaire déterministe.
  - Seuil de rentabilité (Break-even), marge de sécurité et date du point mort en jours.
  - Courtage en assurance : calcul des primes nettes, taxes d'assurance (14.5% CI), commissions par branche, conformité Code CIMA Article 13 et rapprochement de bordereaux.
- **Des Serious Games & Missions d'Investigation :** Mises en situation réalistes dans des entreprises ivoiriennes fictives avec bureau virtuel, pièces justificatives à inspecter, dialogues de parties prenantes et débriefing professionnel.

---

## 2. Prérequis & Environnement Requis

- **Système d'exploitation :** Windows 10/11, macOS ou Linux.
- **Node.js :** Version 20.x ou supérieure (testé et validé sous Node.js v22.23.1).
- **npm :** Version 10.x ou supérieure (testé sous npm 10.9.8).

---

## 3. Installation et Démarrage Rapide

### 3.1 Installation des Dépendances
Dans le répertoire racine du projet :
```bash
npm install
```

### 3.2 Lancement du Serveur de Développement
Pour lancer l'application en mode interactif avec rechargement à chaud (HMR) :
```bash
npm run dev
```
L'application est immédiatement accessible à l'adresse locale :  
👉 **`http://localhost:3000`**

### 3.3 Exécution des Tests Automatisés
Pour exécuter la suite de tests unitaires et de conformité financière déterministe :
```bash
npm test
```
*Résultats : 18 tests exécutés avec succès à 100% sur les moteurs comptables, Excel, finance et assurance.*

### 3.4 Compilation pour la Production
Pour compiler et vérifier l'assemblage complet TypeScript / Vite :
```bash
npm run build
```
Les fichiers statiques optimisés sont générés dans le dossier `dist/`.

---

## 4. Documentation Stratégique et Référentiels (`docs/`)

Le dossier `docs/` regroupe les 10 livrables de cadrage et d'ingénierie logicielle :
1. [`docs/01-vision-produit.md`](docs/01-vision-produit.md) : Vision stratégique, personas et principes d'excellence.
2. [`docs/02-matrice-tracabilite.md`](docs/02-matrice-tracabilite.md) : Matrice de traçabilité intégrale liant les 9 compétences, 35 sous-compétences, cours, simulateurs, jeux et tests.
3. [`docs/03-backlog.md`](docs/03-backlog.md) : Backlog produit exhaustif avec Epics, User Stories et priorisation MoSCoW.
4. [`docs/04-personas-et-parcours.md`](docs/04-personas-et-parcours.md) : Fiches personas approfondies, diagnostic adaptatif et plan 24 semaines.
5. [`docs/05-architecture.md`](docs/05-architecture.md) : Spécifications techniques du monolithe modulaire, schéma ERD et contrats d'API.
6. [`docs/06-design-system.md`](docs/06-design-system.md) : Charte graphique, palette chromatique, typographie et conformité WCAG 2.2 AA.
7. [`docs/07-strategie-tests.md`](docs/07-strategie-tests.md) : Pyramide des tests, jeux de référence étalons et cas limites.
8. [`docs/08-risques-et-decisions.md`](docs/08-risques-et-decisions.md) : 5 ADR fondamentaux et matrice de maîtrise des risques.
9. [`docs/09-roadmap.md`](docs/09-roadmap.md) : Feuille de route opérationnelle par lots verticaux (Lots 1 à 6).
10. [`docs/10-registre-des-livraisons.md`](docs/10-registre-des-livraisons.md) : Journal d'audit et registre de traçabilité des livraisons réelles.

---

## 5. Structure du Code Source

```text
├── docs/                        # Les 10 livrables de documentation DSI
├── src/
│   ├── core/                    # Moteurs de calcul déterministes purs
│   │   ├── accounting/          # Moteur SYSCOHADA, Grand Livre, Balance, Rapprochement
│   │   ├── excel/               # Lexer, Parser AST, Évaluateur et Auditeur de formules
│   │   ├── finance/             # Analyse financière, Ratios, VAN, TRI (Newton-Raphson), Seuil
│   │   └── insurance/           # Courtage CIMA, Commissions, Rétention, Bordereaux
│   ├── types/                   # Définitions TypeScript strictes (MCD & interfaces)
│   ├── data/                    # Datasets PME ivoirienne, 12 QCM diagnostic, cours, missions
│   ├── components/
│   │   ├── common/              # Header, navigation, indicateur XP, sélecteur de persona
│   │   ├── dashboard/           # Tableau de bord apprenant et carte des 9 compétences
│   │   ├── courses/             # Lecteur de cours interactif avec exercices immédiats
│   │   ├── simulators/          # Simulateurs comptables, Excel Lab, Seuil de rentabilité, CIMA
│   │   ├── game/                # Moteur de Serious Game, bureau virtuel et débriefing
│   │   ├── diagnostic/          # Modalité de diagnostic adaptatif en 12 questions
│   │   └── portfolio/           # Espace portfolio et export d'attestation
│   ├── App.tsx                  # Orchestrateur d'état global et persistance locale
│   ├── main.tsx                 # Point d'entrée React 18
│   └── index.css                # Configuration Tailwind CSS et styles métier
├── tests/                       # Suites de tests automatisés Vitest
├── package.json                 # Dépendances et scripts de build
├── vite.config.ts               # Configuration bundler Vite
└── tsconfig.json                # Configuration du compilateur TypeScript
```

---

## 6. Comptes et Personas de Démonstration Immédiate

Un sélecteur situé dans la barre supérieure de l'application permet de tester instantanément l'expérience selon 4 profils types pré-configurés :
1. **Koffi Kouamé (Débutant - Abidjan) :** Démarre le parcours SYSCOHADA, s'initie au débit/crédit et passe le diagnostic.
2. **Aminata Traoré (Comptable junior) :** Perfectionne ses compétences en analyse financière et BFR.
3. **Fatou Diop (Gestionnaire courtage en assurance) :** Maîtrise le calcul de commissions, le Code CIMA et les renouvellements.
4. **Dr. Souleymane Touré (Formateur) :** Profil expert disposant de l'ensemble des modules et missions débloqués.

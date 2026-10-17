# 08 — Registre des Risques et Décisions d'Architecture (ADR)

**Version :** 1.0.0 — Date : 17 Octobre 2026  
**Équipe responsable :** DSI Virtuelle, Architecte Principal & Responsable Produit

---

## 1. Registre des Décisions d'Architecture (Architecture Decision Records - ADR)

### ADR-001 : Choix d'un Monolithe Modulaire Fullstack TypeScript (React + Node.js)
- **Contexte :** Le projet requiert à la fois une interface réactive riche (tableur, simulateurs interactifs, canvas de jeu 2D/3D) et des calculs financiers déterministes partagés entre client et serveur.
- **Décision :** Adopter une architecture en Monolithe Modulaire en TypeScript (React 18/19 avec Vite côté frontend, et modules de calcul stricts réutilisables).
- **Justification :**
  - Partage de code et de types stricts entre moteurs de calcul, interfaces et tests.
  - Vitesse de build et temps de cycle réduits à néant (HMR instantané sous Vite).
  - Évite la surcharge d'infrastructure et la latence réseau inter-services inhérentes aux microservices prématurés.
  - Parfaite compatibilité avec l'environnement d'exécution Windows et Node 22 disponible.
- **Conséquences :** Nécessité d'une stricte discipline d'isolation des dossiers de code (`core/`, `components/`, `services/`, `data/`) pour interdire les dépendances croisées non autorisées.

---

### ADR-002 : Traitement Arithmétique Déterministe en Nombres Entiers (Centimes de FCFA)
- **Contexte :** La norme IEEE 754 des nombres à virgule flottante (`float`/`double`) génère des imprécisions inacceptables pour la finance (ex: `0.1 + 0.2 !== 0.3`).
- **Décision :** Tous les montants monétaires transitent et sont stockés sous forme de nombres entiers représentant des centimes de FCFA ou des francs CFA entiers stricts. Les calculs de division (ex: ratios, taux de marge) sont arrondis selon la règle de l'arrondi bancaire (*half to even*) à une précision déclarée.
- **Justification :** Élimination totale des déséquilibres fantômes dans les balances comptables et rapprochements de courtage.
- **Conséquences :** Les composants d'affichage formattent les nombres à la volée avec le séparateur de milliers et la devise XOF (`100 000 000 FCFA`).

---

### ADR-003 : Moteur Tableur Web Natif Découplé avec Matrice de Compatibilité
- **Contexte :** Reproduire l'intégralité de Microsoft Excel dans un navigateur est une promesse intenable et contre-productive. Les apprenants ont toutefois besoin d'écrire de vraies formules et d'obtenir des erreurs réalistes.
- **Décision :** Implémenter un moteur tableur web natif (`ExcelEngine`) avec un analyseur lexical (Lexer), syntaxique (Parser AST) et évaluateur prenant en charge les fonctions indispensables : `SOMME`, `MOYENNE`, `MIN`, `MAX`, `SI`, `ET`, `OU`, `SIERREUR`, `SOMME.SI.ENS`, `RECHERCHEX`, `INDEX/EQUIV`. Une matrice de compatibilité explicite est publiée dans l'application. Pour les cas très complexes, un mode import/export de classeur XLSX est prévu.
- **Justification :** Évite de prétendre à une compatibilité 100% tout en assurant une pédagogie réelle sur les formules clés.
- **Conséquences :** L'évaluateur accepte plusieurs syntaxes équivalentes (ex: `SOMME(A1:A5)` ou `A1+A2+A3+A4+A5`) tout en valorisant la formule la plus élégante dans le score de modélisation.

---

### ADR-004 : Hybridation Visuelle — Canvas 2D Interactif Prioritaire & 3D Déportée
- **Contexte :** Les contraintes d'infrastructure en Afrique de l'Ouest (connexions mobiles variables, appareils d'entrée et milieu de gamme) rendent prohibitive l'utilisation d'un moteur 3D lourd sur chaque écran.
- **Décision :** Les missions de jeu et simulateurs s'appuient en priorité sur des environnements 2D isométriques soignés, des canvas vectoriels HTML5/SVG ultra-légers et des interfaces de bureau immersives. Les modules 3D légers (Three.js) sont réservés aux scènes où la spatialisation apporte un bénéfice pédagogique avéré et sont chargés dynamiquement (*code-splitting*).
- **Justification :** Temps de chargement initial inférieur à 2 secondes, zéro dépendance à un GPU puissant.
- **Conséquences :** Une alternative 2D complète est systématiquement offerte pour chaque activité 3D.

---

### ADR-005 : Encadrement et Garde-Fous de l'Assistant Pédagogique IA
- **Contexte :** Les modèles de langage peuvent halluciner des taux fiscaux, inventer des articles du code CIMA ou générer des erreurs de calcul élémentaires.
- **Décision :** L'assistant IA n'a aucun pouvoir décisionnel sur les calculs numériques. Tous les chiffres affichés proviennent des moteurs déterministes. L'IA intervient uniquement pour expliquer les notions, contextualiser une erreur, reformuler une consigne ou guider un raisonnement à l'aide d'indices gradués.
- **Justification :** Préservation absolue de la confiance de l'apprenant et des formateurs.
- **Conséquences :** Tout texte généré par IA est identifié par un badge distinctif et reste débrayable par l'administrateur.

---

## 2. Matrice d'Analyse et de Maîtrise des Risques

| Réf | Description du Risque | Gravité | Probabilité | Mesure d'Atténuation et Dispositif de Maîtrise | Responsable |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **R-01** | **Formules financières erronées :** Apprentissage de concepts faussés par un bug arithmétique. | **Critique** | Faible | Moteurs de calcul déterministes purs, validation par une suite de tests unitaires étalons certifiés, revue experte. | Lead Finance & QA |
| **R-02** | **Obsolescence réglementaire (OHADA / Fiscalité CI / CIMA) :** Changement de taux de taxe ou de dispositions légales. | **Majeure** | Moyenne | Horodatage obligatoire de toute mention réglementaire, citation de la source officielle, répertoire de révision annuelle. | Expert Réglementaire |
| **R-03** | **Fuite de données ou utilisation de marques réelles :** Confusion avec des entités existantes (ex: WTW). | **Critique** | Très Faible | Utilisation exclusive de sociétés fictives déclarées (*Ivoire Courtage Conseil*), mentions d'avertissement claires. | Direction Juridique |
| **R-04** | **Lourdeur ou instabilité sur mobiles / connexions faibles :** Échec d'accès aux leçons et simulateurs. | **Majeure** | Moyenne | Architecture éco-conçue, bundle initial < 250 Ko, Canvas 2D réactif, mise en cache locale des cours et de la progression. | Lead Frontend |
| **R-05** | **Frustration face à une formule Excel alternative rejetée :** Sentiment d'injustice pédagogique. | **Moyenne** | Moyenne | Moteur d'évaluation tolérant validant le résultat numérique produit et acceptant plusieurs variantes de formules valides. | Lead Excel Lab |
| **R-06** | **Décrochage pédagogique lors des paliers de difficulté :** Taux d'abandon élevé sur les cas complexes. | **Moyenne** | Moyenne | Système d'indices progressifs (3 niveaux d'aide), mode entraînement sans pénalité de score, remédiation ciblée. | Équipe Pédagogique |

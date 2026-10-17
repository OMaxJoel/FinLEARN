# Cahier des charges fonctionnel et technique

## Plateforme immersive de montée en compétences en comptabilité, analyse financière, Excel, contrôle de gestion et finance d'entreprise

### Contextes : Côte d'Ivoire, entreprise générale et courtage en assurance de type international

**Version :** 1.0 --- **Date :** 17 octobre 2026\
**Statut :** spécification de référence destinée à une équipe produit,
une équipe technique ou une IA de développement.

------------------------------------------------------------------------

# 1. Résumé exécutif

Le projet consiste à concevoir une application web de formation
professionnelle qui accompagne un apprenant depuis les fondamentaux de
la comptabilité jusqu'à une maîtrise opérationnelle de l'analyse
financière, d'Excel avancé, du contrôle de gestion et de la finance
d'entreprise. L'application doit aller au-delà d'un catalogue de cours :
elle doit être un **environnement d'apprentissage actif**, dans lequel
l'utilisateur étudie une notion, manipule des données, réalise des
exercices, utilise des simulateurs, reçoit une correction immédiate et
comprend ses erreurs.

La plateforme doit proposer plusieurs contextes d'apprentissage : -
**Parcours fondamental** : concepts, méthodes et progression
pédagogique. - **Contexte Côte d'Ivoire / UEMOA / OHADA** : exemples et
jeux de données localisés, avec références réglementaires vérifiables et
dates de validité. - **Contexte entreprise** : budgets, trésorerie,
coûts, reporting, tableaux de bord et décisions de gestion. - **Contexte
courtage en assurance** : portefeuille de clients, primes, commissions,
renouvellements, sinistres, rentabilité par client/contrat/branche,
suivi des encaissements et indicateurs de service. - **Contexte
entreprise internationale** : reporting de groupe, multi-entités,
devises, consolidation pédagogique, normes et pratiques internationales,
sans prétendre remplacer un expert-comptable ou un conseil
réglementaire.

Une entreprise de courtage telle que Willis Towers Watson (WTW) sert
uniquement de **référence sectorielle illustrative**. La plateforme ne
doit pas se présenter comme un produit officiel de WTW, ni reproduire
ses données, ses documents internes, ses marques ou ses processus
confidentiels. Les données fournies doivent être fictives, anonymisées
ou autorisées.

## 1.1 Principes directeurs

1.  Apprendre en faisant : au moins une activité pratique par notion
    majeure.
2.  Feedback immédiat : résultat, méthode attendue, explication et piste
    de remédiation.
3.  Progression mesurable : diagnostic initial, objectifs, compétences,
    évaluations et preuves de maîtrise.
4.  Contexte réaliste : jeux de données cohérents, scénarios métier et
    décisions à prendre.
5.  Transparence des calculs : toute simulation expose ses hypothèses,
    formules et limites.
6.  Adaptation au niveau : débutant, intermédiaire, avancé et
    professionnel.
7.  Traçabilité pédagogique : historique des tentatives, résultats et
    compétences acquises.
8.  Localisation : français par défaut, FCFA/XOF par défaut, formats et
    référentiels paramétrables.
9.  Sécurité et confidentialité : données fictives par défaut, contrôle
    d'accès et minimisation des données personnelles.
10. Accessibilité et performance : interface responsive, utilisable sur
    ordinateur, tablette et mobile.

# 2. Objectifs et indicateurs de réussite

## 2.1 Objectifs métier

-   Former progressivement à la lecture et à l'analyse des états
    financiers.
-   Apprendre à construire, vérifier et interpréter des modèles Excel.
-   Développer des compétences en contrôle budgétaire, coûts, marges,
    prévisions et écarts.
-   Comprendre les décisions de finance d'entreprise : investissement,
    financement, trésorerie et rentabilité.
-   Appliquer ces compétences à des situations proches des entreprises
    ivoiriennes et des courtiers en assurance.
-   Fournir à l'apprenant un portfolio de travaux démontrant sa
    progression.

## 2.2 Indicateurs produit

-   Taux de complétion des parcours et des modules.
-   Progression par compétence, et non seulement par temps passé.
-   Taux de réussite au premier essai et après remédiation.
-   Nombre d'exercices pratiques réalisés et validés.
-   Réduction des erreurs récurrentes (formules, signes, unités,
    interprétation).
-   Résultats aux évaluations de fin de parcours.
-   Satisfaction apprenant et taux de retour hebdomadaire.
-   Temps de chargement et taux d'erreur technique.
-   Pour les simulateurs : cohérence entre le résultat du moteur de
    calcul et les résultats de référence automatisés.

Les objectifs chiffrés de lancement doivent être fixés après le pilote.
À titre de cible initiale : 80 % de réussite à l'évaluation finale d'un
parcours, 95 % de disponibilité mensuelle hors maintenance planifiée et
feedback d'exercice en moins de deux secondes pour les opérations
courantes.

# 3. Publics cibles et rôles

## 3.1 Profils apprenants

-   Débutant sans formation financière.
-   Étudiant ou jeune diplômé.
-   Comptable souhaitant évoluer vers l'analyse financière.
-   Analyste financier junior.
-   Contrôleur de gestion junior.
-   Gestionnaire financier / trésorier.
-   Collaborateur d'un courtier en assurance.
-   Manager ayant besoin de comprendre les indicateurs financiers.
-   Professionnel préparant un entretien, une mobilité ou une
    certification.

## 3.2 Rôles applicatifs

-   **Visiteur** : consulte la présentation et les parcours publics.
-   **Apprenant** : suit les cours, utilise les simulateurs et consulte
    ses résultats.
-   **Tuteur / formateur** : suit une cohorte, commente les travaux et
    assigne des activités.
-   **Auteur pédagogique** : crée et révise les cours, cas, quiz et
    corrigés.
-   **Administrateur métier** : gère les référentiels, parcours,
    contextes et cohortes.
-   **Administrateur technique** : gère utilisateurs, rôles, paramètres,
    intégrations et supervision.
-   **Auditeur pédagogique** : consulte les versions des contenus et les
    résultats autorisés sans les modifier.

Les permissions doivent appliquer le principe du moindre privilège. Un
utilisateur ne doit accéder qu'aux cohortes, résultats et données qui
lui sont autorisés.

# 4. Périmètre fonctionnel

La plateforme comprend les domaines suivants : 1. Portail d'accueil et
orientation. 2. Diagnostic de niveau et plan d'apprentissage
personnalisé. 3. Catalogue des parcours, cours et ressources. 4.
Exercices guidés avec correction automatique. 5. Laboratoire Excel
intégré. 6. Simulateurs financiers et de gestion. 7. Simulateurs visuels
et scénarios interactifs, dont vues 3D lorsqu'elles apportent une réelle
valeur pédagogique. 8. Cas pratiques complets et projets de synthèse. 9.
Évaluations, examens blancs et certifications internes. 10. Tableau de
bord de progression et portfolio. 11. Espace formateur et gestion de
cohortes. 12. Studio de création de contenu. 13. Bibliothèque de jeux de
données. 14. Référentiel ivoirien, OHADA/UEMOA et référentiel
international, avec date et source. 15. Administration, sécurité,
journalisation et supervision.

# 5. Architecture pédagogique et parcours

## 5.1 Niveaux de progression

-   **Niveau 0 --- Diagnostic** : connaissances, objectifs,
    disponibilité hebdomadaire et expérience.
-   **Niveau 1 --- Fondations** : vocabulaire, logique comptable, états
    financiers, calculs de base et Excel essentiel.
-   **Niveau 2 --- Opérationnel** : analyse des états financiers,
    formules Excel, budgets et tableaux de bord.
-   **Niveau 3 --- Autonome** : modèles financiers, analyse d'écarts,
    prévisions, trésorerie et cas métier.
-   **Niveau 4 --- Avancé** : scénarios complexes, analyse de
    sensibilité, modélisation, reporting multi-entités et arbitrages.
-   **Niveau 5 --- Professionnel** : cas intégrés, livrables
    présentables, soutenance simulée et portfolio.

Le passage au niveau suivant doit dépendre de seuils de compétence
configurables, avec possibilité de recommander une révision plutôt que
de bloquer définitivement l'utilisateur.

## 5.2 Parcours recommandés

### Parcours A --- Comptabilité générale et états financiers

1.  Équation comptable et partie double.
2.  Journal, grand livre, balance et écritures d'inventaire.
3.  Comptes de résultat et bilan.
4.  Flux de trésorerie et annexes.
5.  Rapprochements, provisions, amortissements et régularisations.
6.  Lecture d'une balance et détection d'anomalies.
7.  Cas de clôture mensuelle et annuelle.

### Parcours B --- Analyse financière

1.  Lecture des états financiers.
2.  Retraitements et comparabilité.
3.  Analyse horizontale et verticale.
4.  Soldes et indicateurs pertinents selon le référentiel utilisé.
5.  Ratios de liquidité, solvabilité, rentabilité et activité.
6.  Besoin en fonds de roulement et cycle d'exploitation.
7.  Qualité des résultats, endettement et capacité de remboursement.
8.  Diagnostic, risques et recommandations à la direction.
9.  Rédaction d'une note d'analyse financière.

### Parcours C --- Excel du niveau débutant à expert

1.  Interface, références relatives/absolues, formats et bonnes
    pratiques.
2.  SOMME, MOYENNE, SI, SI.CONDITIONS, ET, OU, SIERREUR.
3.  SOMME.SI.ENS, NB.SI.ENS, RECHERCHEX et INDEX/EQUIV.
4.  Dates, texte, nettoyage et validation des données.
5.  Tableaux structurés, tri, filtres et mise en forme conditionnelle.
6.  Tableaux croisés dynamiques, segments et graphiques.
7.  Formules dynamiques selon la version disponible.
8.  Importation et transformation avec Power Query.
9.  Modèle de données et relations ; Power Pivot/DAX en module avancé.
10. Prévisions, contrôles, scénarios et tableaux de bord.
11. Audit de formules, contrôles de cohérence et documentation.
12. Automatisation : macros/VBA en option, avec avertissements de
    sécurité.
13. Cas final : construire un reporting financier réutilisable à partir
    de données brutes.

La plateforme doit distinguer les fonctions selon la langue et la
version d'Excel. Elle ne doit pas supposer que tous les apprenants
disposent de Microsoft Excel ou de fonctions récentes. Des équivalents
et fichiers téléchargeables doivent être proposés lorsque possible.

### Parcours D --- Contrôle de gestion

1.  Rôle du contrôle de gestion et chaîne de valeur.
2.  Charges fixes/variables, directes/indirectes.
3.  Coûts complets, coûts variables et seuil de rentabilité.
4.  Budgets opérationnels et budget de trésorerie.
5.  Budget flexible et analyse des écarts.
6.  Coût standard, volume, prix et efficacité.
7.  Indicateurs de performance et tableaux de bord.
8.  Prévisions glissantes et analyse de scénarios.
9.  Dialogue de gestion et recommandations.
10. Cas de clôture budgétaire mensuelle.

### Parcours E --- Finance d'entreprise

1.  Valeur temps de l'argent et actualisation.
2.  Intérêts, annuités et échéanciers d'emprunt.
3.  Coût du capital et notions de risque.
4.  VAN, TRI, délai de récupération et limites de ces indicateurs.
5.  Choix d'investissement et comparaison de scénarios.
6.  Structure de financement et levier financier.
7.  Gestion de trésorerie et besoin de financement.
8.  Prévisions de flux de trésorerie.
9.  Évaluation d'entreprise : notions et hypothèses.
10. Sensibilité, stress tests et note de décision.

### Parcours F --- Finance appliquée au courtage en assurance

1.  Modèle économique d'un courtier : clients, assureurs, contrats,
    primes, commissions et services.
2.  Différence entre prime, commission, honoraires, taxes, encaissement
    et revenu comptabilisé selon les règles applicables.
3.  Gestion d'un portefeuille de contrats et des échéances.
4.  Renouvellements, attrition, nouveaux clients et croissance
    organique.
5.  Calcul des commissions contractuelles et rapprochement avec les
    relevés des assureurs.
6.  Suivi des primes dues, encaissées, reversées et des créances, selon
    le rôle contractuel du courtier.
7.  Rentabilité par client, branche, secteur, équipe et contrat.
8.  Coût de service, temps passé, frais de gestion et marge
    contributive.
9.  Analyse des sinistres à partir de données autorisées et distinction
    entre indicateurs du courtier et ceux de l'assureur.
10. Prévision des commissions et trésorerie.
11. Renouvellement, pipeline commercial et conversion.
12. Indicateurs de qualité de service, délais et fidélisation.
13. Reporting de portefeuille et revue de performance.
14. Cas final : analyser un portefeuille fictif et présenter des
    recommandations.

La plateforme doit signaler que les conventions de commission, les
obligations de collecte ou de reversement, les traitements comptables et
les obligations réglementaires varient selon les contrats et la
juridiction. Aucun calcul ne doit être présenté comme une règle
universelle sans préciser ses hypothèses.

### Parcours G --- Contexte Côte d'Ivoire / OHADA / UEMOA

-   Devise XOF/FCFA, formats de dates et conventions locales.
-   États financiers et notions du référentiel comptable
    OHADA/SYSCOHADA.
-   Lecture pédagogique des textes et documents publics pertinents.
-   Notions de fiscalité et de taxes uniquement dans des modules datés,
    sourcés et revus par un spécialiste.
-   Notions de financement bancaire, trésorerie et pratiques
    d'entreprise locales.
-   Contextualisation du secteur de l'assurance et du courtage dans le
    cadre réglementaire applicable, y compris les textes CIMA lorsque
    pertinents.
-   Scénarios d'entreprises fictives ivoiriennes : PME commerciale,
    entreprise de services, société industrielle et courtier.
-   Exercices de conversion de devises et de reporting régional.
-   Comparaison pédagogique entre référentiels locaux et IFRS, sans
    laisser croire qu'ils sont interchangeables.

Tout contenu juridique, fiscal, comptable ou réglementaire doit indiquer
la juridiction, la date de dernière vérification, les sources
officielles, le niveau de confiance et le nom ou rôle du réviseur. En
cas de doute, afficher « à faire valider par un professionnel habilité
».

### Parcours H --- Reporting international et multi-entités

-   Reporting en plusieurs devises.
-   Comparaison des performances entre entités.
-   Principes de consolidation pédagogique.
-   Définitions cohérentes des KPI.
-   Conversion et effets de change.
-   Reporting de gestion vs états financiers statutaires.
-   Présentation de synthèses exécutives.
-   Introduction aux IFRS et à la modélisation financière, selon les
    besoins.

# 6. Structure obligatoire d'une leçon

Chaque leçon doit pouvoir contenir : 1. Titre, objectifs mesurables et
prérequis. 2. Durée estimée et niveau. 3. Explication progressive avec
exemples. 4. Définitions des termes et glossaire contextuel. 5. Exemple
résolu étape par étape. 6. Erreurs fréquentes et moyens de les repérer.
7. Activité interactive. 8. Exercice pratique avec données manipulables.
9. Correction immédiate ou différée selon le type d'exercice. 10.
Explication de la méthode attendue et des autres méthodes acceptables.
11. Mini-quiz de compréhension. 12. Résumé, fiche mémo et ressources.
13. Critères de réussite et compétences validées. 14. Lien vers la leçon
de remédiation si nécessaire.

Les contenus doivent être versionnés. Une modification majeure d'une
leçon ou d'un corrigé ne doit pas altérer rétroactivement les résultats
historiques.

# 7. Moteur d'exercices et feedback immédiat

## 7.1 Types d'exercices

-   QCM et questions à réponses multiples.
-   Vrai/faux avec justification.
-   Réponse numérique avec tolérance et unités.
-   Glisser-déposer d'étapes ou de comptes.
-   Classement de postes et catégories.
-   Compléter une formule Excel.
-   Corriger une formule ou un modèle erroné.
-   Construire un tableau à partir de données.
-   Interpréter un ratio et justifier sa conclusion.
-   Repérer des anomalies dans un jeu de données.
-   Étude de cas avec plusieurs livrables.
-   Simulation décisionnelle avec effets visibles sur les KPI.
-   Questions ouvertes évaluées par grille et, éventuellement, par IA
    avec possibilité de revue humaine.

## 7.2 Règles de correction

Pour chaque exercice, définir : - réponse ou plage de réponses
acceptables ; - méthode ou formule de référence ; - tolérance d'arrondi
; - unité et convention de signe ; - dépendances et hypothèses ; -
erreurs critiques ; - explication du résultat ; - indice gradué avant
d'afficher la solution ; - compétences mesurées ; - niveau de
difficulté.

Le moteur ne doit pas seulement dire « faux ». Il doit indiquer, par
exemple, si l'erreur vient d'une plage de cellules incorrecte, d'un
signe inversé, d'une unité incohérente, d'un ratio mal interprété ou
d'une hypothèse non déclarée.

## 7.3 Fiabilité

-   Les calculs de référence doivent être réalisés par un moteur
    déterministe et testés.
-   L'IA peut expliquer ou contextualiser, mais ne doit pas être
    l'unique arbitre des résultats numériques.
-   Les calculs critiques doivent être vérifiés côté serveur.
-   Les réponses et résultats générés par IA doivent être identifiés
    comme tels et rester révisables.
-   Prévoir des tests unitaires et des jeux de référence pour chaque
    simulateur.

# 8. Laboratoire Excel intégré

## 8.1 Expérience utilisateur

L'apprenant ouvre un classeur dans un environnement de type tableur,
avec : - grille de cellules, lignes et colonnes ; - barre de formule ; -
onglets de feuilles ; - saisie de valeurs et formules ; - références de
cellules ; - mise en forme de base ; - tri, filtre et tableaux
structurés ; - graphiques et tableaux croisés dynamiques selon la
capacité du moteur ; - import de fichiers CSV/XLSX si autorisé ; -
exercices préchargés et classeurs de départ ; - panneau de consignes et
panneau de feedback ; - bouton « Vérifier mon travail » et option de
correction pas à pas.

## 8.2 Compatibilité et moteur

Le cahier des charges doit permettre deux modes : - **Mode natif
intégré** : tableur web avec moteur de calcul compatible avec un
sous-ensemble documenté des fonctions Excel. - **Mode fichier** :
téléchargement d'un classeur XLSX, travail dans Excel ou LibreOffice,
puis remise du fichier pour contrôle lorsque l'analyse du fichier est
techniquement possible.

La plateforme ne doit pas prétendre exécuter parfaitement toutes les
fonctions, macros, connexions et fonctionnalités propriétaires d'Excel
si le moteur ne les prend pas en charge. Une matrice de compatibilité
doit préciser les fonctions disponibles.

## 8.3 Contrôle automatique des classeurs

-   Vérifier les valeurs et formules de cellules cibles.
-   Vérifier la présence de formules, pas seulement les valeurs finales.
-   Accepter plusieurs formules équivalentes lorsque cela est possible.
-   Détecter les cellules manquantes, erreurs de calcul et références
    cassées.
-   Vérifier la structure, les totaux, les contrôles et les formats
    attendus.
-   Comparer les résultats à un jeu de référence.
-   Donner un score par critère.
-   Permettre à l'auteur d'indiquer les cellules attendues et les
    critères d'évaluation.
-   Ne pas pénaliser une autre méthode correcte sans raison pédagogique
    documentée.

## 8.4 Exercices Excel essentiels

-   Nettoyer une liste de transactions.
-   Réconcilier deux fichiers.
-   Calculer les commissions par contrat.
-   Construire un tableau croisé dynamique de portefeuille.
-   Produire un compte de résultat mensuel.
-   Calculer des ratios financiers.
-   Créer un budget et une analyse des écarts.
-   Construire un tableau de bord direction.
-   Auditer un modèle contenant des erreurs volontairement introduites.

# 9. Simulateurs intégrés

Chaque simulateur doit contenir un mode guidé, un mode libre, des
scénarios prédéfinis, un bouton de réinitialisation, un affichage des
hypothèses, un journal des actions, un résultat attendu, des
explications et une évaluation.

## 9.1 Simulateur de comptabilité

-   Saisie d'écritures débit/crédit.
-   Contrôle de l'équilibre de l'écriture.
-   Journal, grand livre, balance et états synthétiques.
-   Écritures d'inventaire, amortissement et provisions pédagogiques.
-   Détection d'écritures déséquilibrées ou incohérentes.
-   Simulation d'une clôture.
-   Explication du chemin entre transaction, écriture et état financier.

## 9.2 Simulateur d'analyse financière

-   Import ou sélection d'états financiers fictifs.
-   Analyse de tendances sur plusieurs périodes.
-   Ratios configurables et documentés.
-   Analyse du fonds de roulement et du besoin en fonds de roulement
    selon le référentiel pédagogique retenu.
-   Tableau de bord de liquidité, solvabilité, rentabilité et activité.
-   Comparaison à des seuils de référence paramétrables, jamais
    présentés comme universels.
-   Génération d'une note d'analyse avec risques, limites et
    recommandations.
-   Vérification de cohérence entre données, ratios et conclusion.

## 9.3 Simulateur de contrôle de gestion

-   Construction d'un budget.
-   Réalisation vs budget.
-   Écarts en valeur et en pourcentage.
-   Décomposition prix/volume/mix lorsque pertinente.
-   Coûts fixes et variables.
-   Seuil de rentabilité.
-   Budget flexible.
-   Prévision glissante.
-   Simulation de décisions et effet sur les marges.
-   Identification des écarts significatifs et proposition d'actions.

## 9.4 Simulateur de trésorerie

-   Encaissements et décaissements planifiés.
-   Calendrier de trésorerie.
-   Solde d'ouverture, solde de clôture et besoin de financement.
-   Retards clients, échéances fournisseurs et saisonnalité.
-   Scénarios optimiste, central et prudent.
-   Alertes sur les soldes négatifs et les hypothèses manquantes.
-   Comparaison des décisions et de leurs effets.

## 9.5 Simulateur de décision d'investissement

-   Flux de trésorerie par période.
-   Taux d'actualisation et hypothèses documentées.
-   VAN, TRI et délai de récupération.
-   Analyse de sensibilité sur prix, volume, coûts et taux.
-   Scénarios et stress tests.
-   Limites des indicateurs et explication des cas où ils divergent.
-   Note de recommandation générée à partir des paramètres choisis.

## 9.6 Simulateur de courtage en assurance

-   Base fictive de clients, assureurs, branches, contrats et échéances.
-   Import d'un bordereau fictif de primes ou commissions.
-   Paramétrage des conventions de commission par contrat.
-   Calcul de commission attendue et comparaison à la commission
    déclarée.
-   Suivi des renouvellements, résiliations, nouveaux contrats et pertes
    de portefeuille.
-   Calcul de taux de rétention, taux de renouvellement, prime moyenne
    et revenu de commission, avec définitions explicites.
-   Suivi des créances, encaissements et reversements selon le scénario
    contractuel.
-   Analyse de rentabilité par client, branche, équipe et période.
-   Analyse de la concentration du portefeuille.
-   Tableau de bord commercial et financier.
-   Détection d'anomalies : contrat arrivé à échéance, commission
    incohérente, doublon, écart de rapprochement ou données manquantes.
-   Prévision de revenu selon un pipeline fictif et hypothèses
    modifiables.
-   Scénarios de hausse/baisse du taux de renouvellement, de
    modification de mix et de retard de paiement.
-   Note de synthèse pour un comité de gestion.

Les scénarios doivent distinguer clairement prime d'assurance, revenu de
commission, sommes éventuellement détenues pour compte de tiers,
créance, encaissement et résultat. Le modèle comptable exact doit être
validé par un professionnel selon les contrats et règles applicables.

## 9.7 Simulateur de reporting

-   Sélection de KPI.
-   Construction de tableaux et graphiques.
-   Comparaison période, budget et réalisé.
-   Filtrage par entité, branche, client ou équipe.
-   Contrôle de cohérence entre visualisation et données sources.
-   Export PDF/XLSX/CSV selon les droits.
-   Exercice où l'apprenant doit choisir les indicateurs utiles à une
    décision.

## 9.8 Simulateur de risque et de sensibilité

-   Modification de paramètres.
-   Scénarios univariés et multivariés.
-   Visualisation des effets sur marge, trésorerie, VAN ou revenu de
    commission.
-   Analyse des seuils de rupture.
-   Explication de la différence entre corrélation, hypothèse et
    causalité.
-   Interdiction de présenter les résultats comme des prévisions
    garanties.

# 10. Simulateurs visuels et 3D

Les simulateurs 3D doivent être utilisés lorsque la visualisation
spatiale ou la progression d'un processus facilite réellement
l'apprentissage. Ils ne doivent pas être ajoutés uniquement pour l'effet
visuel.

## 10.1 Cas d'usage possibles

-   Parcours visuel d'une entreprise : vente → facture → encaissement →
    comptabilisation → reporting.
-   Flux entre client, courtier et assureur, avec points de contrôle et
    flux financiers.
-   Visualisation d'un portefeuille de contrats sous forme de carte ou
    de graphe interactif.
-   Tableau de bord immersif où chaque branche ou client peut être
    exploré.
-   Simulation de chaîne budgétaire entre directions et centres de
    coûts.
-   Visualisation d'un cycle de trésorerie et des retards de paiement.

## 10.2 Comportement attendu

-   Caméra orbitale ou navigation accessible.
-   Zoom, rotation, sélection d'éléments et info-bulles.
-   Légende, filtres et couleurs accessibles.
-   Mode 2D équivalent pour appareils peu puissants ou utilisateurs
    préférant une interface classique.
-   Contrôles clavier et tactile.
-   Pas de surcharge graphique ni de dépendance à un GPU puissant.
-   Chaque élément 3D doit renvoyer à une notion, une donnée ou une
    décision pédagogique.

# 11. Cas pratiques et projets de synthèse

La plateforme doit proposer des cas progressifs, corrigés et
réutilisables.

## 11.1 Cas ivoiriens fictifs

-   PME de distribution à Abidjan : marge, stock, trésorerie et budget.
-   Entreprise de services : rentabilité par contrat et coût de
    prestation.
-   Entreprise industrielle : coûts de production et écarts.
-   Société multi-sites : reporting mensuel.
-   PME en recherche de financement : analyse financière et capacité de
    remboursement.

## 11.2 Cas courtage en assurance fictif

Une société de courtage fictive possède plusieurs branches (santé,
automobile, dommages aux biens, responsabilité civile, transport,
vie/prévoyance selon le scénario), des clients entreprises et
particuliers, des renouvellements et des accords de commission
variables.

Livrables demandés à l'apprenant : - fichier de données nettoyé ; -
rapprochement des primes et commissions ; - tableau de bord Excel ; -
analyse de la performance du portefeuille ; - prévision des revenus ; -
analyse de la trésorerie ; - identification des risques et anomalies ; -
note de synthèse de deux pages ; - présentation orale simulée à la
direction.

## 11.3 Cas international

-   Plusieurs entités, devises et périodes.
-   Reporting consolidé pédagogique.
-   Analyse des écarts entre entités.
-   Présentation exécutive et recommandations.
-   Documentation des hypothèses et limites.

Chaque cas doit préciser le contexte, le rôle joué par l'apprenant, les
données initiales, les questions, les livrables, les critères de
notation, le corrigé détaillé et des variantes de difficulté.

# 12. Plan d'apprentissage personnalisé

## 12.1 Diagnostic initial

Évaluer : - bases comptables ; - compréhension des états financiers ; -
maîtrise d'Excel ; - ratios et interprétation ; - budgets et écarts ; -
trésorerie ; - notions de finance d'entreprise ; - expérience
sectorielle ; - objectif professionnel ; - temps disponible par semaine.

Le diagnostic ne doit pas être présenté comme un jugement de valeur. Il
sert à recommander un parcours.

## 12.2 Génération du plan

Le moteur recommande : - parcours prioritaires ; - ordre des modules ; -
durée indicative ; - sessions hebdomadaires ; - révisions espacées ; -
exercices ciblés sur les lacunes ; - cas de synthèse ; - évaluations de
contrôle.

L'apprenant doit pouvoir modifier son objectif et son temps disponible.
Le plan doit se recalculer sans effacer l'historique.

## 12.3 Exemple de plan sur 24 semaines

-   Semaines 1--4 : comptabilité et états financiers.
-   Semaines 5--8 : Excel essentiel à intermédiaire.
-   Semaines 9--12 : analyse financière et ratios.
-   Semaines 13--16 : contrôle de gestion et budgets.
-   Semaines 17--19 : trésorerie et finance d'entreprise.
-   Semaines 20--22 : spécialisation courtage en assurance.
-   Semaines 23--24 : projet intégré, examen blanc et portfolio.

Ce plan est un modèle adaptable, non une obligation. Prévoir des
parcours accélérés et des parcours plus longs.

## 12.4 Répétition espacée

-   Réactivation automatique des notions oubliées.
-   Questions de révision courtes.
-   Espacement adapté au niveau de maîtrise.
-   Priorité aux erreurs répétées et notions prérequises.
-   Option de désactivation ou de réglage de la fréquence.

# 13. Évaluations, badges et portfolio

-   Quiz de fin de leçon.
-   Évaluation de fin de module.
-   Examen blanc chronométré.
-   Cas pratique noté selon une grille.
-   Évaluation finale par compétence.
-   Badge interne clairement distingué d'une certification officielle.
-   Historique des tentatives et progrès.
-   Portfolio téléchargeable : tableaux de bord, analyses, modèles et
    notes de synthèse créés par l'apprenant.
-   Attestation interne si les conditions de réussite sont remplies.
-   Détection d'intégrité raisonnable sans surveillance intrusive par
    défaut.

Les critères doivent valoriser la justesse, la méthode, la qualité du
raisonnement, la traçabilité des hypothèses et la communication des
résultats.

# 14. Tableaux de bord

## 14.1 Tableau de bord apprenant

-   Progression globale et par domaine.
-   Compétences maîtrisées, en cours et à renforcer.
-   Objectifs hebdomadaires.
-   Recommandations de prochaine activité.
-   Résultats récents et erreurs récurrentes.
-   Temps d'apprentissage facultatif.
-   Échéances et rappels configurables.
-   Accès rapide aux simulateurs et au portfolio.

## 14.2 Tableau de bord formateur

-   Progression par cohorte.
-   Compétences où les apprenants échouent fréquemment.
-   Résultats par exercice.
-   Tentatives et travaux à corriger.
-   Possibilité d'assigner une activité de remédiation.
-   Export des résultats selon les permissions.

## 14.3 Tableau de bord administrateur

-   Utilisateurs actifs.
-   Contenus publiés, en brouillon et à réviser.
-   Santé des simulateurs.
-   Erreurs techniques.
-   Utilisation des ressources.
-   Historique des changements et audit des accès.

# 15. Studio de création pédagogique

Les auteurs autorisés doivent pouvoir : - créer cours, chapitres,
leçons, quiz, cas et simulations ; - définir objectifs, prérequis,
niveau et durée ; - joindre documents, classeurs et jeux de données ; -
définir les réponses, tolérances, critères et explications ; - créer des
scénarios avec paramètres modifiables ; - versionner, prévisualiser et
publier ; - programmer une date de révision ; - relier une erreur à une
activité de remédiation ; - dupliquer un contenu pour un autre contexte
; - gérer les traductions ou variantes locales.

Workflow : brouillon → revue pédagogique → revue métier/réglementaire si
nécessaire → validation → publication → révision/archivage. Les contenus
réglementaires ne doivent pas être publiés sans validation appropriée.

# 16. Bibliothèque de données

Fournir des jeux de données synthétiques, documentés et reproductibles
: - grand livre, balance et états financiers ; - ventes, achats, stocks
et règlements ; - budgets et réalisations ; - encaissements et
décaissements ; - portefeuille de contrats d'assurance ; - commissions
attendues et déclarées ; - échéances et renouvellements ; - données de
service et de performance ; - jeux multi-périodes, multi-entités et
multi-devises.

Chaque jeu doit posséder : - description du scénario ; - dictionnaire de
données ; - unités et formats ; - période couverte ; - hypothèses de
génération ; - version ; - résultats attendus ; - licence et niveau de
confidentialité ; - cas d'usage pédagogique.

Ne jamais inclure de données personnelles ou confidentielles réelles
sans autorisation formelle et mesures de protection adaptées.

# 17. Fonctionnalités d'intelligence artificielle

L'IA peut : - expliquer une notion à plusieurs niveaux ; - proposer des
indices progressifs ; - analyser une erreur et suggérer une remédiation
; - générer des variantes d'exercices à partir de modèles validés ; -
simuler un entretien avec un manager financier ; - jouer le rôle d'un
directeur financier demandant une analyse ; - aider à structurer une
note de synthèse ; - fournir des retours sur la clarté d'un raisonnement
; - recommander des révisions selon les résultats.

Garde-fous obligatoires : - les calculs de référence restent
déterministes ; - les contenus réglementaires et fiscaux doivent citer
des sources datées et être validés ; - l'IA ne doit pas inventer des
textes, taux ou obligations ; - afficher les hypothèses et signaler
l'incertitude ; - ne pas envoyer de données confidentielles à un
fournisseur d'IA sans autorisation ; - permettre de désactiver les
fonctions IA ; - enregistrer les versions de prompts et modèles pour
audit lorsque pertinent ; - l'IA ne délivre pas seule une certification
officielle.

# 18. Exigences UX/UI

## 18.1 Direction artistique

-   Interface professionnelle, moderne, sobre et rassurante.
-   Couleurs recommandées : bleu nuit ou ardoise pour la structure,
    blanc pour les surfaces, accent turquoise ou vert pour la
    progression et accent orange limité aux alertes ou actions.
-   Typographie lisible et hiérarchie claire.
-   Graphiques simples, unités explicites et annotations utiles.
-   Éviter les tableaux surchargés et les dashboards décoratifs.
-   Thème clair par défaut et thème sombre optionnel.

## 18.2 Navigation

Menu principal suggéré : - Accueil - Mon parcours - Cours - Exercices -
Laboratoire Excel - Simulateurs - Cas pratiques - Bibliothèque - Mon
portfolio - Communauté / entraide (optionnel) - Administration selon le
rôle

## 18.3 Pages à prévoir

1.  Page d'accueil publique.
2.  Inscription, connexion et récupération de compte.
3.  Onboarding et diagnostic.
4.  Tableau de bord apprenant.
5.  Catalogue des parcours.
6.  Détail d'un parcours.
7.  Lecteur de cours.
8.  Exercice interactif.
9.  Laboratoire Excel.
10. Espace simulateur.
11. Vue de résultats et explication.
12. Bibliothèque de cas.
13. Espace projet final.
14. Portfolio et export.
15. Historique des évaluations.
16. Profil et préférences.
17. Tableau de bord formateur.
18. Gestion des cohortes.
19. Studio auteur.
20. Gestion des contenus et versions.
21. Gestion des jeux de données.
22. Administration des rôles et accès.
23. Paramètres des référentiels et contextes.
24. Centre de notifications.
25. Journal d'audit et supervision.

## 18.4 Accessibilité et ergonomie

-   Cibles conformes autant que possible à WCAG 2.2 AA.
-   Navigation clavier et focus visibles.
-   Libellés explicites et erreurs accessibles.
-   Contrastes suffisants et graphiques accompagnés d'un résumé textuel.
-   Ne pas communiquer une information uniquement par la couleur.
-   Réduction des animations et alternative aux vues 3D.
-   Responsive mobile, tablette et ordinateur.
-   Sauvegarde automatique des travaux avec indication de l'état de
    sauvegarde.

# 19. Exigences non fonctionnelles

## 19.1 Performance

-   Pages courantes : objectif de chargement perçu inférieur à 3
    secondes sur connexion raisonnable.
-   Feedback de calcul simple : objectif inférieur à 2 secondes.
-   Pagination pour les grandes listes.
-   Chargement différé des composants 3D et graphiques lourds.
-   Cache des contenus statiques.
-   Limites configurables de taille de fichiers et de durée de
    simulation.

## 19.2 Disponibilité et résilience

-   Objectif initial : 95 % de disponibilité mensuelle hors maintenance,
    améliorable après pilote.
-   Sauvegardes automatiques et testées.
-   Procédures de restauration documentées.
-   Reprise propre après erreur de simulateur.
-   Les travaux non sauvegardés doivent être protégés autant que
    possible.

## 19.3 Sécurité

-   HTTPS obligatoire en production.
-   Authentification sécurisée et hachage adapté des mots de passe si
    comptes locaux.
-   MFA optionnelle ou obligatoire selon le profil.
-   RBAC, sessions sécurisées, limitation des tentatives et protection
    contre les attaques courantes.
-   Validation serveur des entrées.
-   Protection contre XSS, CSRF, injection SQL et téléversements
    malveillants.
-   Secrets en variables sécurisées ou gestionnaire de secrets, jamais
    dans le dépôt.
-   Journalisation des actions sensibles.
-   Analyse de dépendances et tests de sécurité avant mise en
    production.
-   Séparation des environnements développement, test, recette et
    production.
-   Tests d'intrusion ou revue indépendante selon le risque.

## 19.4 Protection des données

-   Collecte minimale des données personnelles.
-   Politique de conservation et suppression.
-   Export et suppression de compte selon les règles applicables.
-   Consentement et information claire pour les traitements nécessaires.
-   Données de formation fictives par défaut.
-   Vérification des obligations locales applicables, notamment en
    matière de protection des données personnelles en Côte d'Ivoire.
-   Aucun envoi de données professionnelles confidentielles à des
    services tiers sans validation.

## 19.5 Compatibilité

-   Navigateurs récents Chrome, Edge, Firefox et Safari.
-   Responsive mobile iOS et Android.
-   Tests sur connexions lentes.
-   Alternative aux fonctionnalités avancées lorsqu'elles ne sont pas
    supportées.

# 20. Architecture technique cible

L'architecture exacte sera arrêtée lors de la conception technique. Une
base possible :

-   **Frontend** : React/Next.js ou Angular avec TypeScript.
-   **Backend API** : Java Spring Boot, NestJS ou technologie
    équivalente.
-   **Base relationnelle** : PostgreSQL.
-   **Cache / tâches asynchrones** : Redis et file de tâches si le
    besoin est confirmé.
-   **Stockage de fichiers** : stockage objet compatible S3 ou
    équivalent.
-   **Authentification** : fournisseur OIDC/OAuth 2.0 éprouvé, avec
    RBAC.
-   **Moteur de calcul** : bibliothèque déterministe testée côté serveur
    ; moteur client pour feedback rapide non sensible.
-   **Graphiques** : bibliothèque accessible et adaptée aux tableaux de
    bord.
-   **3D** : Three.js ou équivalent, chargé à la demande.
-   **Observabilité** : logs structurés, métriques, traces et alertes.
-   **Déploiement** : conteneurs Docker, pipeline CI/CD, environnements
    isolés.
-   **Documentation API** : OpenAPI.
-   **Tests** : unitaires, intégration, contrat, E2E, sécurité et
    performance.

Il faut privilégier un monolithe modulaire au lancement, sauf
justification claire en faveur de microservices. Les domaines métier
doivent être séparés logiquement pour permettre une évolution
progressive.

## 20.1 Modules backend suggérés

-   Identité et accès.
-   Profils et parcours.
-   Catalogue pédagogique.
-   Évaluations et corrections.
-   Excel Lab et fichiers.
-   Simulateurs.
-   Jeux de données.
-   Portefeuille de compétences.
-   Cohortes et tutorat.
-   Notifications.
-   Studio auteur.
-   Référentiels et sources.
-   Audit et administration.

## 20.2 Modèle de données conceptuel

Entités minimales : - User, Role, Permission, UserPreference. -
LearningPath, Module, Lesson, LearningObjective. - Competency,
CompetencyAssessment, UserCompetency. - Exercise, ExerciseAttempt,
Answer, Feedback. - Quiz, QuizQuestion, QuizAttempt. - Simulation,
SimulationScenario, SimulationRun, SimulationEvent. - Dataset,
DatasetVersion, DatasetField. - Workbook, WorkbookSubmission,
WorkbookCheck. - CaseStudy, CaseDeliverable, Rubric, RubricCriterion. -
Cohort, Enrollment, Assignment, TutorComment. - ContentVersion, Review,
Publication. - SourceReference, RegulatoryReview. - Notification,
AuditEvent, Certificate. - UserPortfolioItem.

Prévoir les dates de création et de modification, l'auteur, la version,
le statut et les règles de suppression nécessaires.

# 21. Principes de calcul et contrôles de cohérence

-   Stocker les montants avec une précision décimale appropriée, pas en
    virgule flottante binaire lorsque cela peut créer des écarts
    monétaires.
-   Définir les règles d'arrondi par contexte.
-   Distinguer montant brut, net, taxes, commissions, encaissement et
    revenu.
-   Afficher devise, période, unité et source.
-   Documenter les formules et hypothèses.
-   Ne pas comparer des périodes ou référentiels incompatibles sans
    avertissement.
-   Contrôler les divisions par zéro et valeurs manquantes.
-   Définir les règles de gestion des données négatives.
-   Tester les valeurs limites et les scénarios d'erreur.
-   Conserver la reproductibilité des simulations par version du moteur
    et du jeu de données.

# 22. Exigences de test et recette

## 22.1 Tests fonctionnels

-   Inscription, connexion, récupération de compte et droits.
-   Création d'un parcours et publication d'une leçon.
-   Passage d'un exercice et affichage du feedback.
-   Calculs comptables équilibrés et déséquilibrés.
-   Calcul de ratios sur jeux de référence.
-   Calcul de budget et d'écarts.
-   Calcul VAN/TRI sur cas de référence.
-   Calcul de commissions selon conventions paramétrées.
-   Vérification d'un classeur et détection de formules erronées.
-   Sauvegarde et reprise d'une simulation.
-   Export et respect des permissions.
-   Historique et versionnement des contenus.

## 22.2 Tests techniques

-   Tests unitaires des formules.
-   Tests d'intégration API et base de données.
-   Tests end-to-end des parcours principaux.
-   Tests de charge et de montée en charge.
-   Tests de sécurité et de téléversement.
-   Tests d'accessibilité.
-   Tests navigateurs et mobiles.
-   Tests de sauvegarde et restauration.
-   Tests de résistance à des données incomplètes, incohérentes et très
    volumineuses.

## 22.3 Critères de recette

La version est recevable si : - toutes les fonctions critiques du
périmètre validé passent les tests ; - les résultats numériques
concordent avec les jeux de référence approuvés ; - aucune vulnérabilité
critique ou élevée non acceptée n'est ouverte ; - les rôles et
permissions sont validés ; - les contenus du MVP sont revus ; - la
documentation utilisateur et technique est livrée ; - la sauvegarde et
la restauration ont été testées ; - les défauts résiduels sont
documentés et acceptés formellement.

# 23. Gouvernance des contenus et conformité

Créer un comité de validation pédagogique composé, selon le sujet, d'un
spécialiste comptable/financier, d'un expert Excel, d'un contrôleur de
gestion et d'un spécialiste du secteur de l'assurance. Pour les contenus
juridiques, fiscaux ou réglementaires, prévoir une validation par une
personne compétente et une date de révision.

Les sources doivent être prioritaires : 1. textes et publications
officielles ; 2. référentiels professionnels autorisés ; 3. organismes
de normalisation et autorités compétentes ; 4. ressources pédagogiques
reconnues ; 5. exemples internes expressément autorisés.

Toute règle sensible doit inclure : titre de la source, organisme, date
de publication, date de consultation, périmètre, URL si disponible et
avertissement en cas d'incertitude.

# 24. Livrables attendus de l'équipe de réalisation

1.  Dossier de conception fonctionnelle détaillée.
2.  Architecture technique et diagrammes de déploiement.
3.  Maquettes UX/UI des pages principales.
4.  Design system et composants réutilisables.
5.  Modèle de données et migrations.
6.  API documentée.
7.  Code source complet.
8.  Tests automatisés et jeux de référence.
9.  Pipeline CI/CD.
10. Scripts de déploiement et configuration par environnement.
11. Documentation d'administration et d'exploitation.
12. Guide utilisateur et guide formateur.
13. Parcours pédagogiques du MVP.
14. Jeux de données synthétiques et corrigés.
15. Simulateurs livrés avec documentation de leurs formules.
16. Rapport de tests fonctionnels, performance et sécurité.
17. Plan de sauvegarde, restauration et continuité.
18. Liste des limites connues et feuille de route.

# 25. Découpage en lots

## Lot 1 --- MVP pédagogique

-   Authentification et profils.
-   Diagnostic initial.
-   Parcours, leçons et quiz.
-   Progression et tableau de bord.
-   Exercices numériques et feedback.
-   Simulateurs de base : comptabilité, ratios financiers, budget/écarts
    et trésorerie.
-   Premiers cas ivoiriens fictifs.
-   Administration minimale des contenus.

## Lot 2 --- Excel Lab et cas métier

-   Tableur intégré avec fonctions prioritaires.
-   Import/export de fichiers autorisés.
-   Contrôle de classeurs.
-   Cas pratiques complets.
-   Simulateur de courtage en assurance.
-   Portfolio et exports.
-   Gestion de cohortes.

## Lot 3 --- Modélisation avancée

-   Investissements, VAN/TRI, sensibilités.
-   Reporting multi-entités et multi-devises.
-   Studio auteur avancé.
-   Recommandations adaptatives.
-   Plus de jeux de données et cas internationaux.

## Lot 4 --- Immersion et intelligence augmentée

-   Vues 3D réellement utiles.
-   Assistant IA avec garde-fous.
-   Simulations de réunions et entretiens.
-   Analytics pédagogiques avancés.
-   Fonctionnalités collaboratives si justifiées.

## Lot 5 --- Industrialisation

-   Renforcement sécurité et observabilité.
-   Performance et montée en charge.
-   Gestion avancée des référentiels.
-   Revue indépendante des contenus réglementaires.
-   Automatisation de la publication et gouvernance.

Le calendrier et les coûts seront estimés après validation des
priorités, du niveau de fidélité du tableur et du périmètre de l'IA. Ne
pas promettre un Excel complet, une IA fiable et des simulations 3D
complexes dans un premier lot à budget ou délai non évalué.

# 26. Priorisation

### Indispensable au MVP

-   Parcours pédagogiques structurés.
-   Cours, quiz et exercices corrigés.
-   Diagnostic et progression.
-   Simulateurs de calcul fiables.
-   Jeux de données fictifs ivoiriens.
-   Première spécialisation courtage.
-   Sécurité, rôles, audit et sauvegarde.
-   Interface responsive.

### Important après MVP

-   Excel Lab avancé.
-   Contrôle automatisé de fichiers XLSX.
-   Gestion de cohortes et tutorat.
-   Portfolio professionnel.
-   Simulations d'investissement et de reporting avancées.

### Évolutif

-   3D immersive.
-   Assistant IA avancé.
-   Communauté et défis.
-   Intégrations externes.
-   Application mobile dédiée.

# 27. Risques et mesures d'atténuation

  -----------------------------------------------------------------------
  Risque                  Conséquence             Mesure
  ----------------------- ----------------------- -----------------------
  Formules financières    Mauvais apprentissage   Moteur déterministe,
  incorrectes                                     tests de référence,
                                                  revue experte

  Contenu réglementaire   Mauvaise application    Sources officielles,
  périmé                  métier                  date de vérification,
                                                  workflow de revue

  Simulateur Excel trop   Écart avec la pratique  Matrice de
  limité                  réelle                  compatibilité, mode
                                                  fichier, périmètre
                                                  explicite

  Trop de fonctions dès   Retard et complexité    Livraison par lots, MVP
  le départ                                       centré sur les
                                                  compétences
                                                  essentielles

  IA qui invente une      Perte de confiance      Sources, garde-fous,
  réponse                                         calculs déterministes,
                                                  validation humaine

  Données sensibles       Risque de               Données synthétiques
  utilisées dans les      confidentialité         par défaut, contrôle
  exercices                                       des imports

  3D peu utile ou lourde  Mauvaise expérience     Cas d'usage justifié,
                                                  mode 2D, chargement
                                                  différé

  Utilisateur découragé   Abandon                 Progression par étapes,
                                                  indices, remédiation et
                                                  objectifs réalistes

  Modèles financiers mal  Décision erronée        Hypothèses, limites et
  interprétés                                     scénarios explicités
  -----------------------------------------------------------------------

# 28. Conditions de réussite

-   Un expert métier doit valider les contenus et les formules.
-   Les parcours doivent être testés avec de vrais apprenants débutants
    et intermédiaires.
-   Les exemples doivent être réalistes, mais fictifs et non
    confidentiels.
-   La plateforme doit expliquer le « pourquoi », pas seulement fournir
    la réponse.
-   La qualité des jeux de données et des corrigés est aussi importante
    que le code.
-   L'application doit privilégier la profondeur pédagogique et la
    fiabilité avant les effets visuels.
-   Les fonctions de reporting doivent aider à prendre une décision, pas
    seulement afficher des chiffres.

# 29. Instructions de réalisation destinées à une IA de développement

Si ce cahier des charges est fourni à une IA de développement, elle doit
:

1.  Lire l'intégralité du document et produire une matrice de
    traçabilité exigences → écrans → API → données → tests.
2.  Identifier les ambiguïtés et formuler des hypothèses explicites
    avant d'implémenter les parties concernées.
3.  Proposer une architecture cohérente, puis implémenter par lots sans
    générer un monolithe de code non vérifié.
4.  Créer un dépôt propre, une structure modulaire, un fichier README,
    un fichier `.env.example` sans secret et des instructions de
    lancement.
5.  Fournir des migrations de base de données, données de démonstration
    et comptes de test clairement documentés.
6.  Implémenter d'abord les parcours critiques de bout en bout.
7.  Pour chaque formule financière, fournir définition, hypothèses,
    tests unitaires, cas limites et exemple de calcul.
8.  Ne jamais simuler une fonction comme opérationnelle si elle n'est
    qu'une maquette : afficher son état et ses limites.
9.  Ne pas coder en dur des règles fiscales, comptables ou
    réglementaires sans source et version.
10. Ajouter les contrôles de validation, permissions et journaux
    nécessaires.
11. Créer des tests automatisés à chaque étape et exécuter les tests
    avant d'annoncer une fonctionnalité terminée.
12. Documenter les fonctionnalités incomplètes, les limites et les choix
    techniques.
13. Livrer une application réellement exécutable, pas seulement des
    écrans statiques.
14. Respecter l'accessibilité, le responsive et les performances.
15. Ne pas utiliser de données réelles ou de marques comme si elles
    avaient approuvé la solution.

## 29.1 Définition de « terminé »

Une fonctionnalité n'est terminée que si : - son parcours utilisateur
est implémenté ; - les états chargement, succès, erreur et absence de
données sont traités ; - les permissions sont appliquées ; - les données
sont persistées si nécessaire ; - les tests pertinents passent ; -
l'interface est responsive ; - la documentation est mise à jour ; - les
limites restantes sont déclarées.

# 30. Glossaire minimal

-   **Analyse horizontale** : évolution d'un poste entre plusieurs
    périodes.
-   **Analyse verticale** : poids d'un poste dans un total de référence.
-   **BFR** : besoin de financement lié au cycle d'exploitation, selon
    les définitions retenues.
-   **Contrôle de gestion** : suivi de la performance, des budgets, des
    coûts et des écarts.
-   **KPI** : indicateur clé de performance, accompagné d'une définition
    mesurable.
-   **Marge contributive** : contribution d'une activité après les coûts
    retenus dans le modèle.
-   **VAN** : valeur actuelle nette des flux actualisés selon les
    hypothèses retenues.
-   **TRI** : taux qui annule la VAN dans un modèle donné, avec limites
    d'interprétation.
-   **XOF/FCFA** : code et appellation de la monnaie utilisée dans
    l'UEMOA.
-   **SYSCOHADA** : référentiel comptable OHADA applicable selon le
    périmètre concerné.
-   **CIMA** : cadre institutionnel et réglementaire régional des
    assurances dans les États membres concernés.
-   **Courtier** : intermédiaire dont le rôle, la rémunération et les
    responsabilités dépendent du cadre légal et des contrats
    applicables.

------------------------------------------------------------------------

# Annexe A --- Exemple de scénario de simulation courtage

**Société fictive :** Ivoire Courtage Conseil (ICC).\
**Période :** exercice annuel fictif.\
**Devise :** XOF.\
**Données :** clients, contrats, échéances, primes, taux de commission
contractuels, commissions déclarées, encaissements et coûts de service
fictifs.

### Mission de l'apprenant

1.  Importer et contrôler le fichier du portefeuille.
2.  Identifier les contrats échus ou arrivant à échéance.
3.  Recalculer les commissions attendues à partir des paramètres du
    scénario.
4.  Rapprocher les commissions attendues et déclarées.
5.  Analyser la performance par branche et par client.
6.  Identifier les concentrations et risques.
7.  Construire un tableau de bord Excel.
8.  Prévoir les revenus de commission selon trois scénarios.
9.  Évaluer les effets d'une baisse du renouvellement et d'un retard
    d'encaissement.
10. Rédiger une note de décision destinée à la direction.

### Contrôles attendus

-   Les totaux du tableau de bord doivent correspondre aux données
    filtrées.
-   Les taux et bases de commission doivent être visibles.
-   Les contrats sans taux ou avec données manquantes doivent être
    signalés, pas estimés silencieusement.
-   Les écarts doivent être traçables jusqu'aux lignes sources.
-   Les projections doivent distinguer hypothèses et faits observés.
-   Les recommandations doivent s'appuyer sur les résultats et préciser
    les limites.

# Annexe B --- Exemple de grille d'évaluation d'un projet final

  Critère                                     Pondération indicative
  ----------------------------------------- ------------------------
  Exactitude des calculs et contrôles                           30 %
  Qualité du modèle Excel et traçabilité                        20 %
  Pertinence de l'analyse financière                            20 %
  Qualité des recommandations                                   15 %
  Lisibilité du tableau de bord                                 10 %
  Documentation des hypothèses et limites                        5 %

Les pondérations sont configurables selon le parcours. Une erreur
critique affectant une conclusion financière peut déclencher une revue,
même si le score total est élevé.

# Annexe C --- Décisions à confirmer avant le lancement

-   Application personnelle, organisme de formation ou plateforme
    multi-entreprises.
-   Langue initiale et besoin futur de contenus bilingues.
-   Tableur natif uniquement ou prise en charge de fichiers Excel.
-   Niveau d'automatisation de la correction des classeurs.
-   Fournisseur IA autorisé et politique de données.
-   Référentiels exacts à couvrir en première version.
-   Validateur métier pour les contenus OHADA, fiscalité et assurance.
-   Hébergement, localisation des données et exigences de conformité.
-   Modèle économique éventuel : gratuit, abonnement, licence entreprise
    ou formation.
-   Taille cible de la première cohorte et exigences de montée en
    charge.

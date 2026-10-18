# 11 — Rapport de vérification technique et état de préparation

**État vérifié :** 18 octobre 2026  
**Portée :** validation locale du dépôt et état des prérequis de production  
**Statut :** rapport technique, sans homologation externe ni autorisation de mise en production

## Résultats vérifiables

| Vérification | Résultat | Limite |
| --- | --- | --- |
| `npm run build` | Réussi : TypeScript et Vite produisent `dist/`. | Cela ne mesure pas le temps de chargement réel sur réseau mobile. |
| `npm test -- --run` | 15 fichiers, 76 tests réussis. | La majorité des tests sont unitaires ou utilisent des API simulées. |
| `npm audit --omit=dev` | Aucune vulnérabilité signalée dans les dépendances de production installées. | Les dépendances de développement ont encore 13 avis (5 modérés, 6 élevés, 2 critiques); le correctif npm sans migration majeure ne les résout pas. |
| Audit formel du catalogue 360° | Le pilote analyste passe l’audit renforcé. Les six autres parcours restent en brouillon et ne sont pas proposés aux nouveaux apprenants. | L’audit structurel n’est ni une relecture pédagogique experte ni une accréditation. |
| Démarrage local de Vite | `npm run dev` a démarré sur le port 3000 et la racine HTTP a répondu 200. | La validation HTTP seule ne constitue pas un essai visuel complet dans tous les navigateurs. |
| Contrôle de la santé API en local | L’API signale l’état dégradé lorsque PostgreSQL n’est pas configuré. | Aucun serveur distant ni compte de production n’a été validé. |
| Synchronisation multi-appareils | Non vérifiée avec un vrai compte et une base distante. | Le scénario E ne vérifie que le cache local et affirme désormais explicitement que cela ne prouve pas la synchronisation. |
| Publication du studio auteur | Les routes exigent un compte administrateur, une base et les migrations; les brouillons ont une table dédiée. | Le flux n’a pas pu être exercé sur une base réelle dans cet environnement. |
| Déploiement Vercel | Non effectué. | Aucun accès Vercel configuré, aucune URL de production vérifiée. |

## Couverture des scénarios d’acceptation

Les scénarios A à J présents dans `tests/acceptance_scenarios.test.ts` vérifient des règles de progression, de calcul, de contrôle d’accès et de signalement d’erreur dans l’environnement local. Ils ne remplacent pas les essais bout en bout avec PostgreSQL, cookies de session en production, navigateur séparé et plusieurs appareils. Le test de santé valide volontairement un état `degraded` en l’absence de base. La validation d’une compétence utilise désormais ses seuils du référentiel, la réussite des évaluations des modules liés et les résultats des activités.

Avant de déclarer l’acceptation complète, effectuer au minimum :

1. Créer une base de test, appliquer les migrations et seed, puis vérifier `/api/health` avec `database.status = connected`.
2. Inscrire un compte, fermer la session, se reconnecter et confirmer qu’un mot de passe incorrect est refusé.
3. Démarrer un parcours, enregistrer une activité, puis relire la progression depuis un second navigateur avec le même compte.
4. Simuler une erreur PostgreSQL et vérifier que l’interface distingue le cache local de la sauvegarde distante.
5. Promouvoir un compte administrateur, modifier une leçon, sauver le brouillon, rouvrir la session, puis publier et relire la version via `/api/paths`.
6. Faire une revue manuelle clavier, mobile, lecteur d’écran et contraste avant toute déclaration de conformité WCAG.

## Résumé de la recette locale

La compilation de production et les 76 tests passent au moment de cette vérification. Le pilote comprend maintenant 30 leçons réparties dans 10 modules. Une validation d’atelier exige une réponse numérique correcte. L’audit du Studio mesure la profondeur du contenu, le nombre de questions, les exemples et les validations pratiques ; les six autres parcours sont gardés en brouillon puisqu’ils ne passent pas cet audit. Le tableau de bord n’invente pas de métriques de progression, les brouillons du Studio sont sauvegardés par API et les routes de progression exigent une session authentifiée.

La préparation de production reste incomplète tant qu’une base, les variables `DATABASE_URL` et `JWT_SECRET`, un rôle administrateur initial et un déploiement vérifié ne sont pas configurés. Suivre [le guide de déploiement](guide-deploiement-vercel-et-base-persistante.md), puis consigner ici les URL et résultats effectivement observés.

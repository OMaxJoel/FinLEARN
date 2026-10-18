# Déploiement de FinExpert 360°

Dernière vérification des offres : 18 octobre 2026. Les quotas évoluent : relisez les pages officielles liées ci-dessous avant un lancement.

## Architecture et prérequis

L’application utilise React/Vite, les routes API Vercel et PostgreSQL. Les variables `DATABASE_URL` et `JWT_SECRET` sont lues uniquement par les fonctions serveur. Le navigateur ne doit recevoir aucun secret.

Pour une activité commerciale ou une formation professionnelle, choisissez Vercel Pro ou un hébergeur dont les conditions autorisent cet usage. Le plan Hobby est réservé à un usage personnel et non commercial. Il inclut notamment 100 Go de transfert rapide, 1 million d’invocations de fonctions et une durée par défaut de 10 s, configurable jusqu’à 60 s. Les quotas sont soumis aux règles et limites de l’offre. [Détails Vercel Hobby](https://vercel.com/docs/plans/hobby) · [Limites Vercel](https://vercel.com/docs/limits) · [Conditions d’utilisation](https://vercel.com/legal/terms)

Neon Free affiche actuellement 100 projets, 1 Go PostgreSQL par projet et 100 CU-heures par projet et par mois. Supabase Free peut mettre en pause les projets inactifs pendant sept jours ; un ping de santé n’est pas une garantie contre cette pause. Ces offres peuvent convenir à une validation ou à un pilote, mais ne constituent pas une garantie de disponibilité pour une formation en production. [Offre gratuite Neon](https://neon.com/blog/neon-free-plan-1-gb-per-project) · [Mise en pause Supabase](https://supabase.com/docs/guides/platform/free-project-pausing)

## Préparer la base

1. Créez une base PostgreSQL (Neon, Supabase ou fournisseur compatible) et récupérez une URL de connexion TLS, idéalement via un pool adapté aux fonctions serverless.
2. Dans la racine du projet, configurez `DATABASE_URL` et un `JWT_SECRET` aléatoire d’au moins 32 caractères dans un environnement local privé. Ne commitez jamais `.env`.
3. Exécutez `npm ci`, puis `npm run db:seed`. Cette commande applique les migrations SQL dans l’ordre et initialise les compétences et parcours. Elle exige `DATABASE_URL` et ne doit être lancée qu’avec la base cible vérifiée.
4. Créez un compte depuis l’écran de connexion/inscription. Pour accorder le rôle administrateur au premier compte, exécutez dans la console SQL de la base :

   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'votre-adresse@example.com';
   ```

L’authentification actuelle valide l’adresse et le mot de passe, mais ne met pas en place de vérification d’adresse e-mail ni de récupération de mot de passe. Prévoyez ces flux avant une ouverture publique.

## Déployer sur Vercel

1. Importez le dépôt dans Vercel, avec `npm run build` comme commande et `dist` comme dossier de sortie (également déclarés dans `vercel.json`).
2. Configurez `DATABASE_URL` et `JWT_SECRET` dans les variables d’environnement du projet, au minimum pour **Production**. Ajoutez-les aussi à Preview si les previews doivent se connecter à une base dédiée.
3. Déployez. Le script de build lance TypeScript puis Vite. La base doit déjà avoir reçu les migrations et les données de référence.
4. Dans la console SQL, attribuez le rôle `admin` à un compte nominatif autorisé ; ne rendez pas le studio auteur accessible à des comptes apprenants.

## Vérifications après déploiement

- `/api/health` doit retourner `status: "ok"` et `database.status: "connected"`. Une base simplement joignable ne prouve pas que le schéma et les données de référence sont prêts : vérifiez aussi l’inscription, la connexion, un démarrage de parcours et la relecture de la progression depuis une nouvelle session.
- `/api/paths` doit lister les parcours publiés. Après publication d’un brouillon, vérifiez sa version depuis cette route.
- Testez le parcours apprenant sur deux navigateurs/appareils avec le même compte et confirmez que la progression vient du serveur. Le cache local permet de travailler hors ligne mais ne prouve pas une synchronisation distante.
- Vérifiez les journaux Vercel et l’usage du fournisseur PostgreSQL. Configurez sauvegardes, alertes et une politique de restauration adaptées à la valeur des données.

## Limites de fonctionnement

- Sans `DATABASE_URL`, l’API de santé est dégradée, l’authentification et la progression distante ne sont pas disponibles. L’application ne doit pas présenter une sauvegarde locale comme une synchronisation réussie.
- Le studio auteur requiert une session administrateur et une base préparée. Les brouillons sont conservés dans `learning_path_drafts`; les versions publiées et leur audit sont historisés.
- Les offres gratuites et leurs quotas changent. Consultez les pages officielles avant d’estimer un coût ou de promettre un niveau de disponibilité.

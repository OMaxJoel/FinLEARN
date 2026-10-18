# Guide de Déploiement Vercel, Base Persistante et Architecture 360°

## Plateforme FinExpert Immersion — Formations Professionnelles Certifiantes 360°

**Version :** 2.4.0  
**Date :** 18 octobre 2026  
**Cible :** Vercel (Hobby/Free) + Base PostgreSQL Serverless Persistante (Neon / Supabase)

---

## 1. Tableau d'Évaluation des Services, Quotas Gratuits et Limites Recommandées

| Service | Rôle dans l'Architecture | Quota de l'Offre Gratuite | Limites et Contraintes Connues | Stratégie d'Optimisation Retenue |
| :--- | :--- | :--- | :--- | :--- |
| **Vercel** (Hobby) | Hébergement Frontend SPA (Vite) + Serverless Functions (`/api/*`) | • 100 Go de bande passante / mois<br>• 100k requêtes serverless / jour<br>• Exécution max : 10s par requête | • Pas de persistance sur le système de fichiers éphémère<br>• Usage non-commercial strict sur plan Hobby | • Bundle scindé en chunks (`vendor`, `icons`)<br>• Cache immuable des assets (`Cache-Control: 1 an`)<br>• Debounce de sauvegarde (800ms) pour minimiser les invocations serverless. |
| **Neon PostgreSQL** *(Recommandé)* | Base de données relationnelle persistante (Progression, Inscriptions, Traçabilité) | • 0.5 Go de stockage persistant<br>• Compute serverless jusqu'à 300 heures/mois<br>• Connexions mutualisées (Pooling) | • Mise en veille du compute après 5 min d'inactivité (latence de démarrage à froid ~1-2s) | • Schéma relationnel optimisé avec index B-Tree<br>• Fallback de cache local immédiat en cas de réveil du compute. |
| **Supabase** *(Alternative)* | PostgreSQL managé + Authentification | • 500 Mo de base de données<br>• 50k utilisateurs actifs / mois<br>• 1 Go de stockage fichiers | • Pause automatique après 7 jours d'inactivité sur le plan Free | • Ping de santé hebdomadaire automatique via `/api/health`. |

---

## 2. Architecture Technique et Sécurité

```
   ┌─────────────────────────────────────────────────────────────┐
   │                       NAVIGATEUR APPRENANT                  │
   │  React 18 + Tailwind + Moteurs Déterministes + Cache Local   │
   └──────────────────────────────┬──────────────────────────────┘
                                  │ HTTPS (JSON / REST API)
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │                     VERCEL EDGE & SERVERLESS                │
   │  - /api/health   : Contrôle d'état et diagnostic            │
   │  - /api/progress : Persistance progression & activités      │
   │  - /api/paths    : Référentiel des parcours & modules       │
   │  - /api/author   : Studio Auteur & Contrôle de Complétude   │
   └──────────────────────────────┬──────────────────────────────┘
                                  │ SSL Pool Connection (DATABASE_URL)
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │             BASE DE DONNÉES POSTGRESQL (NEON / SUPABASE)    │
   │  Tables : users, learning_paths, user_path_enrollments,      │
   │           activity_progress, evaluation_submissions         │
   └─────────────────────────────────────────────────────────────┘
```

### 2.1 Sécurité des Secrets
- Aucun secret, mot de passe ou chaîne de connexion n'est exposé dans le code frontend ou le dépôt Git.
- Les variables avec préfixe `VITE_` sont publiques.
- La variable `DATABASE_URL` et `JWT_SECRET` sont exclusivement accessibles par les fonctions serveur Vercel dans `/api/*`.

---

## 3. Procédure Pas à Pas de Déploiement

### Étape 1 : Créer la Base de Données Persistante sur Neon (Gratuit)
1. Rendez-vous sur [neon.tech](https://neon.tech) et créez un compte gratuit.
2. Créez un nouveau projet nommé `finexpert-learning-db` dans la région la plus proche (ex : `eu-central-1` Francfort ou `eu-west-1` Irlande).
3. Copiez la chaîne de connexion PostgreSQL fournie (avec l'option `Pooled connection` activée) :
   ```
   postgresql://neondb_owner:VOTRE_MOT_DE_PASSE@ep-sample-pool-123456.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```
4. Ouvrez l'éditeur SQL de Neon et exécutez le script complet de migration situé dans le dépôt :
   `migrations/001_init_learning_system.sql`.
   Toutes les 7 tables relationnelles et leurs index sont créés en moins de 3 secondes.

### Étape 2 : Lier le Dépôt GitHub et Déployer sur Vercel
1. Poussez les modifications sur votre dépôt GitHub :
   ```bash
   git add .
   git commit -m "feat: Formations 360, progression persistante et configuration Vercel"
   git push origin main
   ```
2. Rendez-vous sur le tableau de bord [Vercel](https://vercel.com) et cliquez sur **Add New... > Project**.
3. Importez votre dépôt GitHub `Projet LEARN`.
4. Vercel détecte automatiquement le framework **Vite** et le dossier de build `dist`.
5. Dans la section **Environment Variables**, ajoutez les variables suivantes :
   - `DATABASE_URL` = La chaîne de connexion PostgreSQL de l'Étape 1.
   - `VERCEL_ENV` = `production`
   - `JWT_SECRET` = Une chaîne aléatoire sécurisée de 64 caractères.
6. Cliquez sur **Deploy**. Le build s'exécute (`npm run build`), transforme les 1619 modules et livre la version en ~25 secondes.

---

## 4. Validation et Contrôles Après Déploiement

Dès que Vercel génère votre URL de production (ex : `https://finexpert-immersion.vercel.app`) :
1. **Contrôle d'API Santé** :  
   Ouvrez `https://votre-app.vercel.app/api/health`  
   Attendu : Réponse JSON `{"status":"ok","version":"2.4.0","database":{"status":"connected"}}`.
2. **Contrôle du Catalogue** :  
   Ouvrez `https://votre-app.vercel.app/api/paths`  
   Attendu : Le parcours 360° `PATH_FIN_ANALYST_360` avec ses 10 niveaux est retourné.
3. **Contrôle du Cycle Apprenant** :
   - Cliquez sur « Démarrer le parcours 360° » sur la page d'accueil.
   - Réalisez un exercice guidé ou autonome.
   - Fermez l'onglet du navigateur, rouvrez-le : votre bouton devient « Reprendre le parcours » et vous ramène à la dernière activité exacte avec vos points enregistrés.

---

## 5. Procédures de Sauvegarde, Restauration et Plan de Secours

### Sauvegarde Quotidienne (pg_dump)
Neon et Supabase intègrent des sauvegardes automatiques à chaud avec Point-in-Time Recovery (PITR).
Pour effectuer un export manuel :
```bash
pg_dump "VOTRE_DATABASE_URL" -F c -b -v -f finexpert_backup_$(date +%Y%m%d).dump
```

### Restauration d'Urgence
```bash
pg_restore -d "VOTRE_DATABASE_URL" -v finexpert_backup_20261018.dump
```

### Procédure de Retour Arrière (Rollback) Vercel
En cas d'anomalie sur un nouveau déploiement, ouvrez l'onglet **Deployments** sur Vercel, repérez le déploiement antérieur certifié, cliquez sur les trois points `...` et sélectionnez **Instant Rollback**. Le trafic est réacheminé instantanément sans interruption de service.

-- ============================================================================
-- FINEXPERT IMMERSION 360° - SCHÉMA DE BASE DE DONNÉES RELATIONNELLE
-- Compatible PostgreSQL / Neon / Supabase / Vercel Postgres
-- Version : 1.0.0
-- ============================================================================

-- Extensions recommandées
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table des Utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(32) NOT NULL DEFAULT 'apprenant', -- 'apprenant', 'formateur', 'admin'
    career_goal VARCHAR(64) NOT NULL DEFAULT 'analyste_financier',
    experience_level VARCHAR(32) NOT NULL DEFAULT 'debutant',
    weekly_hours INT DEFAULT 5,
    total_xp INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table des Compétences Référentielles
CREATE TABLE IF NOT EXISTS competencies (
    code VARCHAR(32) PRIMARY KEY,
    domain VARCHAR(64) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    required_score_percent INT DEFAULT 75,
    sub_competencies JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Table des Parcours de Formation 360°
CREATE TABLE IF NOT EXISTS learning_paths (
    id VARCHAR(64) PRIMARY KEY,
    domain_id VARCHAR(64) NOT NULL,
    title VARCHAR(255) NOT NULL,
    tagline TEXT,
    description TEXT,
    target_role VARCHAR(128),
    level_badge VARCHAR(64),
    version VARCHAR(32) NOT NULL DEFAULT '1.0.0',
    status VARCHAR(32) NOT NULL DEFAULT 'published', -- 'draft', 'published', 'archived'
    estimated_hours INT DEFAULT 40,
    prerequisites JSONB DEFAULT '[]'::jsonb,
    competencies_targeted JSONB DEFAULT '[]'::jsonb,
    completeness_score INT DEFAULT 100,
    path_data JSONB NOT NULL, -- Structure complète des Niveaux/Modules/Chapitres/Leçons
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Inscriptions Utilisateur aux Parcours (Enrollments)
CREATE TABLE IF NOT EXISTS user_path_enrollments (
    id VARCHAR(96) PRIMARY KEY, -- Format: userId_pathId
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    path_id VARCHAR(64) NOT NULL REFERENCES learning_paths(id) ON DELETE CASCADE,
    path_version VARCHAR(32) NOT NULL DEFAULT '1.0.0',
    status VARCHAR(32) NOT NULL DEFAULT 'en_cours', -- 'en_cours', 'termine', 'suspendu'
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    current_activity_id VARCHAR(128) NOT NULL,
    current_location JSONB DEFAULT '{}'::jsonb,
    
    -- 4 Indicateurs distincts calculés et certifiés
    consultation_progress_percent NUMERIC(5,2) DEFAULT 0.00,
    practical_activities_progress_percent NUMERIC(5,2) DEFAULT 0.00,
    evaluation_score_percent NUMERIC(5,2) DEFAULT 0.00,
    competencies_mastery_percent NUMERIC(5,2) DEFAULT 0.00,
    
    validated_competency_codes JSONB DEFAULT '[]'::jsonb,
    total_time_spent_seconds INT DEFAULT 0,
    summary_payload JSONB DEFAULT '{}'::jsonb,
    
    CONSTRAINT uq_user_path UNIQUE(user_id, path_id)
);

-- 5. Suivi fin par Activité (Leçon, Exercice guidé, Exercice autonome, Simulateur, Mission, Quiz, Évaluation)
CREATE TABLE IF NOT EXISTS activity_progress (
    id VARCHAR(128) PRIMARY KEY, -- Format: userId_pathId_activityId
    enrollment_id VARCHAR(96) NOT NULL REFERENCES user_path_enrollments(id) ON DELETE CASCADE,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    path_id VARCHAR(64) NOT NULL,
    activity_id VARCHAR(128) NOT NULL,
    activity_type VARCHAR(32) NOT NULL,
    state VARCHAR(32) NOT NULL DEFAULT 'disponible', -- 'non_commencee', 'disponible', 'en_cours', 'en_attente_validation', 'terminee', 'a_reviser'
    consultation_done BOOLEAN DEFAULT FALSE,
    score NUMERIC(5,2) DEFAULT 0.00,
    max_score NUMERIC(5,2) DEFAULT 100.00,
    attempts INT DEFAULT 0,
    saved_state JSONB DEFAULT '{}'::jsonb,
    last_attempt_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    
    CONSTRAINT uq_activity_progress UNIQUE(user_id, path_id, activity_id)
);

-- 6. Historique des Évaluations Certifiantes et Projets de Synthèse
CREATE TABLE IF NOT EXISTS evaluation_submissions (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    enrollment_id VARCHAR(96) NOT NULL REFERENCES user_path_enrollments(id) ON DELETE CASCADE,
    evaluation_id VARCHAR(64) NOT NULL,
    score_obtained NUMERIC(5,2) NOT NULL,
    max_score NUMERIC(5,2) NOT NULL,
    score_percent NUMERIC(5,2) NOT NULL,
    passing_threshold_percent NUMERIC(5,2) NOT NULL,
    is_passed BOOLEAN NOT NULL,
    answers_payload JSONB NOT NULL,
    evaluator_feedback TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Audit Log du Studio Auteur (Versioning et Traçabilité)
CREATE TABLE IF NOT EXISTS content_audit_logs (
    id SERIAL PRIMARY KEY,
    path_id VARCHAR(64) NOT NULL,
    author_id VARCHAR(64) NOT NULL,
    action VARCHAR(64) NOT NULL, -- 'create_draft', 'update_lesson', 'publish_version', 'archive'
    version VARCHAR(32) NOT NULL,
    details TEXT,
    snapshot_meta JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour des requêtes analytiques et de reprise instantanées (<15ms)
CREATE INDEX IF NOT EXISTS idx_enrollment_user ON user_path_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollment_status ON user_path_enrollments(status);
CREATE INDEX IF NOT EXISTS idx_activity_enrollment ON activity_progress(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_activity_user_state ON activity_progress(user_id, state);
CREATE INDEX IF NOT EXISTS idx_eval_user ON evaluation_submissions(user_id, evaluation_id);

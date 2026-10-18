-- Migration additive : comptes à mot de passe et versions immuables des parcours.
-- À exécuter après 001_init_learning_system.sql. Aucun enregistrement apprenant n'est supprimé.

ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash TEXT;

CREATE TABLE IF NOT EXISTS learning_path_versions (
  path_id VARCHAR(64) NOT NULL REFERENCES learning_paths(id) ON DELETE RESTRICT,
  version VARCHAR(32) NOT NULL,
  status VARCHAR(32) NOT NULL,
  path_data JSONB NOT NULL,
  created_by VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (path_id, version)
);

CREATE INDEX IF NOT EXISTS idx_path_versions_created_at ON learning_path_versions(path_id, created_at DESC);

CREATE TABLE IF NOT EXISTS learning_path_drafts (
  path_id VARCHAR(64) PRIMARY KEY REFERENCES learning_paths(id) ON DELETE CASCADE,
  path_data JSONB NOT NULL,
  updated_by VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

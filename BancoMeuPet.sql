PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS usuarios (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT,
  criado_em TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS casas (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  imagem TEXT NOT NULL,
  admin_id TEXT NOT NULL,
  criado_em TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (admin_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pets (
  id TEXT PRIMARY KEY,
  casa_id TEXT NOT NULL,
  nome TEXT NOT NULL,
  imagem TEXT NOT NULL,
  tipo TEXT,
  raca TEXT,
  nascimento TEXT,
  criado_em TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (casa_id) REFERENCES casas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS metas (
  pet_id TEXT PRIMARY KEY,
  comida_meta INTEGER NOT NULL DEFAULT 3,
  comida_feita INTEGER NOT NULL DEFAULT 0,
  comida_periodo TEXT NOT NULL DEFAULT 'Diário',
  passeio_meta INTEGER NOT NULL DEFAULT 2,
  passeio_feita INTEGER NOT NULL DEFAULT 0,
  passeio_periodo TEXT NOT NULL DEFAULT 'Diário',
  curativo_meta INTEGER NOT NULL DEFAULT 0,
  curativo_feita INTEGER NOT NULL DEFAULT 0,
  curativo_periodo TEXT NOT NULL DEFAULT 'Mensal',
  vet_meta INTEGER NOT NULL DEFAULT 1,
  vet_feita INTEGER NOT NULL DEFAULT 0,
  vet_periodo TEXT NOT NULL DEFAULT 'Semestral',
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS agendamentos (
  id TEXT PRIMARY KEY,
  pet_id TEXT NOT NULL,
  compromisso TEXT NOT NULL,
  data TEXT NOT NULL,
  horario TEXT,
  observacao TEXT,
  criado_em TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

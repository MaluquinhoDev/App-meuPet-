import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('meupet.db');

const schemaSql = `
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS usuarios (id TEXT PRIMARY KEY, nome TEXT NOT NULL, email TEXT, criado_em TEXT NOT NULL DEFAULT (datetime('now')));
CREATE TABLE IF NOT EXISTS casas (id TEXT PRIMARY KEY, nome TEXT NOT NULL, imagem TEXT NOT NULL, admin_id TEXT NOT NULL, criado_em TEXT NOT NULL DEFAULT (datetime('now')), FOREIGN KEY (admin_id) REFERENCES usuarios(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS pets (id TEXT PRIMARY KEY, casa_id TEXT NOT NULL, nome TEXT NOT NULL, imagem TEXT NOT NULL, tipo TEXT, raca TEXT, nascimento TEXT, criado_em TEXT NOT NULL DEFAULT (datetime('now')), FOREIGN KEY (casa_id) REFERENCES casas(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS metas (pet_id TEXT PRIMARY KEY, comida_meta INTEGER NOT NULL DEFAULT 3, comida_feita INTEGER NOT NULL DEFAULT 0, comida_periodo TEXT NOT NULL DEFAULT 'Diário', passeio_meta INTEGER NOT NULL DEFAULT 2, passeio_feita INTEGER NOT NULL DEFAULT 0, passeio_periodo TEXT NOT NULL DEFAULT 'Diário', curativo_meta INTEGER NOT NULL DEFAULT 0, curativo_feita INTEGER NOT NULL DEFAULT 0, curativo_periodo TEXT NOT NULL DEFAULT 'Mensal', vet_meta INTEGER NOT NULL DEFAULT 1, vet_feita INTEGER NOT NULL DEFAULT 0, vet_periodo TEXT NOT NULL DEFAULT 'Semestral', FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS agendamentos (id TEXT PRIMARY KEY, pet_id TEXT NOT NULL, compromisso TEXT NOT NULL, data TEXT NOT NULL, horario TEXT, observacao TEXT, criado_em TEXT NOT NULL DEFAULT (datetime('now')), FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE);
`;

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export function initDatabase(usuarioAtual) {
  db.execSync(schemaSql);
  db.runSync('INSERT OR IGNORE INTO usuarios (id, nome) VALUES (?, ?)', [usuarioAtual.id, usuarioAtual.nome]);
  const count = db.getFirstSync('SELECT COUNT(*) as total FROM casas')?.total ?? 0;
  if (count === 0) {
    const casaId = uid();
    const petId = uid();
    db.runSync('INSERT INTO casas (id, nome, imagem, admin_id) VALUES (?, ?, ?, ?)', [casaId, 'Minha casa', 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=250&auto=format&fit=crop', usuarioAtual.id]);
    db.runSync('INSERT INTO pets (id, casa_id, nome, imagem) VALUES (?, ?, ?, ?)', [petId, casaId, 'Bolinha', 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=250&auto=format&fit=crop']);
  }
}

export const getCasas = () => db.getAllSync('SELECT id, nome, imagem, admin_id as adminId FROM casas ORDER BY criado_em DESC');
export const getPets = () => db.getAllSync('SELECT id, casa_id as casaId, nome, imagem, tipo, raca, nascimento FROM pets ORDER BY criado_em DESC');
export const getAgendamentos = () => db.getAllSync('SELECT id, pet_id as petId, compromisso, data, horario, observacao FROM agendamentos ORDER BY criado_em DESC');

export function addCasa({ nome, imagem, adminId }) {
  db.runSync('INSERT INTO casas (id, nome, imagem, admin_id) VALUES (?, ?, ?, ?)', [uid(), nome, imagem, adminId]);
}
export const deleteCasa = (id) => db.runSync('DELETE FROM casas WHERE id = ?', [id]);
export function addPet({ casaId, nome, imagem, tipo, raca, nascimento }) {
  db.runSync('INSERT INTO pets (id, casa_id, nome, imagem, tipo, raca, nascimento) VALUES (?, ?, ?, ?, ?, ?, ?)', [uid(), casaId, nome, imagem, tipo || null, raca || null, nascimento || null]);
}
export function addAgendamento({ petId, compromisso, data, horario, observacao }) {
  db.runSync('INSERT INTO agendamentos (id, pet_id, compromisso, data, horario, observacao) VALUES (?, ?, ?, ?, ?, ?)', [uid(), petId, compromisso, data, horario || null, observacao || null]);
}

export const getMetas = () => db.getAllSync('SELECT pet_id as petId, comida_meta as comidaMeta, comida_feita as comidaFeita, comida_periodo as comidaPeriodo, passeio_meta as passeioMeta, passeio_feita as passeioFeita, passeio_periodo as passeioPeriodo, curativo_meta as curativoMeta, curativo_feita as curativoFeita, curativo_periodo as curativoPeriodo, vet_meta as vetMeta, vet_feita as vetFeita, vet_periodo as vetPeriodo FROM metas');

export function upsertMeta(meta) {
  db.runSync(`INSERT INTO metas (pet_id, comida_meta, comida_feita, comida_periodo, passeio_meta, passeio_feita, passeio_periodo, curativo_meta, curativo_feita, curativo_periodo, vet_meta, vet_feita, vet_periodo)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(pet_id) DO UPDATE SET
    comida_meta=excluded.comida_meta, comida_feita=excluded.comida_feita, comida_periodo=excluded.comida_periodo,
    passeio_meta=excluded.passeio_meta, passeio_feita=excluded.passeio_feita, passeio_periodo=excluded.passeio_periodo,
    curativo_meta=excluded.curativo_meta, curativo_feita=excluded.curativo_feita, curativo_periodo=excluded.curativo_periodo,
    vet_meta=excluded.vet_meta, vet_feita=excluded.vet_feita, vet_periodo=excluded.vet_periodo`,
    [meta.petId, meta.comidaMeta, meta.comidaFeita, meta.comidaPeriodo, meta.passeioMeta, meta.passeioFeita, meta.passeioPeriodo, meta.curativoMeta, meta.curativoFeita, meta.curativoPeriodo, meta.vetMeta, meta.vetFeita, meta.vetPeriodo]
  );
}

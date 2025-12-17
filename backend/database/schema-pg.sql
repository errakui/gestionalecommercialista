-- ============================================
-- SCHEMA DATABASE GESTIONALE STUDIO (PostgreSQL)
-- ============================================

-- Tabella Utenti
CREATE TABLE IF NOT EXISTS tb_utenti (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  nome TEXT,
  email TEXT,
  ruolo TEXT DEFAULT 'user',
  attivo INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella Impostazioni
CREATE TABLE IF NOT EXISTS tb_impostazioni (
  id INTEGER PRIMARY KEY DEFAULT 1,
  iva REAL DEFAULT 0.22,
  ritenuta REAL DEFAULT 0.20,
  cassa REAL DEFAULT 0.04,
  studio_nome TEXT DEFAULT 'Studio Professionale',
  studio_indirizzo TEXT,
  studio_citta TEXT,
  studio_piva TEXT,
  studio_email TEXT,
  studio_telefono TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella Centri di Costo
CREATE TABLE IF NOT EXISTS tb_centri_di_costo (
  id SERIAL PRIMARY KEY,
  codice TEXT NOT NULL UNIQUE,
  nome TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella Servizi
CREATE TABLE IF NOT EXISTS tb_servizi (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  importo_std REAL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella Clienti
CREATE TABLE IF NOT EXISTS tb_clienti (
  id SERIAL PRIMARY KEY,
  ragsoc TEXT NOT NULL,
  referente TEXT,
  email TEXT,
  telefono TEXT,
  piva TEXT,
  cf TEXT,
  indirizzo TEXT,
  cap TEXT,
  citta TEXT,
  prov TEXT,
  tipo_contabilita TEXT DEFAULT 'Ordinaria',
  iva REAL DEFAULT 0.22,
  rit REAL DEFAULT 0.20,
  cassa REAL DEFAULT 0.04,
  stato TEXT DEFAULT 'attivo',
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella Contratti
CREATE TABLE IF NOT EXISTS tb_contratti (
  id SERIAL PRIMARY KEY,
  id_cliente INTEGER NOT NULL,
  cod_contr TEXT NOT NULL UNIQUE,
  anno INTEGER NOT NULL,
  descrizione TEXT,
  stato TEXT DEFAULT 'attivo',
  importo REAL DEFAULT 0,
  iva REAL DEFAULT 0.22,
  rit REAL DEFAULT 0.20,
  cassa REAL DEFAULT 0.04,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_cliente) REFERENCES tb_clienti(id) ON DELETE CASCADE
);

-- Tabella Incassi
CREATE TABLE IF NOT EXISTS tb_incassi (
  id SERIAL PRIMARY KEY,
  id_contratto INTEGER NOT NULL,
  data DATE NOT NULL,
  importo_inc REAL NOT NULL,
  importo REAL NOT NULL,
  stato TEXT DEFAULT 'da fatt',
  note TEXT,
  modalita TEXT DEFAULT 'Bonifico',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_contratto) REFERENCES tb_contratti(id) ON DELETE CASCADE
);

-- Tabella Costi Studio
CREATE TABLE IF NOT EXISTS tb_costi_studio (
  id SERIAL PRIMARY KEY,
  id_cdc INTEGER NOT NULL,
  costo REAL NOT NULL,
  note TEXT,
  data DATE NOT NULL,
  stato TEXT DEFAULT 'pagato',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_cdc) REFERENCES tb_centri_di_costo(id)
);

-- Tabella Costi Altri
CREATE TABLE IF NOT EXISTS tb_costi_altri (
  id SERIAL PRIMARY KEY,
  id_contratto INTEGER NOT NULL,
  descrizione TEXT NOT NULL,
  importo REAL NOT NULL,
  addebito_cliente INTEGER DEFAULT 1,
  data DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_contratto) REFERENCES tb_contratti(id) ON DELETE CASCADE
);

-- Indici
CREATE INDEX IF NOT EXISTS idx_utenti_username ON tb_utenti(username);
CREATE INDEX IF NOT EXISTS idx_contratti_cliente ON tb_contratti(id_cliente);
CREATE INDEX IF NOT EXISTS idx_incassi_contratto ON tb_incassi(id_contratto);
CREATE INDEX IF NOT EXISTS idx_incassi_stato ON tb_incassi(stato);
CREATE INDEX IF NOT EXISTS idx_incassi_data ON tb_incassi(data);
CREATE INDEX IF NOT EXISTS idx_costi_studio_cdc ON tb_costi_studio(id_cdc);
CREATE INDEX IF NOT EXISTS idx_costi_altri_contratto ON tb_costi_altri(id_contratto);


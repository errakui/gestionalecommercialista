// ============================================
// INSERIMENTO DATI DI ESEMPIO
// Compatibile con SQLite e PostgreSQL
// ============================================

const bcrypt = require('bcryptjs');
const { db, dbType } = require('./db');

// Funzione helper per ottenere il tipo di database
const getDbType = () => {
  // Re-importa per ottenere il valore corrente
  const { dbType: currentType } = require('./db');
  return currentType;
};

const insertOtherData = () => {
  const defaultPassword = bcrypt.hashSync('admin123', 10);
  const currentDbType = getDbType();
  
  // Utente admin
  if (currentDbType === 'postgres') {
    db.run(`INSERT INTO tb_utenti (id, username, password, nome, email, ruolo) VALUES
      (1, 'admin', $1, 'Amministratore', 'admin@studio.it', 'admin')
      ON CONFLICT (id) DO NOTHING`, [defaultPassword], () => {
      console.log('✅ Utente admin creato');
      insertClienti();
    });
  } else {
    db.run(`INSERT OR IGNORE INTO tb_utenti (id, username, password, nome, email, ruolo) VALUES
      (1, 'admin', ?, 'Amministratore', 'admin@studio.it', 'admin')`, [defaultPassword], () => {
      console.log('✅ Utente admin creato');
      insertClienti();
    });
  }
};

const insertClienti = () => {
  const currentDbType = getDbType();
  const query = currentDbType === 'postgres'
    ? `INSERT INTO tb_clienti (id, ragsoc, referente, email, telefono, piva, cf, indirizzo, cap, citta, prov, tipo_contabilita, iva, rit, cassa, stato, note) VALUES
      (1, 'Rossi Mario SRL', 'Mario Rossi', 'mario@rossi.it', '333 1234567', 'IT11111111111', 'RSSMRA80A01F205X', 'Via Verdi 10', '20100', 'Milano', 'MI', 'Ordinaria', 0.22, 0.20, 0.04, 'attivo', 'Cliente storico dal 2018'),
      (2, 'Bianchi Luca', 'Luca Bianchi', 'luca@bianchi.it', '339 7654321', 'IT22222222222', 'BNCLCU85B02F205Y', 'Corso Italia 5', '20121', 'Milano', 'MI', 'Forfettaria', 0, 0, 0.04, 'attivo', 'Regime forfettario'),
      (3, 'Verdi & Associati', 'Anna Verdi', 'anna@verdi.it', '02 9876543', 'IT33333333333', 'VRDNNA75C03F205Z', 'Piazza Duomo 1', '20122', 'Milano', 'MI', 'Ordinaria', 0.22, 0.20, 0.04, 'attivo', '')
      ON CONFLICT (id) DO NOTHING`
    : `INSERT OR IGNORE INTO tb_clienti (id, ragsoc, referente, email, telefono, piva, cf, indirizzo, cap, citta, prov, tipo_contabilita, iva, rit, cassa, stato, note) VALUES
      (1, 'Rossi Mario SRL', 'Mario Rossi', 'mario@rossi.it', '333 1234567', 'IT11111111111', 'RSSMRA80A01F205X', 'Via Verdi 10', '20100', 'Milano', 'MI', 'Ordinaria', 0.22, 0.20, 0.04, 'attivo', 'Cliente storico dal 2018'),
      (2, 'Bianchi Luca', 'Luca Bianchi', 'luca@bianchi.it', '339 7654321', 'IT22222222222', 'BNCLCU85B02F205Y', 'Corso Italia 5', '20121', 'Milano', 'MI', 'Forfettaria', 0, 0, 0.04, 'attivo', 'Regime forfettario'),
      (3, 'Verdi & Associati', 'Anna Verdi', 'anna@verdi.it', '02 9876543', 'IT33333333333', 'VRDNNA75C03F205Z', 'Piazza Duomo 1', '20122', 'Milano', 'MI', 'Ordinaria', 0.22, 0.20, 0.04, 'attivo', '')`;
  
  db.run(query, [], () => insertContratti());
};

const insertContratti = () => {
  const currentDbType = getDbType();
  const query = currentDbType === 'postgres'
    ? `INSERT INTO tb_contratti (id, id_cliente, cod_contr, anno, descrizione, stato, importo, iva, rit, cassa) VALUES
      (1, 1, '2024-001', 2024, 'Incarico 2024', 'attivo', 3600, 0.22, 0.20, 0.04),
      (2, 2, '2024-002', 2024, 'Incarico 2024', 'attivo', 1200, 0, 0, 0.04),
      (3, 3, '2024-003', 2024, 'Incarico 2024', 'attivo', 4800, 0.22, 0.20, 0.04)
      ON CONFLICT (id) DO NOTHING`
    : `INSERT OR IGNORE INTO tb_contratti (id, id_cliente, cod_contr, anno, descrizione, stato, importo, iva, rit, cassa) VALUES
      (1, 1, '2024-001', 2024, 'Incarico 2024', 'attivo', 3600, 0.22, 0.20, 0.04),
      (2, 2, '2024-002', 2024, 'Incarico 2024', 'attivo', 1200, 0, 0, 0.04),
      (3, 3, '2024-003', 2024, 'Incarico 2024', 'attivo', 4800, 0.22, 0.20, 0.04)`;
  
  db.run(query, [], () => insertIncassi());
};

const insertIncassi = () => {
  const currentDbType = getDbType();
  const query = currentDbType === 'postgres'
    ? `INSERT INTO tb_incassi (id, id_contratto, data, importo_inc, importo, stato, note, modalita) VALUES
      (1, 1, '2024-01-15', 320.51, 300, 'fatturato', 'RID gennaio', 'RID'),
      (2, 1, '2024-02-15', 320.51, 300, 'fatturato', 'RID febbraio', 'RID'),
      (3, 1, '2024-03-15', 320.51, 300, 'da fatt', 'RID marzo', 'RID'),
      (4, 2, '2024-01-20', 104, 100, 'fatturato', 'Bonifico', 'Bonifico'),
      (5, 2, '2024-02-20', 104, 100, 'fatturato', 'Bonifico', 'Bonifico'),
      (6, 3, '2024-01-10', 427.35, 400, 'fatturato', 'RID', 'RID'),
      (7, 3, '2024-02-10', 427.35, 400, 'fatturato', 'RID', 'RID'),
      (8, 3, '2024-03-10', 427.35, 400, 'da fatt', 'RID', 'RID')
      ON CONFLICT (id) DO NOTHING`
    : `INSERT OR IGNORE INTO tb_incassi (id, id_contratto, data, importo_inc, importo, stato, note, modalita) VALUES
      (1, 1, '2024-01-15', 320.51, 300, 'fatturato', 'RID gennaio', 'RID'),
      (2, 1, '2024-02-15', 320.51, 300, 'fatturato', 'RID febbraio', 'RID'),
      (3, 1, '2024-03-15', 320.51, 300, 'da fatt', 'RID marzo', 'RID'),
      (4, 2, '2024-01-20', 104, 100, 'fatturato', 'Bonifico', 'Bonifico'),
      (5, 2, '2024-02-20', 104, 100, 'fatturato', 'Bonifico', 'Bonifico'),
      (6, 3, '2024-01-10', 427.35, 400, 'fatturato', 'RID', 'RID'),
      (7, 3, '2024-02-10', 427.35, 400, 'fatturato', 'RID', 'RID'),
      (8, 3, '2024-03-10', 427.35, 400, 'da fatt', 'RID', 'RID')`;
  
  db.run(query, [], () => insertCosti());
};

const insertCosti = () => {
  const currentDbType = getDbType();
  const query = currentDbType === 'postgres'
    ? `INSERT INTO tb_costi_studio (id, id_cdc, costo, note, data, stato) VALUES
      (1, 1, 150, 'Licenza software', '2024-01-15', 'pagato'),
      (2, 2, 80, 'Telefono gennaio', '2024-01-31', 'pagato'),
      (3, 6, 200, 'Hosting annuale', '2024-01-05', 'pagato'),
      (4, 4, 2500, 'Stipendio collaboratore', '2024-01-28', 'pagato'),
      (5, 1, 150, 'Licenza software', '2024-02-15', 'pagato'),
      (6, 2, 85, 'Telefono febbraio', '2024-02-28', 'pagato')
      ON CONFLICT (id) DO NOTHING`
    : `INSERT OR IGNORE INTO tb_costi_studio (id, id_cdc, costo, note, data, stato) VALUES
      (1, 1, 150, 'Licenza software', '2024-01-15', 'pagato'),
      (2, 2, 80, 'Telefono gennaio', '2024-01-31', 'pagato'),
      (3, 6, 200, 'Hosting annuale', '2024-01-05', 'pagato'),
      (4, 4, 2500, 'Stipendio collaboratore', '2024-01-28', 'pagato'),
      (5, 1, 150, 'Licenza software', '2024-02-15', 'pagato'),
      (6, 2, 85, 'Telefono febbraio', '2024-02-28', 'pagato')`;
  
  db.run(query, [], () => insertCostiAltri());
};

const insertCostiAltri = () => {
  const currentDbType = getDbType();
  const query = currentDbType === 'postgres'
    ? `INSERT INTO tb_costi_altri (id, id_contratto, descrizione, importo, addebito_cliente, data) VALUES
      (1, 1, 'Rinnovo PEC', 25, 1, '2024-02-10'),
      (2, 3, 'Visura CCIAA', 15, 1, '2024-01-20')
      ON CONFLICT (id) DO NOTHING`
    : `INSERT OR IGNORE INTO tb_costi_altri (id, id_contratto, descrizione, importo, addebito_cliente, data) VALUES
      (1, 1, 'Rinnovo PEC', 25, 1, '2024-02-10'),
      (2, 3, 'Visura CCIAA', 15, 1, '2024-01-20')`;
  
  db.run(query, [], () => insertImpostazioni());
};

const insertImpostazioni = () => {
  const currentDbType = getDbType();
  const query = currentDbType === 'postgres'
    ? `INSERT INTO tb_impostazioni (id, iva, ritenuta, cassa, studio_nome, studio_indirizzo, studio_citta, studio_piva, studio_email, studio_telefono) VALUES
      (1, 0.22, 0.20, 0.04, 'Studio Professionale', 'Via Roma 1', 'Milano', 'IT12345678901', 'info@studio.it', '02 1234567')
      ON CONFLICT (id) DO NOTHING`
    : `INSERT OR IGNORE INTO tb_impostazioni (id, iva, ritenuta, cassa, studio_nome, studio_indirizzo, studio_citta, studio_piva, studio_email, studio_telefono) VALUES
      (1, 0.22, 0.20, 0.04, 'Studio Professionale', 'Via Roma 1', 'Milano', 'IT12345678901', 'info@studio.it', '02 1234567')`;
  
  db.run(query, [], () => {
    if (currentDbType === 'postgres') {
      // Resetta le sequenze PostgreSQL dopo l'inserimento dei dati
      resetSequences();
    } else {
      console.log('✅ Dati di esempio inseriti');
    }
  });
};

const resetSequences = () => {
  const currentDbType = getDbType();
  if (currentDbType !== 'postgres') return;
  
  // Resetta tutte le sequenze PostgreSQL al valore massimo + 1
  const sequences = [
    'tb_utenti_id_seq',
    'tb_clienti_id_seq',
    'tb_contratti_id_seq',
    'tb_incassi_id_seq',
    'tb_costi_studio_id_seq',
    'tb_costi_altri_id_seq',
    'tb_impostazioni_id_seq',
    'tb_centri_di_costo_id_seq',
    'tb_servizi_id_seq'
  ];
  
  let seqIndex = 0;
  const resetNext = () => {
    if (seqIndex >= sequences.length) {
      console.log('✅ Dati di esempio inseriti');
      return;
    }
    
    const seqName = sequences[seqIndex];
    const tableName = seqName.replace('_id_seq', '');
    
    // Trova il max ID e imposta la sequenza
    db.get(`SELECT COALESCE(MAX(id), 0) as max_id FROM ${tableName}`, [], (err, row) => {
      if (err) {
        console.error(`Errore reset sequenza ${seqName}:`, err.message);
        seqIndex++;
        resetNext();
        return;
      }
      
      const nextVal = (row.max_id || 0) + 1;
      db.run(`SELECT setval('${seqName}', ${nextVal}, false)`, [], (err) => {
        if (err) {
          console.error(`Errore setval ${seqName}:`, err.message);
        }
        seqIndex++;
        resetNext();
      });
    });
  };
  
  resetNext();
};

module.exports = { insertOtherData };


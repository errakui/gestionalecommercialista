const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { db, dbType } = require('./db');

// Carica schema appropriato
const schemaPath = dbType === 'postgres' 
  ? path.join(__dirname, 'schema-pg.sql')
  : path.join(__dirname, 'schema.sql');

// Leggi e esegui schema
const schema = fs.readFileSync(schemaPath, 'utf8');

// Per PostgreSQL, esegui query una alla volta
if (dbType === 'postgres') {
  const queries = schema.split(';').filter(q => q.trim().length > 0);
  let queryIndex = 0;
  
  const executeNext = () => {
    if (queryIndex >= queries.length) {
      console.log('✅ Schema database creato');
      insertSampleData();
      return;
    }
    
    db.run(queries[queryIndex] + ';', [], (err) => {
      if (err && !err.message.includes('already exists')) {
        console.error('Errore query:', queries[queryIndex].substring(0, 50), err.message);
      }
      queryIndex++;
      executeNext();
    });
  };
  
  executeNext();
} else {
  // SQLite - esegui tutto insieme
  db.exec(schema, (err) => {
    if (err) {
      console.error('Errore creazione schema:', err.message);
    } else {
      console.log('✅ Schema database creato');
      insertSampleData();
    }
  });
}

// Inserisci dati di esempio
const { insertOtherData } = require('./init-data');

const insertSampleData = () => {
  insertOtherData();
};

// Funzione per resettare sequenze PostgreSQL (utile se database già popolato)
const resetSequences = () => {
  if (dbType !== 'postgres') return;
  
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
      console.log('✅ Sequenze PostgreSQL resettate');
      return;
    }
    
    const seqName = sequences[seqIndex];
    const tableName = seqName.replace('_id_seq', '');
    
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

// Resetta sequenze dopo un breve delay (per database già popolato)
if (dbType === 'postgres') {
  setTimeout(() => {
    resetSequences();
  }, 2000);
}

module.exports = db;


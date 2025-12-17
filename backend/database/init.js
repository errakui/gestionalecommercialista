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

module.exports = db;


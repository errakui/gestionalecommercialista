// ============================================
// DATABASE ADAPTER - Supporta SQLite e PostgreSQL
// ============================================

let db;
let dbType = 'sqlite';

// Verifica se c'è DATABASE_URL (PostgreSQL) o usa SQLite
if (process.env.DATABASE_URL) {
  // PostgreSQL
  const { Pool } = require('pg');
  dbType = 'postgres';
  
  // Koyeb PostgreSQL richiede SSL ma il certificato non corrisponde all'hostname
  // Disabilita verifica certificato SSL per database Koyeb
  const connectionString = process.env.DATABASE_URL;
  const isKoyebDB = connectionString && (
    connectionString.includes('.pg.koyeb.app') || 
    connectionString.includes('.koyeb.app') ||
    connectionString.includes('eu-central-1.pg.koyeb') ||
    connectionString.includes('ep-bold-sound')
  );
  
  // Per database Koyeb, forza SSL senza verifica certificato
  const pool = new Pool({
    connectionString: connectionString,
    ssl: isKoyebDB ? { 
      rejectUnauthorized: false,
      require: true 
    } : (connectionString.includes('sslmode=require') ? { rejectUnauthorized: false } : false)
  });
  
  // Disabilita verifica TLS a livello Node.js per database Koyeb (se necessario)
  if (isKoyebDB) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  }

  // Wrapper per compatibilità con SQLite
  db = {
    get: (query, params, callback) => {
      // Converti ? in $1, $2, etc per PostgreSQL
      let pgQuery = query;
      if (params && params.length > 0) {
        let paramIndex = 1;
        pgQuery = query.replace(/\?/g, () => `$${paramIndex++}`);
      }
      
      pool.query(pgQuery, params || [])
        .then(result => {
          if (callback) callback(null, result.rows[0] || null);
        })
        .catch(err => {
          if (callback) callback(err);
        });
    },
    all: (query, params, callback) => {
      // Converti ? in $1, $2, etc per PostgreSQL
      let pgQuery = query;
      if (params && params.length > 0) {
        let paramIndex = 1;
        pgQuery = query.replace(/\?/g, () => `$${paramIndex++}`);
      }
      
      pool.query(pgQuery, params || [])
        .then(result => {
          if (callback) callback(null, result.rows);
        })
        .catch(err => {
          if (callback) callback(err);
        });
    },
    run: (query, params, callback) => {
      // Converti ? in $1, $2, etc per PostgreSQL
      let pgQuery = query;
      if (params && params.length > 0) {
        let paramIndex = 1;
        pgQuery = query.replace(/\?/g, () => `$${paramIndex++}`);
      }
      
      pool.query(pgQuery, params || [])
        .then(result => {
          const mockThis = {
            lastID: result.rows[0]?.id || result.insertId,
            changes: result.rowCount || 0
          };
          if (callback) callback.call(mockThis, null);
        })
        .catch(err => {
          if (callback) callback(err);
        });
    },
    exec: (query, callback) => {
      pool.query(query)
        .then(() => {
          if (callback) callback(null);
        })
        .catch(err => {
          if (callback) callback(err);
        });
    }
  };
  
  console.log('✅ Database PostgreSQL connesso');
} else {
  // SQLite (locale)
  const sqlite3 = require('sqlite3').verbose();
  const path = require('path');
  const dbPath = path.join(__dirname, 'gestionale.db');
  
  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Errore apertura database:', err.message);
    } else {
      console.log('✅ Database SQLite connesso');
    }
  });
}

module.exports = { db, dbType };


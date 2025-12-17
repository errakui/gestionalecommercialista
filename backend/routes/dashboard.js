const express = require('express');
const router = express.Router();
const { db } = require('../database/db');

// GET statistiche dashboard
router.get('/stats', (req, res) => {
  const stats = {};

  // Totale incassi
  db.get('SELECT SUM(importo) as totale FROM tb_incassi', [], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    stats.totIncassi = row.totale || 0;

    // Da fatturare
    db.get('SELECT SUM(importo) as totale FROM tb_incassi WHERE stato = ?', ['da fatt'], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      stats.totDaFatturare = row.totale || 0;

      // Totale costi
      db.get('SELECT SUM(costo) as totale FROM tb_costi_studio', [], (err, row) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        stats.totCosti = row.totale || 0;

        // Clienti attivi
        db.get('SELECT COUNT(*) as totale FROM tb_clienti WHERE stato = ?', ['attivo'], (err, row) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          stats.clientiAttivi = row.totale || 0;

          res.json(stats);
        });
      });
    });
  });
});

// GET incassi per mese
router.get('/incassi-mese', (req, res) => {
  db.all(`
    SELECT 
      strftime('%m', data) as mese_num,
      strftime('%Y-%m', data) as mese_key,
      SUM(importo) as totale
    FROM tb_incassi
    GROUP BY strftime('%Y-%m', data)
    ORDER BY mese_key
  `, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// GET costi per categoria
router.get('/costi-categoria', (req, res) => {
  db.all(`
    SELECT 
      cdc.nome as categoria,
      SUM(cs.costo) as totale
    FROM tb_costi_studio cs
    LEFT JOIN tb_centri_di_costo cdc ON cs.id_cdc = cdc.id
    GROUP BY cdc.id, cdc.nome
    ORDER BY totale DESC
  `, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// GET ultimi incassi
router.get('/ultimi-incassi', (req, res) => {
  db.all(`
    SELECT i.*, 
           c.cod_contr, c.id_cliente,
           cl.ragsoc as cliente_nome
    FROM tb_incassi i
    LEFT JOIN tb_contratti c ON i.id_contratto = c.id
    LEFT JOIN tb_clienti cl ON c.id_cliente = cl.id
    ORDER BY i.data DESC, i.id DESC
    LIMIT 5
  `, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

module.exports = router;


const express = require('express');
const router = express.Router();
const { db } = require('../database/db');

// GET tutti i clienti
router.get('/', (req, res) => {
  db.all(`
    SELECT *, tipo_contabilita as tipoContabilita 
    FROM tb_clienti 
    ORDER BY ragsoc
  `, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// GET cliente per ID
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM tb_clienti WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Cliente non trovato' });
      return;
    }
    res.json(row);
  });
});

// POST nuovo cliente
router.post('/', (req, res) => {
  const {
    ragsoc, referente, email, telefono, piva, cf,
    indirizzo, cap, citta, prov, tipoContabilita,
    iva, rit, cassa, stato, note
  } = req.body;

  db.run(
    `INSERT INTO tb_clienti (ragsoc, referente, email, telefono, piva, cf, indirizzo, cap, citta, prov, tipo_contabilita, iva, rit, cassa, stato, note)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [ragsoc, referente, email, telefono, piva, cf, indirizzo, cap, citta, prov, tipoContabilita, iva, rit, cassa, stato, note],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, ...req.body });
    }
  );
});

// PUT aggiorna cliente
router.put('/:id', (req, res) => {
  const {
    ragsoc, referente, email, telefono, piva, cf,
    indirizzo, cap, citta, prov, tipoContabilita,
    iva, rit, cassa, stato, note
  } = req.body;

  db.run(
    `UPDATE tb_clienti SET 
      ragsoc = ?, referente = ?, email = ?, telefono = ?, piva = ?, cf = ?,
      indirizzo = ?, cap = ?, citta = ?, prov = ?, tipo_contabilita = ?,
      iva = ?, rit = ?, cassa = ?, stato = ?, note = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [ragsoc, referente, email, telefono, piva, cf, indirizzo, cap, citta, prov, tipoContabilita, iva, rit, cassa, stato, note, req.params.id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: req.params.id, ...req.body });
    }
  );
});

// DELETE cliente
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM tb_clienti WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Cliente eliminato', changes: this.changes });
  });
});

module.exports = router;


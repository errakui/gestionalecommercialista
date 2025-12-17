const express = require('express');
const router = express.Router();
const { db } = require('../database/db');

// GET tutti i contratti
router.get('/', (req, res) => {
  db.all(`
    SELECT c.*, c.id_cliente as idCliente, c.cod_contr as codContr, cl.ragsoc as cliente_nome
    FROM tb_contratti c
    LEFT JOIN tb_clienti cl ON c.id_cliente = cl.id
    ORDER BY c.anno DESC, c.cod_contr
  `, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// GET contratto per ID
router.get('/:id', (req, res) => {
  db.get(`
    SELECT c.*, cl.ragsoc as cliente_nome
    FROM tb_contratti c
    LEFT JOIN tb_clienti cl ON c.id_cliente = cl.id
    WHERE c.id = ?
  `, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Contratto non trovato' });
      return;
    }
    res.json(row);
  });
});

// POST nuovo contratto
router.post('/', (req, res) => {
  const { idCliente, anno, descrizione, importo, iva, rit, cassa } = req.body;

  // Genera codice contratto
  db.get('SELECT COUNT(*) as count FROM tb_contratti WHERE anno = ?', [anno], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const newId = (row.count || 0) + 1;
    const codContr = `${anno}-${String(newId).padStart(3, '0')}`;

    db.run(
      `INSERT INTO tb_contratti (id_cliente, cod_contr, anno, descrizione, stato, importo, iva, rit, cassa)
       VALUES (?, ?, ?, ?, 'attivo', ?, ?, ?, ?)`,
      [idCliente, codContr, anno, descrizione, importo, iva, rit, cassa],
      function(err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ id: this.lastID, codContr, ...req.body, stato: 'attivo' });
      }
    );
  });
});

// PUT aggiorna contratto
router.put('/:id', (req, res) => {
  const { descrizione, stato, importo, iva, rit, cassa } = req.body;

  db.run(
    `UPDATE tb_contratti SET 
      descrizione = ?, stato = ?, importo = ?, iva = ?, rit = ?, cassa = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [descrizione, stato, importo, iva, rit, cassa, req.params.id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: req.params.id, ...req.body });
    }
  );
});

// DELETE contratto
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM tb_contratti WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Contratto eliminato', changes: this.changes });
  });
});

module.exports = router;


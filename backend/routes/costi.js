const express = require('express');
const router = express.Router();
const { db } = require('../database/db');

// GET tutti i costi studio
router.get('/studio', (req, res) => {
  db.all(`
    SELECT cs.*, cs.id_cdc as idCdc, cdc.nome as categoria_nome, cdc.codice
    FROM tb_costi_studio cs
    LEFT JOIN tb_centri_di_costo cdc ON cs.id_cdc = cdc.id
    ORDER BY cs.data DESC
  `, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// POST nuovo costo studio
router.post('/studio', (req, res) => {
  const { idCdc, costo, note, data, stato } = req.body;

  db.run(
    `INSERT INTO tb_costi_studio (id_cdc, costo, note, data, stato)
     VALUES (?, ?, ?, ?, ?)`,
    [idCdc, costo, note, data, stato],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, ...req.body });
    }
  );
});

// PUT aggiorna costo studio
router.put('/studio/:id', (req, res) => {
  const { idCdc, costo, note, data, stato } = req.body;

  db.run(
    `UPDATE tb_costi_studio SET 
      id_cdc = ?, costo = ?, note = ?, data = ?, stato = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [idCdc, costo, note, data, stato, req.params.id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: req.params.id, ...req.body });
    }
  );
});

// DELETE costo studio
router.delete('/studio/:id', (req, res) => {
  db.run('DELETE FROM tb_costi_studio WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Costo eliminato', changes: this.changes });
  });
});

// GET tutti i costi altri
router.get('/altri', (req, res) => {
  db.all(`
    SELECT ca.*, c.cod_contr, c.id_cliente, cl.ragsoc as cliente_nome
    FROM tb_costi_altri ca
    LEFT JOIN tb_contratti c ON ca.id_contratto = c.id
    LEFT JOIN tb_clienti cl ON c.id_cliente = cl.id
    ORDER BY ca.data DESC
  `, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// POST nuovo costo altro
router.post('/altri', (req, res) => {
  const { idContratto, descrizione, importo, addebitoCliente, data } = req.body;

  db.run(
    `INSERT INTO tb_costi_altri (id_contratto, descrizione, importo, addebito_cliente, data)
     VALUES (?, ?, ?, ?, ?)`,
    [idContratto, descrizione, importo, addebitoCliente ? 1 : 0, data],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, ...req.body });
    }
  );
});

// DELETE costo altro
router.delete('/altri/:id', (req, res) => {
  db.run('DELETE FROM tb_costi_altri WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Costo eliminato', changes: this.changes });
  });
});

module.exports = router;


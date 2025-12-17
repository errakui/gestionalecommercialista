const express = require('express');
const router = express.Router();
const { db } = require('../database/db');
const { calcCoeff, lordoToImponibile } = require('../utils/calculations');

// GET tutti gli incassi
router.get('/', (req, res) => {
  db.all(`
    SELECT i.*, 
           i.id_contratto as idContratto, i.importo_inc as importoInc,
           c.cod_contr as codContr, c.id_cliente as idCliente,
           cl.ragsoc as cliente_nome
    FROM tb_incassi i
    LEFT JOIN tb_contratti c ON i.id_contratto = c.id
    LEFT JOIN tb_clienti cl ON c.id_cliente = cl.id
    ORDER BY i.data DESC
  `, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// GET incasso per ID
router.get('/:id', (req, res) => {
  db.get(`
    SELECT i.*, 
           c.cod_contr, c.id_cliente,
           cl.ragsoc as cliente_nome
    FROM tb_incassi i
    LEFT JOIN tb_contratti c ON i.id_contratto = c.id
    LEFT JOIN tb_clienti cl ON c.id_cliente = cl.id
    WHERE i.id = ?
  `, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Incasso non trovato' });
      return;
    }
    res.json(row);
  });
});

// POST nuovo incasso
router.post('/', (req, res) => {
  const { idContratto, data, importoInc, stato, note, modalita } = req.body;

  // Recupera aliquote dal contratto
  db.get('SELECT iva, rit, cassa FROM tb_contratti WHERE id = ?', [idContratto], (err, contratto) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!contratto) {
      res.status(404).json({ error: 'Contratto non trovato' });
      return;
    }

    // Calcola imponibile
    const coeff = calcCoeff(contratto.iva, contratto.rit, contratto.cassa);
    const imponibile = Math.round(lordoToImponibile(importoInc, coeff) * 100) / 100;

    db.run(
      `INSERT INTO tb_incassi (id_contratto, data, importo_inc, importo, stato, note, modalita)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [idContratto, data, importoInc, imponibile, stato, note, modalita],
      function(err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ 
          id: this.lastID, 
          idContratto,
          data,
          importoInc,
          importo: imponibile,
          stato,
          note,
          modalita
        });
      }
    );
  });
});

// PUT aggiorna incasso
router.put('/:id', (req, res) => {
  const { data, importoInc, stato, note, modalita, idContratto } = req.body;

  // Se cambia importo o contratto, ricalcola imponibile
  if (importoInc && idContratto) {
    db.get('SELECT iva, rit, cassa FROM tb_contratti WHERE id = ?', [idContratto], (err, contratto) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      const coeff = calcCoeff(contratto.iva, contratto.rit, contratto.cassa);
      const imponibile = Math.round(lordoToImponibile(importoInc, coeff) * 100) / 100;

      db.run(
        `UPDATE tb_incassi SET 
          id_contratto = ?, data = ?, importo_inc = ?, importo = ?, stato = ?, note = ?, modalita = ?, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [idContratto, data, importoInc, imponibile, stato, note, modalita, req.params.id],
        function(err) {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json({ id: req.params.id, ...req.body, importo: imponibile });
        }
      );
    });
  } else {
    // Aggiorna solo altri campi
    db.run(
      `UPDATE tb_incassi SET 
        data = ?, stato = ?, note = ?, modalita = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [data, stato, note, modalita, req.params.id],
      function(err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ id: req.params.id, ...req.body });
      }
    );
  }
});

// PUT aggiorna stato multipli incassi (per fatturazione)
router.put('/batch/update-stato', (req, res) => {
  const { ids, stato } = req.body;
  const placeholders = ids.map(() => '?').join(',');

  db.run(
    `UPDATE tb_incassi SET stato = ?, updated_at = CURRENT_TIMESTAMP WHERE id IN (${placeholders})`,
    [stato, ...ids],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Stati aggiornati', changes: this.changes });
    }
  );
});

// DELETE incasso
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM tb_incassi WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Incasso eliminato', changes: this.changes });
  });
});

module.exports = router;


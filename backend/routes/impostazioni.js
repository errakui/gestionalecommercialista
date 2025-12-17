const express = require('express');
const router = express.Router();
const { db } = require('../database/db');

// GET impostazioni
router.get('/', (req, res) => {
  db.get('SELECT * FROM tb_impostazioni WHERE id = 1', [], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      // Se non esistono, crea impostazioni di default
      const defaultImpostazioni = {
        iva: 0.22,
        ritenuta: 0.20,
        cassa: 0.04,
        studio: {
          nome: '',
          indirizzo: '',
          citta: '',
          piva: '',
          email: '',
          telefono: ''
        }
      };
      // Inserisci nel database
      db.run(
        `INSERT INTO tb_impostazioni (id, iva, ritenuta, cassa) VALUES (1, ?, ?, ?)`,
        [defaultImpostazioni.iva, defaultImpostazioni.ritenuta, defaultImpostazioni.cassa],
        function(insertErr) {
          if (insertErr) {
            console.error('Errore creazione impostazioni:', insertErr);
            // Restituisci comunque i default
            return res.json(defaultImpostazioni);
          }
          res.json(defaultImpostazioni);
        }
      );
      return;
    }
    // Formatta come nel frontend
    res.json({
      iva: row.iva,
      ritenuta: row.ritenuta,
      cassa: row.cassa,
      studio: {
        nome: row.studio_nome || '',
        indirizzo: row.studio_indirizzo || '',
        citta: row.studio_citta || '',
        piva: row.studio_piva || '',
        email: row.studio_email || '',
        telefono: row.studio_telefono || ''
      }
    });
  });
});

// PUT aggiorna impostazioni
router.put('/', (req, res) => {
  const { iva, ritenuta, cassa, studio } = req.body;

  db.run(
    `UPDATE tb_impostazioni SET 
      iva = ?, ritenuta = ?, cassa = ?,
      studio_nome = ?, studio_indirizzo = ?, studio_citta = ?,
      studio_piva = ?, studio_email = ?, studio_telefono = ?,
      updated_at = CURRENT_TIMESTAMP
     WHERE id = 1`,
    [
      iva, ritenuta, cassa,
      studio.nome, studio.indirizzo, studio.citta,
      studio.piva, studio.email, studio.telefono
    ],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ iva, ritenuta, cassa, studio });
    }
  );
});

// GET centri di costo
router.get('/centri-costo', (req, res) => {
  db.all('SELECT * FROM tb_centri_di_costo ORDER BY codice', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// GET servizi
router.get('/servizi', (req, res) => {
  db.all('SELECT *, importo_std as importoStd FROM tb_servizi ORDER BY nome', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

module.exports = router;


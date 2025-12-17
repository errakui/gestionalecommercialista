const express = require('express');
const router = express.Router();
const { db } = require('../database/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');

// POST Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username e password richiesti' });
  }

  db.get('SELECT * FROM tb_utenti WHERE username = ? AND attivo = 1', [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!user) {
      return res.status(401).json({ error: 'Credenziali non valide' });
    }

    // Verifica password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: 'Errore verifica password' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Credenziali non valide' });
      }

      // Genera token JWT
      const token = jwt.sign(
        { 
          id: user.id, 
          username: user.username, 
          ruolo: user.ruolo 
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          nome: user.nome,
          email: user.email,
          ruolo: user.ruolo
        }
      });
    });
  });
});

// POST Registrazione (solo per sviluppo, in produzione rimuovere o proteggere)
router.post('/register', (req, res) => {
  const { username, password, nome, email, ruolo = 'user' } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username e password richiesti' });
  }

  // Verifica se username esiste già
  db.get('SELECT id FROM tb_utenti WHERE username = ?', [username], (err, existing) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (existing) {
      return res.status(400).json({ error: 'Username già esistente' });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.run(
      'INSERT INTO tb_utenti (username, password, nome, email, ruolo) VALUES (?, ?, ?, ?, ?)',
      [username, hashedPassword, nome, email, ruolo],
      function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res.json({ 
          message: 'Utente creato con successo',
          id: this.lastID 
        });
      }
    );
  });
});

// GET Verifica token (profilo utente corrente)
router.get('/me', require('../middleware/auth').authenticateToken, (req, res) => {
  db.get('SELECT id, username, nome, email, ruolo FROM tb_utenti WHERE id = ?', [req.user.id], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }
    res.json(user);
  });
});

module.exports = router;


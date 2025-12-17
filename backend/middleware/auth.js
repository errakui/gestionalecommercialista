const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'gestionale-studio-secret-key-2024';

// Middleware di autenticazione
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Token di accesso mancante' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token non valido o scaduto' });
    }
    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
  JWT_SECRET
};


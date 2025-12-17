const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inizializza database (carica schema e dati)
require('./database/init');

// Routes pubbliche
app.use('/api/auth', require('./routes/auth'));

// Routes protette
const { authenticateToken } = require('./middleware/auth');
app.use('/api/clienti', authenticateToken, require('./routes/clienti'));
app.use('/api/contratti', authenticateToken, require('./routes/contratti'));
app.use('/api/incassi', authenticateToken, require('./routes/incassi'));
app.use('/api/costi', authenticateToken, require('./routes/costi'));
app.use('/api/impostazioni', authenticateToken, require('./routes/impostazioni'));
app.use('/api/dashboard', authenticateToken, require('./routes/dashboard'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server attivo' });
});

// Serve file statici se in produzione (DOPO le route API)
// NOTA: Con frontend separato su Koyeb, questo non serve
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')));
// }

// Serve React app in produzione (solo se frontend non è su servizio separato)
// NOTA: Con frontend separato su Koyeb, questo non serve
// if (process.env.NODE_ENV === 'production') {
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
//   });
// }

// Avvia server
app.listen(PORT, () => {
  console.log(`🚀 Server backend avviato su http://localhost:${PORT}`);
  console.log(`📊 API disponibili su http://localhost:${PORT}/api`);
});


# Gestionale Studio Professionale

Sistema completo di gestione contabile per studi professionali (commercialisti, consulenti del lavoro).

## 🚀 Struttura Progetto

```
gestionale studio/
├── backend/              # Backend Node.js/Express
│   ├── database/        # Database SQLite e schema
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.js        # Server principale
├── frontend/            # Frontend React
│   ├── src/
│   │   ├── services/   # API services
│   │   ├── utils/      # Utility functions
│   │   └── App.js      # Componente principale
│   └── public/
└── README.md
```

## 📋 Prerequisiti

- Node.js 16+ 
- npm o yarn

## 🔧 Installazione

### Backend

```bash
cd backend
npm install
npm start
```

Il server sarà disponibile su `http://localhost:3001`

### Frontend

```bash
cd frontend
npm install
npm start
```

L'applicazione sarà disponibile su `http://localhost:3000`

## 🔐 Autenticazione

Il sistema include autenticazione con JWT. All'avvio viene creato automaticamente un utente amministratore.

⚠️ **IMPORTANTE**: 
- Le credenziali di default sono disponibili nel file `CREDENZIALI.md`
- Cambia la password dopo il primo accesso in produzione!

## 📊 Funzionalità

- ✅ **Sistema di Login/Autenticazione** con JWT
- ✅ Gestione Clienti (CRUD completo)
- ✅ Gestione Contratti/Incarichi
- ✅ Registrazione Incassi con calcolo automatico imponibile
- ✅ Fatturazione con anteprima
- ✅ Gestione Costi Studio
- ✅ Dashboard con statistiche e grafici
- ✅ Report analitici
- ✅ Impostazioni studio e aliquote

## 🗄️ Database

Il database SQLite viene creato automaticamente al primo avvio del backend nella cartella `backend/database/gestionale.db`

## 🔑 API Endpoints

### Autenticazione
- `POST /api/auth/login` - Login (username, password)
- `POST /api/auth/register` - Registrazione nuovo utente (solo sviluppo)
- `GET /api/auth/me` - Profilo utente corrente (protetto)

### Dati (tutte protette, richiedono token JWT)
- `GET /api/clienti` - Lista clienti
- `POST /api/clienti` - Crea cliente
- `PUT /api/clienti/:id` - Aggiorna cliente
- `DELETE /api/clienti/:id` - Elimina cliente

- `GET /api/contratti` - Lista contratti
- `POST /api/contratti` - Crea contratto

- `GET /api/incassi` - Lista incassi
- `POST /api/incassi` - Crea incasso
- `PUT /api/incassi/batch/update-stato` - Aggiorna stato multipli incassi

- `GET /api/costi/studio` - Lista costi studio
- `POST /api/costi/studio` - Crea costo studio

- `GET /api/impostazioni` - Ottieni impostazioni
- `PUT /api/impostazioni` - Aggiorna impostazioni

## 📝 Note

- Il sistema calcola automaticamente l'imponibile dall'importo lordo incassato usando il coefficiente fiscale
- Supporta regime Ordinario e Forfettario
- Tutti i calcoli fiscali sono implementati secondo le normative italiane

## 🛠️ Tecnologie

- **Backend**: Node.js, Express, SQLite
- **Frontend**: React, Recharts
- **Database**: SQLite


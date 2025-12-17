# 🚀 Deploy su Koyeb - Istruzioni Complete

## ⚠️ IMPORTANTE: SQLite NON funziona su Koyeb!

SQLite usa file locali che vengono **persi ad ogni riavvio** su Koyeb. Il progetto è stato configurato per supportare **PostgreSQL** automaticamente.

## ✅ Cosa è stato preparato

- ✅ Supporto automatico PostgreSQL/SQLite
- ✅ Dockerfile per backend e frontend
- ✅ Configurazione Koyeb
- ✅ Variabili d'ambiente

## 📋 Procedura Deploy

### 1. Crea Database PostgreSQL su Koyeb

1. Vai su [Koyeb Dashboard](https://app.koyeb.com)
2. Clicca su **"Databases"** → **"Create Database"**
3. Scegli **PostgreSQL**
4. Copia la **Connection String** (es: `postgresql://user:pass@host:5432/db`)

### 2. Deploy Backend

**Via Dashboard con Dockerfile (CONSIGLIATO)**

1. Vai su **"Apps"** → **"Create App"**
2. Connetti il tuo repository GitHub: `errakui/gestionalecommercialista`
3. Nella schermata **"Build options"**:
   - ✅ Seleziona **"Dockerfile"** (NON Buildpack)
   - **Root Directory**: `backend`
4. Aggiungi **Environment Variables**:
   ```
   PORT=3001
   NODE_ENV=production
   JWT_SECRET=your-super-secret-key-change-this
   DATABASE_URL=postgresql://user:pass@host:5432/db
   ```
5. Clicca **"Deploy"**

**Nota**: Il Dockerfile è già presente in `backend/Dockerfile` e include tutti i build tools necessari per `sqlite3` e `pg`.

### 3. Deploy Frontend

1. Crea nuova App: `gestionale-frontend`
2. Nella schermata **"Build options"**:
   - ✅ Seleziona **"Dockerfile"** (NON Buildpack)
   - **Root Directory**: `frontend`
3. Environment Variable:
   ```
   REACT_APP_API_URL=https://your-backend-app.koyeb.app/api
   ```
   (Sostituisci con l'URL reale del tuo backend)

### 4. Configurazione CORS

Il backend è già configurato con CORS. Se hai problemi, verifica che il frontend URL sia nella whitelist.

## 🔧 Verifica Post-Deploy

1. **Backend**: `https://your-backend.koyeb.app/api/health`
2. **Frontend**: `https://your-frontend.koyeb.app`
3. **Login**: Usa credenziali da `CREDENZIALI.md`

## 📝 Note Importanti

- Il database PostgreSQL viene creato automaticamente al primo avvio
- L'utente admin viene creato automaticamente
- Cambia `JWT_SECRET` in produzione!
- Il frontend deve conoscere l'URL del backend tramite `REACT_APP_API_URL`

## 🐛 Troubleshooting

**Errore "Database connection failed"**
- Verifica che `DATABASE_URL` sia corretto
- Controlla che il database PostgreSQL sia attivo su Koyeb

**Frontend non si connette al backend**
- Verifica `REACT_APP_API_URL` nel frontend
- Controlla CORS nel backend

**404 su route frontend**
- Verifica che nginx.conf sia configurato correttamente
- Controlla che il build sia stato eseguito

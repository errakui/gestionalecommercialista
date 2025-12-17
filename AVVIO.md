# 🚀 Istruzioni Avvio Rapido

## 1. Installazione Dipendenze

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## 2. Avvio Applicazione

### Terminal 1 - Backend
```bash
cd backend
npm start
```
✅ Server attivo su http://localhost:3001

### Terminal 2 - Frontend
```bash
cd frontend
npm start
```
✅ App attiva su http://localhost:3000

## 3. Primo Utilizzo

1. Il database SQLite viene creato automaticamente al primo avvio del backend
2. I dati di esempio vengono inseriti automaticamente
3. Viene creato automaticamente un utente amministratore (vedi file CREDENZIALI.md)
4. Apri il browser su http://localhost:3000
5. Effettua il login con le credenziali di accesso

## ⚠️ Note Importanti

- Assicurati che il backend sia avviato PRIMA del frontend
- Il backend deve essere su porta 3001
- Il frontend si connette automaticamente al backend tramite proxy

## 🔧 Risoluzione Problemi

**Errore "Cannot connect to API"**
- Verifica che il backend sia avviato
- Controlla che la porta 3001 sia libera

**Errore "Database not found"**
- Il database viene creato automaticamente
- Verifica i permessi di scrittura nella cartella `backend/database/`

**Errore "Module not found"**
- Esegui `npm install` in entrambe le cartelle (backend e frontend)


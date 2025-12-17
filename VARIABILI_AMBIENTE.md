# 🔐 Variabili d'Ambiente - Koyeb Deploy

## 📋 Backend - Variabili da Configurare

### Variabili OBBLIGATORIE

```env
PORT=3001
NODE_ENV=production
JWT_SECRET=your-super-secret-key-change-this-in-production-min-32-chars
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

### Spiegazione Variabili

| Variabile | Valore | Descrizione |
|-----------|--------|-------------|
| `PORT` | `3001` | Porta su cui gira il backend |
| `NODE_ENV` | `production` | Ambiente di esecuzione |
| `JWT_SECRET` | `stringa-segreta-min-32-caratteri` | Chiave segreta per firmare i token JWT. **IMPORTANTE**: Usa una stringa lunga e casuale! |
| `DATABASE_URL` | `postgresql://...` | Connection string del database PostgreSQL da Koyeb |

### Esempio JWT_SECRET
```
JWT_SECRET=GestionaleStudio2024!SecretKey#ChangeThis$RandomString123456789
```

## 📋 Frontend - Variabili da Configurare

### Variabili OBBLIGATORIE

```env
REACT_APP_API_URL=https://your-backend-app.koyeb.app/api
PORT=3000
```

### Spiegazione Variabili

| Variabile | Valore | Descrizione |
|-----------|--------|-------------|
| `REACT_APP_API_URL` | `https://tuo-backend.koyeb.app/api` | URL completo del backend deployato su Koyeb |
| `PORT` | `3000` | Porta su cui gira il frontend (opzionale, default 3000) |

## 🚀 Come Aggiungere su Koyeb

### Backend
1. Vai su Koyeb Dashboard → La tua App Backend
2. Clicca su **"Settings"** → **"Environment Variables"**
3. Aggiungi tutte le variabili del backend (vedi sopra)
4. Clicca **"Save"**

### Frontend
1. Vai su Koyeb Dashboard → La tua App Frontend
2. Clicca su **"Settings"** → **"Environment Variables"**
3. Aggiungi `REACT_APP_API_URL` con l'URL del tuo backend
4. Clicca **"Save"**

## ⚠️ IMPORTANTE

- **JWT_SECRET**: Genera una chiave casuale e sicura. Puoi usare:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- **DATABASE_URL**: Copia esattamente la connection string da Koyeb Database
- **REACT_APP_API_URL**: Deve essere l'URL completo del backend (con https://)

## 📝 Checklist Pre-Deploy

- [ ] Database PostgreSQL creato su Koyeb
- [ ] `DATABASE_URL` copiato correttamente
- [ ] `JWT_SECRET` generato e salvato in modo sicuro
- [ ] Backend deployato e URL ottenuto
- [ ] `REACT_APP_API_URL` configurato con URL backend
- [ ] Frontend deployato


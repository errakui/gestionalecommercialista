# 🖥️ Koyeb CLI - Gestione da Terminale

## 📦 Installazione Koyeb CLI

### macOS (con Homebrew)
```bash
brew install koyeb/tap/koyeb
```

### macOS/Linux (con script)
```bash
curl -fsSL https://cli.koyeb.com/install.sh | sh
```

### Verifica installazione
```bash
koyeb --version
```

---

## 🔐 Login

```bash
koyeb auth login
```

Ti aprirà il browser per autenticarti.

---

## 📋 Comandi Utili

### Lista App
```bash
koyeb apps list
```

### Lista Services
```bash
koyeb services list
```

### Logs in tempo reale
```bash
# Logs di un servizio specifico
koyeb services logs <service-id> --follow

# Logs di un'app
koyeb apps logs <app-id> --follow
```

### Info App/Service
```bash
koyeb apps get <app-id>
koyeb services get <service-id>
```

### Variabili d'ambiente
```bash
# Lista variabili
koyeb services env list <service-id>

# Aggiungi variabile
koyeb services env set <service-id> KEY=value

# Rimuovi variabile
koyeb services env unset <service-id> KEY
```

### Deploy da terminale
```bash
# Crea nuovo servizio
koyeb services create \
  --app <app-name> \
  --type web \
  --git <repo-url> \
  --git-branch main \
  --git-build-command "npm install" \
  --git-run-command "npm start"
```

---

## 🐛 Debug e Troubleshooting

### 1. Vedi Logs in tempo reale
```bash
# Trova l'ID del servizio
koyeb services list

# Vedi logs
koyeb services logs <service-id> --follow
```

### 2. Test Locale Prima del Deploy

**Backend:**
```bash
cd backend
npm install
DATABASE_URL=postgresql://... JWT_SECRET=test PORT=3001 npm start
```

**Frontend:**
```bash
cd frontend
npm install
REACT_APP_API_URL=http://localhost:3001/api npm start
```

### 3. Build Locale Docker
```bash
# Test backend Docker
cd backend
docker build -t gestionale-backend .
docker run -p 3001:3001 \
  -e DATABASE_URL=postgresql://... \
  -e JWT_SECRET=test \
  gestionale-backend

# Test frontend Docker
cd frontend
docker build -t gestionale-frontend .
docker run -p 3000:80 gestionale-frontend
```

---

## 🔍 Comandi Debug Specifici

### Verifica Status
```bash
koyeb services list --output json | jq '.[] | {name: .name, status: .status}'
```

### Logs ultimi 100 righe
```bash
koyeb services logs <service-id> --tail 100
```

### Restart Service
```bash
koyeb services restart <service-id>
```

### Delete Service (se serve ricominciare)
```bash
koyeb services delete <service-id>
```

---

## 📝 Workflow Consigliato

1. **Test Locale**
   ```bash
   # Backend
   cd backend && npm install && npm start
   
   # Frontend (altro terminale)
   cd frontend && npm install && npm start
   ```

2. **Test Docker Locale**
   ```bash
   docker build -t test-backend ./backend
   docker run -p 3001:3001 test-backend
   ```

3. **Deploy su Koyeb**
   ```bash
   # Via Dashboard (più facile) o CLI
   ```

4. **Monitor Logs**
   ```bash
   koyeb services logs <service-id> --follow
   ```

---

## ⚠️ Note Importanti

- Koyeb CLI richiede autenticazione (`koyeb auth login`)
- I logs sono disponibili solo per servizi attivi
- Per modifiche al codice, fai commit e push su GitHub, Koyeb rileverà automaticamente

---

## 🆘 Se CLI non funziona

1. **Vedi logs su Dashboard**: Koyeb Dashboard → App → Service → Logs
2. **Test locale**: Risolvi i problemi localmente prima
3. **Verifica Dockerfile**: Testa il Dockerfile localmente con Docker


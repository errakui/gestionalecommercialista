# 🖥️ Comandi Koyeb CLI - Quick Reference

## 🔐 Login

```bash
koyeb auth login
```

Ti aprirà il browser per autenticarti.

---

## 📋 Comandi Principali

### 1. Lista App e Services
```bash
# Lista tutte le app
koyeb apps list

# Lista tutti i servizi
koyeb services list

# Dettagli di un'app
koyeb apps get <app-name>

# Dettagli di un servizio
koyeb services get <service-name>
```

### 2. Logs in Tempo Reale
```bash
# Logs di un servizio (sostituisci <service-id>)
koyeb services logs <service-id> --follow

# Ultimi 100 log
koyeb services logs <service-id> --tail 100

# Logs di un'app
koyeb apps logs <app-name> --follow
```

### 3. Variabili d'Ambiente
```bash
# Lista variabili
koyeb services env list <service-id>

# Aggiungi variabile
koyeb services env set <service-id> PORT=3001

# Aggiungi multiple
koyeb services env set <service-id> \
  PORT=3001 \
  NODE_ENV=production \
  JWT_SECRET=your-secret \
  DATABASE_URL=postgresql://...

# Rimuovi variabile
koyeb services env unset <service-id> PORT
```

### 4. Restart e Gestione
```bash
# Restart servizio
koyeb services restart <service-id>

# Pausa servizio
koyeb services pause <service-id>

# Resume servizio
koyeb services resume <service-id>

# Delete servizio
koyeb services delete <service-id>
```

---

## 🐛 Debug Workflow

### Step 1: Trova il Service ID
```bash
koyeb services list
```

### Step 2: Vedi Logs
```bash
koyeb services logs <service-id> --follow
```

### Step 3: Verifica Variabili
```bash
koyeb services env list <service-id>
```

### Step 4: Modifica Variabili (se necessario)
```bash
koyeb services env set <service-id> KEY=value
koyeb services restart <service-id>
```

---

## 📝 Esempio Completo

```bash
# 1. Login
koyeb auth login

# 2. Lista servizi
koyeb services list

# 3. Vedi logs backend (sostituisci con il tuo service-id)
koyeb services logs gestionale-backend-xxx --follow

# 4. Aggiungi variabile mancante
koyeb services env set gestionale-backend-xxx DATABASE_URL=postgresql://...

# 5. Restart
koyeb services restart gestionale-backend-xxx
```

---

## ⚡ Comandi Rapidi

```bash
# Vedi tutti i servizi con status
koyeb services list --output json | jq '.[] | {name: .name, status: .status, id: .id}'

# Logs ultimi errori
koyeb services logs <service-id> --tail 50 | grep -i error

# Restart tutti i servizi di un'app
koyeb services list --app <app-name> | awk '{print $1}' | xargs -I {} koyeb services restart {}
```

---

## 🆘 Se non funziona

1. **Verifica login**: `koyeb auth whoami`
2. **Vedi help**: `koyeb --help`
3. **Documentazione**: https://www.koyeb.com/docs/build-and-deploy/cli


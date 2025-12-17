# 🚀 Quick Start - Deploy su Koyeb

## ✅ Repository GitHub
**URL**: https://github.com/errakui/gestionalecommercialista

## 📋 Step 1: Crea Database PostgreSQL

1. Vai su [Koyeb Dashboard](https://app.koyeb.com)
2. **Databases** → **Create Database**
3. Scegli **PostgreSQL**
4. **Copia la Connection String** (ti servirà dopo)

## 📋 Step 2: Deploy Backend

1. **Apps** → **Create App**
2. Connetti repository: `errakui/gestionalecommercialista`
3. Nella schermata **"Build options"**:
   - ✅ Seleziona **"Dockerfile"** (NON Buildpack)
   - **Root Directory**: `backend`
4. **Environment Variables** (vedi VARIABILI_AMBIENTE.md):
   ```
   PORT=3001
   NODE_ENV=production
   JWT_SECRET=GestionaleStudio2024!SecretKey#ChangeThis$RandomString123456789
   DATABASE_URL=postgresql://user:pass@host:5432/db
   ```
5. **Deploy** → Aspetta che finisca
6. **Copia l'URL** del backend (es: `https://gestionale-backend-xxx.koyeb.app`)

## 📋 Step 3: Deploy Frontend

1. **Apps** → **Create App**
2. Connetti repository: `errakui/gestionalecommercialista`
3. Nella schermata **"Build options"**:
   - ✅ Seleziona **"Dockerfile"** (NON Buildpack)
   - **Root Directory**: `frontend`
4. **Environment Variable**:
   ```
   REACT_APP_API_URL=https://gestionale-backend-xxx.koyeb.app/api
   ```
   (Sostituisci con l'URL reale del tuo backend)
5. **Deploy**

## ✅ Fine!

Apri l'URL del frontend e accedi con le credenziali da `CREDENZIALI.md`

## 📝 File Utili

- `VARIABILI_AMBIENTE.md` - Tutte le variabili d'ambiente
- `DEPLOY_KOYEB.md` - Guida completa dettagliata
- `CREDENZIALI.md` - Credenziali di accesso


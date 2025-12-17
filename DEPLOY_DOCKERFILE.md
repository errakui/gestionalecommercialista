# 🐳 Deploy con Dockerfile - Guida Completa

## ✅ Perché Dockerfile?

- ✅ Funziona sempre, indipendentemente dal buildpack
- ✅ Include tutti i build tools necessari
- ✅ Più controllo sulla configurazione
- ✅ Supporta dipendenze native come `sqlite3`

## 📋 Step-by-Step Deploy

### 1️⃣ Crea Database PostgreSQL

1. Vai su [Koyeb Dashboard](https://app.koyeb.com)
2. **Databases** → **Create Database**
3. Scegli **PostgreSQL**
4. **Copia la Connection String**

---

### 2️⃣ Deploy Backend

1. **Apps** → **Create App**
2. Connetti repository: `errakui/gestionalecommercialista`
3. **Build options** (Step 2):
   - ✅ Seleziona **"Dockerfile"**
   - **Root Directory**: `backend`
4. **Environment Variables** (Step 4):
   ```
   PORT=3001
   NODE_ENV=production
   JWT_SECRET=GestionaleStudio2024!SecretKey#ChangeThis$RandomString123456789
   DATABASE_URL=postgresql://user:password@host:5432/dbname
   ```
5. **Deploy** → Aspetta che finisca
6. **Copia l'URL** del backend (es: `https://gestionale-backend-xxx.koyeb.app`)

---

### 3️⃣ Deploy Frontend

1. **Apps** → **Create App**
2. Connetti repository: `errakui/gestionalecommercialista`
3. **Build options** (Step 2):
   - ✅ Seleziona **"Dockerfile"**
   - **Root Directory**: `frontend`
4. **Environment Variables** (Step 4):
   ```
   REACT_APP_API_URL=https://gestionale-backend-xxx.koyeb.app/api
   ```
   (Sostituisci con l'URL reale del tuo backend)
5. **Deploy**

---

## 🔍 Verifica Deploy

### Backend
- URL: `https://tuo-backend.koyeb.app/api/health`
- Dovrebbe rispondere: `{"status":"ok","message":"Server attivo"}`

### Frontend
- URL: `https://tuo-frontend.koyeb.app`
- Dovrebbe mostrare la pagina di login

---

## 📝 File Dockerfile

### Backend (`backend/Dockerfile`)
```dockerfile
FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++ sqlite
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

### Frontend (`frontend/Dockerfile`)
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## ⚠️ Importante

- **Root Directory**: Deve essere `backend` o `frontend` a seconda dell'app
- **Dockerfile**: Koyeb lo trova automaticamente nella root directory specificata
- **Environment Variables**: Aggiungile nello Step 4 del deploy

---

## 🐛 Troubleshooting

**Errore "Dockerfile not found"**
- Verifica che Root Directory sia `backend` o `frontend`
- Verifica che il Dockerfile esista nella cartella corretta

**Errore "Build failed"**
- Controlla i log di build su Koyeb
- Verifica che tutte le variabili d'ambiente siano impostate

**Frontend non si connette al backend**
- Verifica `REACT_APP_API_URL` nel frontend
- Deve essere l'URL completo con `https://` e `/api`


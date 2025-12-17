# 🔧 Fix Errore Build Koyeb

## ❌ Problema
```
Build failed with exit code 51
The "build" step of buildpacks failed
```

## ✅ Soluzione: Usa Dockerfile invece di Buildpack

### Per il Backend:

1. **Nella schermata "Build options"**:
   - Seleziona **"Dockerfile"** invece di "Buildpack"
   - Il Dockerfile è già presente in `backend/Dockerfile`

2. **Se vuoi continuare con Buildpack**:
   - Assicurati che **Work directory** sia impostato su `backend`
   - Attiva "Override" per tutti i campi:
     - Build command: `npm install`
     - Run command: `npm start`
     - Work directory: `backend`

### Perché fallisce con Buildpack?

- `sqlite3` richiede compilazione nativa (C++)
- Il buildpack potrebbe non avere i build tools necessari
- Il Dockerfile include già tutto il necessario

## 🚀 Soluzione Consigliata: Dockerfile

1. **Backend**:
   - Seleziona **"Dockerfile"**
   - Work directory: `backend` (se richiesto)
   - Il Dockerfile è già configurato correttamente

2. **Frontend**:
   - Seleziona **"Dockerfile"**
   - Work directory: `frontend` (se richiesto)
   - Il Dockerfile è già configurato correttamente

## 📝 Alternativa: Buildpack con Work Directory

Se preferisci usare Buildpack:

1. **IMPORTANTE**: Attiva "Override" per **Work directory**
2. Inserisci: `backend` (per backend) o `frontend` (per frontend)
3. Questo dice a Koyeb dove trovare il `package.json`

## ⚠️ Nota

Il Dockerfile è la soluzione più affidabile perché:
- Include tutti i build tools necessari
- Funziona sempre, indipendentemente dal buildpack
- Più controllo sulla configurazione


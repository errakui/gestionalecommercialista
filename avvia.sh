#!/bin/bash

echo "🚀 Avvio Gestionale Studio Professionale"
echo "=========================================="
echo ""

# Colori
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Avvia backend
echo -e "${BLUE}📦 Avvio Backend...${NC}"
cd backend
npm start &
BACKEND_PID=$!
cd ..

# Attendi che il backend sia pronto
sleep 3

# Avvia frontend
echo -e "${BLUE}🎨 Avvio Frontend...${NC}"
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo -e "${GREEN}✅ Server avviati!${NC}"
echo ""
echo "📍 Backend: http://localhost:3001"
echo "📍 Frontend: http://localhost:3000"
echo ""
echo "🔐 Vedi file CREDENZIALI.md per le credenziali di accesso"
echo ""
echo "Premi CTRL+C per fermare i server"

# Attendi terminazione
wait


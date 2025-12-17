#!/bin/bash

# ============================================
# Script per testare localmente prima di deployare
# ============================================

echo "🧪 Test Locale Gestionale Studio"
echo "================================"
echo ""

# Colori
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Verifica se Docker è installato
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker non installato${NC}"
    echo "Installa Docker Desktop: https://www.docker.com/products/docker-desktop"
    exit 1
fi

echo -e "${BLUE}📦 Test Backend Docker...${NC}"
cd backend
docker build -t gestionale-backend-test . 2>&1 | tail -5

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build backend OK${NC}"
else
    echo -e "${RED}❌ Errore build backend${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}📦 Test Frontend Docker...${NC}"
cd ../frontend
docker build -t gestionale-frontend-test . 2>&1 | tail -5

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build frontend OK${NC}"
else
    echo -e "${RED}❌ Errore build frontend${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Tutti i test Docker passati!${NC}"
echo ""
echo "Per testare il backend:"
echo "  docker run -p 3001:3001 -e DATABASE_URL=postgresql://... gestionale-backend-test"
echo ""
echo "Per testare il frontend:"
echo "  docker run -p 3000:80 gestionale-frontend-test"


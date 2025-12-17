FROM node:18-alpine

WORKDIR /app

# Installa build tools per sqlite3
RUN apk add --no-cache python3 make g++ sqlite

# Copia package files
COPY package*.json ./

# Installa dipendenze
RUN npm install --production

# Copia tutto il codice
COPY . .

# Esponi porta
EXPOSE 3001

# Avvia server
CMD ["npm", "start"]


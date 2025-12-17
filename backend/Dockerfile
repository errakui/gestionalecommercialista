FROM node:18-alpine

WORKDIR /app

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


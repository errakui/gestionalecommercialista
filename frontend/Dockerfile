FROM node:18-alpine as build

WORKDIR /app

# Copia package files
COPY package*.json ./

# Installa dipendenze
RUN npm install

# Copia codice
COPY . .

# Build app
RUN npm run build

# Stage production
FROM nginx:alpine

# Copia build
COPY --from=build /app/build /usr/share/nginx/html

# Copia configurazione nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


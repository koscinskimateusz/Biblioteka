# U¿ywamy obrazu Node.js
FROM node:22-alpine

# Ustawiamy katalog roboczy w kontenerze
WORKDIR /app

# Kopiujemy pliki package.json i package-lock.json
COPY package*.json ./

# Instalujemy zale¿noœci
RUN npm install

# Kopiujemy resztê kodu aplikacji
COPY . .

# Budujemy aplikacjê
RUN npm run build

# Otwieramy port, na którym nas³uchuje NestJS (domyœlnie 3000)
EXPOSE 3000

# Komenda startowa (tryb produkcyjny)
CMD ["npm", "run", "start:prod"]
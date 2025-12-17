# Etap 1: Budowanie (Build Stage)
FROM node:22-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etap 2: Serwowanie (Production Stage)
FROM nginx:stable-alpine as production-stage
# Kopiujemy zbudowane pliki z etapu 1 do folderu Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
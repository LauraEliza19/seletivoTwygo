# Use a imagem do Node.js para buildar a aplicação
FROM node:18 AS build

# Define o diretório de trabalho no container
WORKDIR /app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código do frontend
COPY . .

# Builda o projeto
RUN npm run build

# Use uma imagem nginx para servir a aplicação
FROM nginx:alpine

# Copia os arquivos buildados para o nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expõe a porta 80 para acessar a aplicação
EXPOSE 80

# Comando padrão do NGINX
CMD ["nginx", "-g", "daemon off;"]

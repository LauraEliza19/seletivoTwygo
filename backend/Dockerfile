# Use a imagem do Node.js
FROM node:18

# Define o diretório de trabalho no container
WORKDIR /app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código do backend
COPY . .

# Executa o build
RUN npm run build

# Define a porta que o app vai expor
EXPOSE 3000

# Comando para rodar o app
CMD ["npm", "start"]

# Usa uma imagem Node com suporte a Expo
FROM node:18-alpine


# Define o diretório de trabalho
WORKDIR /app/frontend

# Copia os arquivos de dependência
COPY package.json ./
COPY package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

EXPOSE 8080

# Comando para iniciar
CMD ["npm", "run", "dev" ]

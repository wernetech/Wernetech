FROM node:20

WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Build para produção
RUN npm run build

EXPOSE 3000

# Roda o Next.js em produção
CMD ["npm", "start"]

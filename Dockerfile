FROM node:20

WORKDIR /app

# Copia package.json da raiz e instala dependências
COPY package*.json ./
RUN npm install

# Copia e instala dependências do backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copia e instala dependências do frontend
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copia todo o restante
COPY . .

# Expondo as portas
EXPOSE 3000
EXPOSE 3333

# Roda os dois serviços ao mesmo tempo
CMD ["npm", "run", "dev"]

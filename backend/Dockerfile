FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install -g nodemon && npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]

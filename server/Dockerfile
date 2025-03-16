FROM node:latest

WORKDIR /server

COPY package*.json ./

RUN npm install

RUN npx playwright install --with-deps

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

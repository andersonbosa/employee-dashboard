# https://hub.docker.com/_/node/tags
FROM node:20.12.1-slim

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]


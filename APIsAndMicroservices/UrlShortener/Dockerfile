FROM node:lts-slim
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
CMD [ "node", "app.js" ]
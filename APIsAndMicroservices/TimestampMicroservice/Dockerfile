FROM node:lts-slim
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "node", "app.js" ]
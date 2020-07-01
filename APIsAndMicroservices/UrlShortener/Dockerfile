FROM node:lts-slim
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
RUN ls -al
CMD [ "node", "app.js" ]
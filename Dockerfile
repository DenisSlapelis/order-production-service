FROM node:20.9.0-slim as NODE_PROD

WORKDIR /app

ENV NODE_ENV production

COPY package*.json ./

RUN npm install --production

COPY . /app

EXPOSE 8000

CMD [ "npm", "start" ]

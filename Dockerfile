FROM node:20.9.0-slim as NODE_PROD

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

USER nonroot

WORKDIR /app

ENV NODE_ENV production

COPY package*.json ./

RUN npm install --ignore-scripts

COPY . /app

EXPOSE 8000

CMD [ "npm", "start" ]

FROM node:16

WORKDIR /opt/client

COPY ./client/package.json .
COPY ./client/package-lock.json .
RUN npm install

COPY ./client/public ./public
COPY ./client/src ./src

RUN npm run build

WORKDIR /opt/api

COPY ./api/package.json .
COPY ./api/package-lock.json .

RUN npm install

COPY ./api/src ./src
COPY ./api/bin ./bin

ENV CLIENT_PATH="/opt/client/build"

EXPOSE 3000

CMD [ "node", "./bin/www" ]

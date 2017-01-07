FROM node:6.9.4

ENV PORT=3000 HOST=0.0.0.0 CACHE_DIR=/cache LOG=true EXTERNAL_URL=http://localhost:3000

EXPOSE 3000

WORKDIR /cheese-bread-js

ADD package.json .
ADD server.js .

VOLUME /cache

RUN npm install \
    && rm -Rf ~/.npm

CMD npm start
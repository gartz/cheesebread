# cheesebread - Pão de Queijo
A delicious and easy to cook CDN file caching for offline development environments.

[![Npm Version](https://img.shields.io/npm/v/cheesebread.svg)](https://npmjs.com/package/cheesebread)
[![Node Version](https://img.shields.io/node/v/cheesebread.svg)](https://npmjs.com/package/cheesebread)
[![Build Status](https://travis-ci.org/gartz/cheesebread.svg?branch=master)](https://travis-ci.org/gartz/cheesebread)
[![Codacy Coverage Badge](https://api.codacy.com/project/badge/Coverage/8acfda7d26394c8aadbcab6a9ccc5c42)](https://www.codacy.com/app/gartz/cheesebread?utm_source=github.com&utm_medium=referral&utm_content=gartz/cheesebread&utm_campaign=Badge_Coverage)
[![Codacy Grade Badge](https://api.codacy.com/project/badge/Grade/8acfda7d26394c8aadbcab6a9ccc5c42)](https://www.codacy.com/app/gartz/cheesebread?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=gartz/cheesebread&amp;utm_campaign=Badge_Grade)
[![bitHound Overall Score](https://www.bithound.io/github/gartz/cheesebread/badges/score.svg)](https://www.bithound.io/github/gartz/cheesebread)
[![bitHound Code](https://www.bithound.io/github/gartz/cheesebread/badges/code.svg)](https://www.bithound.io/github/gartz/cheesebread)
[![bitHound Dependencies](https://www.bithound.io/github/gartz/cheesebread/badges/dependencies.svg)](https://www.bithound.io/github/gartz/cheesebread/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/gartz/cheesebread/badges/devDependencies.svg)](https://www.bithound.io/github/gartz/cheesebread/master/dependencies/npm)
[![Code Climate](https://codeclimate.com/github/gartz/cheesebread/badges/gpa.svg)](https://codeclimate.com/github/gartz/cheesebread)

```bash
npm start
```

Type: `http://localhost:3000/target_url` where `target_url` is an online address, for example: `http://localhost:3000/https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png`

The first time you hit that URL it will download, cache and provide the file. The subsequent attempts will access from the cache.

## Install and run

**NPM CLI**:
```bash
npm install cheesebread -g
cheesebread --help          # Command-line help
cheesebread                 # Start the server
```

**NPM Project**:
```bash
npm install cheesebread --save-dev
```

Starting with Express (you can add to your current application).

```js
const http = require('http');
const express = require('express');

const cheesebread = require('cheesebread');

const options = {
  dir: 'cache', 
  externalUrl: 'localhost:3000/proxy', 
  log: true
};

const app = express(); 

app.use('/proxy', cheesebread(options)))

const server = http.createServer(cheesebread({ dir, externalUrl, log }));

server.listen(3000, '127.0.0.1', () => {
  console.log(`Cheese Bread server is listening on ${externalUrl}/`);
});
```

**Docker**:
```bash
docker pull gartz/cheesebread
docker run -p "3000:3000" gartz/cheesebread # Start docker container
```

## Purge the cache

Delete all files from the folder: `${home}/.cheese-bread-js/cache` also known as `~/.cheese-bread-js/cache`


## Environment options

* **PORT** (3000): Define the server port
* **HOST** (127.0.0.1): Define the host IP
* **CACHE_DIR** (~/cheese-bread-js/cache): Define where the cache files will be saved
* **LOG** (true): Display log information in the output
* **EXTERNAL_URL** (http://${HOST}:${PORT}): URL used to access the server

## Todo

* Create a wildcard to white-list target URLs

## Motivation and Name

We want to show a project on CES that should run offline, and we need files from CDN to be cached in our Docker local 
instance.

On [@gartz](https://github.com/gartz) vocation at the hotel he write this server script that would allow to accomplish 
the task.

To choose the name [@brainTrain](https://github.com/brainTrain) established that being a JS project it must have a name 
that isn't semantic to it. [@ptubig](https://github.com/ptubig) suggested that it should be an Brazilian name, and 
[@tjohnson4](https://github.com/tjohnson4) gave the idea to call it "Pão de queijo", what we translated to Cheese Bread.

## Companies using

* [Samba TV](https://samba.tv/)

# Cheese Bread JS
A delicious and easy to cook CDN file caching for offline development environments.

[![Npm Version](https://img.shields.io/npm/v/cheese-bread-js.svg)](https://npmjs.com/package/cheese-bread-js)
[![Node Version](https://img.shields.io/node/v/cheese-bread-js.svg)](https://npmjs.com/package/cheese-bread-js)

```bash
npm start
```

Type: `http://localhost:3000/target_url` where `target_url` is an online address, for example: `http://localhost:3000/https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png`

The first time you hit that URL it will download, cache and provide the file. The subsequent attempts will access from the cache.

## Install and run

NPM:
```bash
npm install cheese-bread-js --save-dev
```

Docker:
```bash
docker pull gartz/cheese-bread-js
docker run -p "3000:3000" gartz/cheese-bread-js
```

## Purge the cache

Delete all files from the folder: `${home}/.cheese-bread-js/cache` also known as `~/.cheese-bread-js/cache`

## Environment options

* **PORT** (3000): Define the server port
* **HOST** (127.0.0.1): Define the host IP
* **CACHE_DIR** (~/cheese-bread-js/cache): Define where the cache files will be saved
* **LOG** (true): Display log information in the output
* **EXTERNAL_URL** (http://${HOST}:${PORT}): URL used to access the server

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

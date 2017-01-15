const fs = require('fs');
const os = require('os');
const crypto = require('crypto');
const url = require('url');
const path = require('path');

const express = require('express');
const nodeFetch = require('node-fetch');

function createApp(options) {
  const {
    dir = `${os.homedir()}/.cheesebread/cache`,
    externalUrl,
    log
  } = options;

  const app = express();

  path.resolve(dir).split(path.sep).reduce((prev, current) => {
    const partial = [prev, current].filter(v => v).join(path.sep);
    const currentPath = `${path.sep}${partial}`;

    if (partial && !fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath);
    }
    return partial;
  }, '');

  app.get('/', (req, res) => {
    res.send(`Missing target URL: ${externalUrl}/TARGET_URL`);
  });

  app.get('*', (req, res) => {
    const hash = crypto.createHash('sha256');
    const urlTarget = req.url.slice(1);
    hash.update(urlTarget);
    const filename = `${hash.digest('hex')}${path.extname(url.parse(urlTarget).pathname)}`;
    const filePath = `${dir}/${filename}`;

    new Promise((resolve, reject) => {
      fs.exists(filePath, exists => exists ? resolve(filePath) : reject());
    })
      .then(() => {
        if (log) console.log(`${urlTarget} - CACHE - ${filename}`);
        res.sendFile(filePath);
      })
      .catch(() => {
        nodeFetch(urlTarget)
          .then((fetchResponse) => {
            const destineFile = fs.createWriteStream(filePath);
            fetchResponse.body.pipe(destineFile);
            fetchResponse.body.pipe(res);
            if (log) console.log(`${urlTarget} - ONLINE - ${filename}`);
          })
          .catch(() => {
            if (log) console.log(`${urlTarget} - NOT FOUND`);
            res.status(404).send('File not found.');
          })
        ;
      })
    ;
  });
}

module.exports = createApp;
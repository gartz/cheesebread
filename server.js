const os = require('os');
const http = require('http');
const fs = require('fs');
const crypto = require('crypto');
const url = require('url');
const path = require('path');

const express = require('express');
const fetch = require('node-fetch');

const dir = path.resolve(process.env.CACHE_DIR || `${os.homedir()}/.cheese-bread-js/cache`);
const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';
const externalUrl = process.env.EXTERNAL_URL || `http://${host}:${port}`;
const log = JSON.parse(process.env.LOG || true);

const app = express();

//TODO: Create white-list support

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
    fs.exists(filePath, (exists) => {
      exists ? resolve(filePath) : reject();
    });
  })
    .then(() => {
      if (log) console.log(`${urlTarget} - CACHE - ${filename}`);
      res.sendFile(filePath);
    })
    .catch(() => {
      fetch(urlTarget)
        .then((fetchResponse) => {
          const destineFile = fs.createWriteStream(filePath);
          fetchResponse.body.pipe(destineFile);
          fetchResponse.body.pipe(res);
          if (log) console.log(`${urlTarget} - ONLINE - ${filename}`)
        })
        .catch(() => {
          if (log) console.log(`${urlTarget} - NOT FOUND`);
          res.status(404).send('File not found.');
        })
      ;
    })
  ;
});

const server = http.createServer(app);

dir.split(path.sep).reduce((prev, current) => {
  const partial = `${prev}/${current}`;
  if (!fs.existsSync(partial)) {
    fs.mkdirSync(partial);
  }
  return partial;
}, '');

server.listen(port, host, () => {
  console.log(`Cheese Bread server is listening on ${externalUrl}/`);
});

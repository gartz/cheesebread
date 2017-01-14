const os = require('os');
const http = require('http');
const path = require('path');

const createApp = require('./lib');

const dir = path.resolve(process.env.CACHE_DIR || `${os.homedir()}/.cheese-bread-js/cache`);
const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';
const externalUrl = process.env.EXTERNAL_URL || `http://${host}:${port}`;
const log = JSON.parse(process.env.LOG || true);

const server = http.createServer(createApp({ dir, externalUrl, log }));

server.listen(port, host, () => {
  console.log(`Cheese Bread server is listening on ${externalUrl}/`);
});

const test = require('tape').test;

const cheesebread = require('../lib');

const urlToFilename = cheesebread.urlToFilename;

test('Create filename', (t) => {
  t.plan(6);

  t.ok(
    !!urlToFilename('foo'),
    'Given a string, should create a hash'
  );

  t.ok(
    !urlToFilename(''),
    'Given an empty string, should return empty'
  );

  t.equal(
    urlToFilename('bar'),
    urlToFilename('bar'),
    'Given same string multiple times, should return same hash'
  );

  t.ok(
    urlToFilename('foo.bar').endsWith('.bar'),
    'Given a filename, it should generate a hash that ends with same extension'
  );

  t.ok(
    urlToFilename('http://foo.bar/zaz.qux').endsWith('.qux'),
    'Given a url, it should generate a hash that ends with same available extension'
  );

  t.ok(
    !urlToFilename('http://foo.bar/zaz').endsWith('zaz'),
    'Given a url without a file extension it should generate a string without extension'
  );
});

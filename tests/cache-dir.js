const test = require('tape').test;
const fs = require('fs');
const os = require('os');
const fse = require('fs-extra');

const cheesebread = require('../lib');

test('Should create the dir if does not exist', (t) => {
  const path = '.tmp-test';

  t.plan(1);

  // If the folder for testing exists, remove it
  fse.removeSync(path);

  cheesebread({
    dir: path
  });

  t.ok(
    fs.existsSync(path),
    'Given a sub-folder that does not exist, it should create it'
  );

  // Remove the folder after test
  fse.removeSync(path);
});

test('Should create nested dirs if path does not exist', (t) => {
  const basePath = '.tmp-test';
  const path = `${basePath}/subdir`;

  t.plan(1);

  // If the folder for testing exists, remove it
  fse.removeSync(path);

  cheesebread({
    dir: path
  });

  t.ok(
    fs.existsSync(path),
    'Given a nested sub-folder that does not exist, it should create all the path'
  );

  // Remove the folder after test
  fse.removeSync(basePath);
});

test('Should be able to create folders in the home directory', (t) => {
  const path = `${os.homedir()}/.cheesebread/tmp-test`;

  t.plan(1);

  // If the folder for testing exists, remove it
  fse.removeSync(path);

  cheesebread({
    dir: path
  });

  t.ok(
    fs.existsSync(path),
    'Given a folder that does not exist in the home path, it should create it'
  );

  // Remove the folder after test
  fse.removeSync(path);
});

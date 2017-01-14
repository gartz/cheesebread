#! /usr/bin/env node
'use strict';

const os = require('os');
const fs = require('fs');
const path = require('path');
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');

const optionDefinitions = [
  {
    name: 'cache-dir',
    alias: 'c',
    type: String,
    defaultOption: true,
    typeLabel: `[underline]{folder}`,
    description: 'The folder where cached data will be stored.'
  },
  {
    name: 'host',
    alias: 'h',
    type: String,
    typeLabel: '[underline]{127.0.0.1}',
    description: 'The ip allowed to access this server.'
  },
  {
    name: 'port',
    alias: 'p',
    type: Number,
    typeLabel: '[underline]{3000}',
    description: 'The ip allowed to access this server.'
  },
  {
    name: 'verbose',
    alias: 'v',
    type: Boolean,
    description: 'Display detailed log of hits in the store or online.'
  },
  {
    name: 'help',
    alias: '?',
    type: Boolean,
    description: 'Print this usage guide.'
  }
];

try {
  var cliOptions = commandLineArgs(optionDefinitions);
} catch (err) {
  console.error(err.message);
  process.exit(1)
}

if (cliOptions.help) {
  const sections = [
    {
      header: 'Cheese Bread JS - cheesebread',
      content: 'A delicious and easy to cook CDN file caching for offline development environments.'
    },
    {
      content: 'cheesebread [bold]{[options]} [bold]{[<cache-dir>]}'
    },
    {
      content: `cheesebread [bold]{--host} 127.0.0.1 [bold]{-p} 3000 [bold]{${os.homedir()}/.cheese-bread-js/cache}`
    },
    {
      header: 'Options',
      optionList: optionDefinitions
    },
    {
      content: 'Project home: [underline]{https://github.com/gartz/cheese-bread-js}'
    }
  ];

  const usage = commandLineUsage(sections);
  console.log(usage);
  process.exit(0);
}

if (cliOptions['cache-dir'] !== undefined) process.env.CACHE_DIR = cliOptions['cache-dir'];
if (cliOptions.port !== undefined) process.env.PORT = cliOptions.port;
if (cliOptions.host !== undefined) process.env.HOST = cliOptions.host;
if (cliOptions.verbose !== undefined) process.env.LOG = cliOptions.verbose;

require('./server');

#!/usr/bin/env node

var chalk = require('chalk');
var exec = require('child_process').execSync;
var fs = require('fs');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var link = require('./lib/link');

var usage =
  'Usage: npm-link-shared <shared-modules-dir> <target-installation-dir> [<module1..> [, <module2..>]] [--yarn] [--include-dev] [--include-peer] [--<npm-link-option> [--<npm-link-option>]]';

if (argv._.length < 2) {
  console.log(usage);
  return;
}

var sharedDir = argv._[0];
var targetDir = argv._[1];

if (!sharedDir || !targetDir) {
  console.log(usage);
  return;
}

function ensureSlash(s) {
  if (s[s.length - 1] !== '/') {
    return s + '/';
  }
  return s;
}

sharedDir = ensureSlash(sharedDir);
targetDir = ensureSlash(targetDir);

var moduleWhiteList = [];
if (argv._.length > 2) {
  for (var i = 2; i < argv._.length; i++) {
    moduleWhiteList.push(argv._[i]);
  }
}

var executable = argv['yarn'] ? 'yarn' : 'npm';
var includeDev = argv['include-dev'] ? true : false;
var includePeer = argv['include-peer'] ? true : false;

delete argv['_'];
delete argv['yarn'];
delete argv['include-dev'];
delete argv['include-peer'];

var linkOptions = Object.keys(argv).map(function(optionName) {
  return '--' + optionName + '=' + argv[optionName];
});

link(sharedDir, targetDir, {
  moduleWhiteList: moduleWhiteList,
  executable: executable,
  includeDev: includeDev,
  includePeer: includePeer,
  linkOptions: linkOptions,
});

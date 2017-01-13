#! /usr/bin/env node
'use strict';
var handleShellResponse = require('../lib/handle-shell-response');
var shellExec = require('child_process').exec;
var version = require('../package.json').version;

shellExec('find ./node_modules/ -maxdepth 2 -type l -ls', _handleShellResponse);

function _handleShellResponse (error, response) {
  if (hasOption('-h') || hasOption('--help')) {
    return displayHelp();
  }

  if (hasOption('-v') || hasOption('--version')) {
    return console.log('v' + version);
  }

  var shouldDisplaySource = hasOption('-s') || hasOption('--source');
  var shouldPrettyPrint = hasOption('-p') || hasOption('--prettify');
  var opts = {
    error: error,
    console: console,
    shouldDisplaySource: shouldDisplaySource,
    shouldPrettyPrint: shouldPrettyPrint
  };

  handleShellResponse(response, opts);
}

function hasOption (arg) {
  return process.argv.indexOf(arg) > -1;
}

function displayHelp () {
  var helpMessage = [
    '',
    'Link Status',
    '',
    'Usage: link-status [options]',
    '',
    'Options:',
    '  -h, --help\t\tShow this message',
    '  -v, --version\t\tShow version number',
    '  -s, --source\t\tShow link source',
    '  -p, --prettify\tPrettify the output',
    ''
  ].join('\n');

  console.log(helpMessage);
}

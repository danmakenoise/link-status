#! /usr/bin/env node
'use strict';
var handleShellResponse = require('../lib/handle-shell-response');
var shellExec = require('child_process').exec;

shellExec('find ./node_modules/ -maxdepth 2 -type l -ls', _handleShellResponse);

function _handleShellResponse (error, response) {
  if (hasOption('-h') || hasOption('--help')) {
    return displayHelp();
  }

  var shouldDisplaySource = hasOption('-s') || hasOption('--source');
  var shouldPrettyPrint = hasOption('-p') || hasOption('--pretty');
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
    '  -s, --source\t\tShow link source',
    '  -p, --prettyify\tPrettify the output',
    ''
  ].join('\n');

  console.log(helpMessage);
}

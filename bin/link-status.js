#! /usr/bin/env node
'use strict';
var handleShellResponse = require('../lib/handle-shell-response');
var shellExec = require('child_process').exec;

shellExec('find ./node_modules/ -maxdepth 2 -type l -ls', _handleShellResponse);

function _handleShellResponse (error, response) {
  var shouldDisplaySource = process.argv[2] === '-s';
  var opts = {
    error: error,
    console: console,
    shouldDisplaySource: shouldDisplaySource
  };

  handleShellResponse(response, opts);
}

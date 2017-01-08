#! /usr/bin/env node
'use strict';
var shellExec = require('child_process').exec;

shellExec('find ./node_modules/ -maxdepth 2 -type l -ls', function (error, output) {
  if (error) {
    console.error(error);
  }

  var lines = output.split('\n');
  var linkedModuleLines = lines.filter(function (line) {
    var isValidLink = line.indexOf('./node_modules//.bin') === -1;
    var isValidLine = line.indexOf('./node_modules') >= 0;
    return (isValidLink && isValidLine);
  });

  var linkedModules = linkedModuleLines.map(function (line) {
    var matcher;

    if (process.argv[2] === '-s') {
      matcher = /\.\/node_modules\/\/(.+)/;
    } else {
      matcher = /\.\/node_modules\/\/(.+) ->/;
    }

    var moduleInfo = line.match(matcher);
    return moduleInfo.length && moduleInfo[1];
  });

  console.log(linkedModules.join('\n'));
});

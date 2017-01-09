require('colors');
var getValidLines = require('./get-valid-lines');
var formatLine = require('./format-line');

function handleShellResponse (response, opts) {
  if (opts.error) {
    opts.console.error(opts.error);
  }

  var validLines = getValidLines(response);

  var formattedLines = validLines.map(function (line) {
    return formatLine(line, opts);
  });

  var errorMessage = 'NO LINKS FOUND';

  if (opts.shouldPrettyPrint) {
    errorMessage = '\n\t' + ' NO LINKS FOUND '.bgRed.italic.black + '\n';
  }
  if (!formattedLines.length) {
    opts.console.log(errorMessage);
  }

  formattedLines.forEach(function (line) {
    opts.getAndReplaceSource(line, function (sourcedLine) {
      opts.console.log(sourcedLine);
    });
  });
}

module.exports = handleShellResponse;

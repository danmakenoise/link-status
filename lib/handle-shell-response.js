require('colors');
var getValidLines = require('./get-valid-lines');
var formatLine = require('./format-line');

function handleShellResponse (response, opts) {
  if (opts.error) {
    opts.console.error(opts.error);
  }

  var validLines = getValidLines(response);

  var formattedLines = validLines.map(function (line) {
    return formatLine(line, opts.shouldDisplaySource);
  });

  var errorMessage = '\n\t' + ' NO LINKS FOUND '.bgRed.italic.black + '\n';

  opts.console.log(formattedLines.join('\n') || errorMessage);
}

module.exports = handleShellResponse;

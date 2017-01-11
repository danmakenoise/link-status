require('colors');

function formatLine (line, _opts) {
  var opts = _opts || {};
  var matcher;

  if (opts.shouldDisplaySource) {
    matcher = /\.\/node_modules\/\/(.+)/;
  } else {
    matcher = /\.\/node_modules\/\/(.+) ->/;
  }

  var linkInfo = line.match(matcher);
  var output = linkInfo && linkInfo.length && linkInfo[1].split(/ ->/g);
  if (!output) return '';

  var linkedModule = output[0] ? output[0] : '';
  var moduleSource = output[1] ? '\n  ╚═══' + output[1] : '';

  if (opts.shouldPrettyPrint) {
    linkedModule = '✔'.green + ' ' + linkedModule.yellow;
    moduleSource = output[1] ? ('\n\t  ╚═══' + output[1]).yellow.dim : '';
    return '\n\t' + linkedModule + moduleSource + '\n';
  }

  return linkedModule + moduleSource;
}

module.exports = formatLine;

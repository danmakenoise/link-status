require('colors');

function formatLine (line, shouldDisplaySource) {
  var matcher;

  if (shouldDisplaySource) {
    matcher = /\.\/node_modules\/\/(.+)/;
  } else {
    matcher = /\.\/node_modules\/\/(.+) ->/;
  }

  var linkInfo = line.match(matcher);

  var output = linkInfo && linkInfo.length && linkInfo[1].split(/ ->/g);

  if (!output) return '';

  var linkedModule = (output[0]) ? ('✔'.green + ' ' + output[0].yellow) : '';
  var moduleSource = output[1] ? ('\n\t  ▶' + output[1]).blue : '';
  return '\n\t' + linkedModule + moduleSource + '\n';
}

module.exports = formatLine;

function formatLine (line, shouldDisplaySource) {
  var matcher;

  if (shouldDisplaySource) {
    matcher = /\.\/node_modules\/\/(.+)/;
  } else {
    matcher = /\.\/node_modules\/\/(.+) ->/;
  }

  var linkInfo = line.match(matcher);
  var output = linkInfo && linkInfo.length && linkInfo[1].replace(/ ->/g, '\n  ->');

  return output || '';
}

module.exports = formatLine;

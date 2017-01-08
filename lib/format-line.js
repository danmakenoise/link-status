function formatLine (line, shouldDisplaySource) {
  var matcher;

  if (shouldDisplaySource) {
    matcher = /\.\/node_modules\/\/(.+)/;
  } else {
    matcher = /\.\/node_modules\/\/(.+) ->/;
  }

  var linkInfo = line.match(matcher);
  return linkInfo.length && linkInfo[1];
}

module.exports = formatLine;

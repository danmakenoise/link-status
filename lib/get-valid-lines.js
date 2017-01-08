function getValidLines (output) {
  var lines = output.split('\n');

  return lines.filter(function (line) {
    var isValidLink = line.indexOf('./node_modules//.bin') === -1;
    var isValidLine = line.indexOf('./node_modules') >= 0;

    return (isValidLink && isValidLine);
  });
}

module.exports = getValidLines;


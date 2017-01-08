var formatLine = require('../lib/format-line');
var test = require('tape');

test('formatLine() with shouldDisplaySource = false', function (t) {
  var invalidLine = ' ';
  var validLine = '42697913        8 lrwxr-xr-x    1 dan              staff                  62 Jan  8 15:40 ./node_modules//miclint -> ../.nvm/versions/node/v6.9.1/lib/node_modules/miclint';

  t.equal(
    formatLine(invalidLine),
    '',
    'it returns an empty string when the line is invalid'
  );

  t.equal(
    formatLine(validLine),
    'miclint',
    'it returns the name of the linked module when the line is valid'
  );

  t.end();
});

test('formatLine() with shouldDisplaySource = true', function (t) {
  var invalidLine = ' ';
  var validLine = '42697913        8 lrwxr-xr-x    1 dan              staff                  62 Jan  8 15:40 ./node_modules//miclint -> ../.nvm/versions/node/v6.9.1/lib/node_modules/miclint';

  t.equal(
    formatLine(invalidLine, true),
    '',
    'it returns an empty string when the line is invalid'
  );

  t.equal(
    formatLine(validLine, true),
    'miclint\n  -> ../.nvm/versions/node/v6.9.1/lib/node_modules/miclint',
    'it returns the name of the linked module and its source when the line is valid'
  );

  t.end();
});

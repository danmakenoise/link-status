var test = require('tape');
var getValidLines = require('../lib/get-valid-lines');

test('getValidLines()', function (t) {
  var invalidOutput = '42584047        8 lrwxr-xr-x    1 dan              staff                  26 Jan  8 14:29 ./node_modules//.bin/semistandard -> ../semistandard/bin/cmd.js';
  var validOutput = '42697913        8 lrwxr-xr-x    1 dan              staff                  62 Jan  8 15:40 ./node_modules//miclint -> ../.nvm/versions/node/v6.9.1/lib/node_modules/miclint';
  var mixedOutput = invalidOutput + '\n' + validOutput;

  t.deepEqual(
    getValidLines(invalidOutput),
    [],
    'it returns an empty array when all lines are invalid'
  );

  t.deepEqual(
    getValidLines(validOutput),
    [validOutput],
    'it returns an array of the valid lines when all lines are valid'
  );

  t.deepEqual(
    getValidLines(mixedOutput),
    [validOutput],
    'it returns an array of only the valid lines when some lines are invalid'
  );

  t.end();
});

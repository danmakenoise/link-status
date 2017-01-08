var test = require('tape');
var formatLine = require('../lib/format-line');
var getValidLines = require('../lib/get-valid-lines');
var handleShellResponse = require('../lib/handle-shell-response');

function createMockOpts (opts) {
  var consoleLogArgs;
  var consoleErrorArgs;

  return {
    results: {
      consoleLogArgs: function () {
        return consoleLogArgs;
      },
      consoleErrorArgs: function () {
        return consoleErrorArgs;
      }
    },
    console: {
      error: function (args) {
        consoleErrorArgs = args;
      },
      log: function (args) {
        consoleLogArgs = args;
      }
    },
    error: opts.error,
    shouldDisplaySource: opts.shouldDisplaySource
  };
}

function processResponse (response, opts) {
  var validLines = getValidLines(response);
  var formattedLines = validLines.map(function (line) {
    return formatLine(line, opts.shouldDisplaySource);
  });

  return formattedLines.join('\n');
}

test('handleShellResponse()', function (t) {
  var invalidLine = '42584047        8 lrwxr-xr-x    1 dan              staff                  26 Jan  8 14:29 ./node_modules//.bin/semistandard -> ../semistandard/bin/cmd.js';
  var validLine = '42697913        8 lrwxr-xr-x    1 dan              staff                  62 Jan  8 15:40 ./node_modules//miclint -> ../.nvm/versions/node/v6.9.1/lib/node_modules/miclint';

  var mixedOutput = invalidLine + '\n' + validLine;
  var nullOutput = invalidLine + '\n' + invalidLine;

  var mockDefaultOpts = createMockOpts({});
  var mockErrorOpts = createMockOpts({ error: 'error' });
  var mockSourceOpts = createMockOpts({ shouldDisplaySource: true });

  handleShellResponse(mixedOutput, mockDefaultOpts);
  t.equal(
    mockDefaultOpts.results.consoleLogArgs(),
    processResponse(mixedOutput, {}),
    'it console logs the formatted output with default opts'
  );

  handleShellResponse(nullOutput, mockDefaultOpts);
  t.equal(
    mockDefaultOpts.results.consoleLogArgs(),
    'no links found',
    'it console logs "no links found" when no valid links are present'
  );

  handleShellResponse(mixedOutput, mockErrorOpts);
  console.log(mockErrorOpts);
  t.equal(
    mockErrorOpts.results.consoleErrorArgs(),
    'error',
    'it console errors when an error is passed in with opts'
  );

  handleShellResponse(mixedOutput, mockSourceOpts);
  t.equal(
    mockSourceOpts.results.consoleLogArgs(),
    processResponse(mixedOutput, { shouldDisplaySource: true }),
    'it console logs the formatted output with sources displayed'
  );

  t.end();
});

# link-status [![Build Status](https://travis-ci.org/danmakenoise/link-status.svg?branch=travis)](https://travis-ci.org/danmakenoise/link-status)
A simple command line tool to display linked modules in the current directory. Supports private registries.

## Installation
```shell
npm install -g link-status
```

## Usage
```shell
link-status [options]
```

## Options
```
  -h, --help         Show help message
  -v, --version      Show version number
  -s, --source       Show link source
  -p, --prettify     Prettify the output
```

## Output
```shell
// link-status

webpack
miclint

```

```shell
// link-status -s

webpack
  ╚═══ ../../../../../.nvm/versions/node/v6.9.1/lib/node_modules/webpack
miclint
  ╚═══ ../../../../.nvm/versions/node/v6.9.1/lib/node_modules/miclint

```

# link-status [![Build Status](https://travis-ci.org/danmakenoise/link-status.svg?branch=travis)](https://travis-ci.org/danmakenoise/link-status)
A simple command line tool to display linked modules in the current directory. Supports private registries.

## Installation
```shell
npm install -g link-status
```

## Usage
You can run `link-status` by itself or with the `-s` flag to display the source directories of your linked modules.
```shell
link-status [-s]
```

## Output
```shell
// link-status

✔ webpack

✔ miclint

```

```shell
// link-status -s

✔ webpack
  ▶ ../../../../../.nvm/versions/node/v6.9.1/lib/node_modules/webpack

✔ miclint
  ▶ ../../../../.nvm/versions/node/v6.9.1/lib/node_modules/miclint

```

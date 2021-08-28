# ⏳ Routines

Put your (good) habits in order

## Deployment

The app comprises of static, javascript-enabled pages and can be run from any webserver.

## Development

### Dependencies

One of...

- Python 3:

  - http.server [built-in]

- NPM:

  - [Browsersync](https://browsersync.io/)

## Setup

Choose one of the methods below.

### 1. NPM

From the root project folder, run:

    # install node modules
    npm install
    # start browser synchroniser
    ./node_modules/.bin/browser-sync start --server '../' --port 8080 --no-open --watch

Then browse to http://localhost:8080/routines

### 2. Python

From the root project folder, run:

    ./serve.py

Then browse to http://localhost:8080/routines

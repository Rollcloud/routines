# routines

Put your (good) habits in order

## Deployment

The app comprises of static, javascript-enabled pages and can be run from any webserver.

## Development

### Dependencies

- npm
- [Browsersync](https://browsersync.io/)

## Setup

From the root project folder, run:

    # install node modules
    npm install
    # start browser synchroniser
    ./node_modules/.bin/browser-sync start --server '../' --port 8080 --no-open --watch

Then browse to `http://localhost:8080`

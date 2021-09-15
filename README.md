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

## Colours

While the colour scheme is taken from [Bootstrap 5](https://getbootstrap.com/docs/5.1/customize/color/), the main colours used are:

- Blue (primary) - ![#0d6efd](https://via.placeholder.com/20/0d6efd/000000?text=+) `#0d6efd`
- Ateneo Blue - ![#0b3772](https://via.placeholder.com/20/0b3772/000000?text=+) `#0b3772`
- Dark - ![#212529](https://via.placeholder.com/20/212529/000000?text=+) `#212529`

# QRCodeService.js
A node.js micro service for generating QR codes with embedded URLs, passed as a query parameter.

Features
- Generate QR code as SVG (using package qr-image)
- Application life-cycle management
    * Pre-start setup hook
    * Shutdown hook on 'SIGINT' and 'SIGTERM' for pre-exit cleanup or data saving.
- Logging using [log4js](https://github.com/nomiddlename/log4js-node)
    * Config includes both rotating file and console logging
- Application config injection
    * Simple pattern for injecting config and logger info in modules (see `routes/qrCodeGenerator.js` for example)
- Built in form parsing with Formidable
    * Example includes file upload form
- Example test cases 
    * Using [Mocha](http://visionmedia.github.io/mocha/) and [Should](https://github.com/visionmedia/should.js/)

## Install
First clone/save this repo

    cd QRCodeService.js
    mkdir logs
	npm install
## Run
	npm start
## Run tests
	npm test
	
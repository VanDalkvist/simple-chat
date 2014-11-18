/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var path = require('path');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if (config.seedDB) {
    require('./config/seed.js').local();
}

if (config.env === 'production') {
    require('./config/seed.js').prod();
}

// Setup server
var app = express();

var fs = require('fs');

var keyPath = path.join(config.root, 'server/key.pem');
console.log("path: " + keyPath);
var options = {
    key: fs.readFileSync((config.env !== 'production') ? './server/key.pem' : keyPath, 'utf8'),
    cert: fs.readFileSync((config.env !== 'production') ? './server/cert.pem' : path.join(config.root, 'server/cert.pem'), 'utf8'),
    ca: fs.readFileSync((config.env !== 'production') ? './server/csr.pem' : path.join(config.root, 'server/csr.pem'), 'utf8')
};

var httpServer = require('http').createServer(app);
var httpsServer = require('https').createServer(options, app);

var socketio = require('socket.io').listen(httpsServer, {
    serveClient: (config.env !== 'production'),
    path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
console.log("port = %d ; ip = %s ", config.port, config.ip);

httpServer.listen(80);
httpsServer.listen(443);

//, config.ip || localhost, function () {
//    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
//});

// Expose app
module.exports = app;

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
var envConfig = require('./config/seed.js');
if (config.seedDB) {
    envConfig.local();
}

if (config.env === 'production') {
    envConfig.prod();
}

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
    serveClient: (config.env === 'production') ? false : true,
    path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

//, config.ip || localhost, function () {
//    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
//});

// Expose app
module.exports = app;

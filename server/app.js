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

var envConfig = require('./config/seed.js');		
envConfig.local();

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
    serveClient: config.env !== 'production',
    path: '/socket.io-client'
});
require('./config/socketio').init(socketio);
require('./config/express').init(app);
require('./routes').init(app);

// Start server
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
module.exports = app;

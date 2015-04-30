/**
 * Express configuration
 */

'use strict';

// dependencies

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');

// exports

module.exports.init = _init;

// private functions

function _init(app) {
    var env = app.get('env');
    var routers = {'development': _dev(app), 'test': _dev(app), 'production': _prod(app)};

    app.set('views', config.root + '/server/views');
    app.set('view engine', 'jade');

    app.use(compression());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(passport.initialize());

    routers[env]();
}

function _prod(app) {
    return function () {
        console.log("Server was running under production mode: " + path.join(config.root, 'public'));
        app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
        app.use(express.static(path.join(config.root, 'public')));
        app.set('appPath', config.root + '/public');
        app.use(morgan('dev'));
    }
}

function _dev(app) {
    return function () {
        console.log("Server was running under development environment.");
        app.use(require('connect-livereload')());
        app.use(express.static(path.join(config.root, '.tmp')));
        app.use(express.static(path.join(config.root, 'client')));
        app.set('appPath', path.join(config.root, 'client'));
        app.use(morgan('dev'));
        app.use(errorHandler()); // Error handler - has to be last
    }
}

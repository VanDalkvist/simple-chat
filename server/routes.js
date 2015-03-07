/**
 * Main application routes
 */

'use strict';

// dependencies

var path = require('path');

var errors = require('./components/errors');

// exports

module.exports.init = _init;

// private functions

function _init(app) {

    // Insert routes below

    app.use(function noCache(req, res, next) {
        // added no-cache header for stupid IE;
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
        next();
    });

    app.use('/api/messages', require('./api/message'));
    app.use('/api/users', require('./api/user'));

    app.use('/auth', require('./auth'));

    app.use(errors[401]);

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/*')
        .get(function (req, res) {
            res.sendFile(path.join(app.get('appPath'), '/index.html'));
        });
}

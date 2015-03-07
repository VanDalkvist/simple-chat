/**
 * Socket.io configuration
 */

'use strict';

// dependencies

var config = require('./environment');

// exports

module.exports.init = _init;

// private functions

/**
 * socket.io (v1.x.x) is powered by debug.
 * In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
 * ex: DEBUG: "http*,socket.io:socket"
 *
 * We can authenticate socket.io users and access their token through socket.handshake.decoded_token
 * You will need to send the token in `client/components/socket/socket.service.js`
 * @param socketio socket.io module instance
 * @private
 */
function _init(socketio) {
    // Require authentication here:
    socketio.use(require('socketio-jwt').authorize({
        secret: config.secrets.session,
        handshake: true
    }));

    socketio.on('connection', function (socket) {
        socket.address = socket.handshake.address + ":" + config.port;

        socket.connectedAt = new Date();

        // Call _onDisconnect.
        socket.on('disconnect', function () {
            _onDisconnect(socket);
            console.info('[%s] DISCONNECTED', socket.address);
        });

        // Call _onConnect.
        _onConnect(socket);
        console.info('[%s] CONNECTED', socket.address);
    });
}

/**
 * When the user disconnects.. perform this
 */
function _onDisconnect(socket) {
}

/**
 * When the user connects.. perform this
 */
function _onConnect(socket) {
    // When the client emits 'info', this listens and executes
    socket.on('info', function (data) {
        console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
    });

    // Insert sockets below
    require('../api/message/message.socket').register(socket);
}

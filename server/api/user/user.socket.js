/**
 * Broadcast updates to client when the model changes
 */

// dependencies

var moment = require('moment');

'use strict';

var User = require('./user.model');

exports.register = function (socket, io) {
    socket.on('user:out', _userIsOut);
    socket.on('user:on', _userIsOn);

    function _userIsOut(user, callback) {
        io.sockets.emit('users:out', user.name);
        callback(user);
    }

    function _userIsOn(user, callback) {
        io.sockets.emit('users:on', user.name);
        callback(user);
    }
};

/**
 * Broadcast updates to client when the model changes
 */

// dependencies

var moment = require('moment');

'use strict';

var Message = require('./message.model');

exports.register = function (socket, io) {
    socket.on('message:save', _saveMessage);
    socket.on('message:fetch-all', _getAll);

    function _saveMessage(data, callback) {
        var message = new Message(data);
        message.save(function (err) {
            if (err) return callback(err);

            io.sockets.emit('message:saved', data);
            callback(data);
        });
    }

    function _getAll(data, callback) {
        var query = {createdAt: {"$gte": moment().startOf('day').toDate()}};
        var options = {sort: {'createdAt': -1}, limit: 200};
        Message.find(query, {}, options, function (err, messages) {
            if (err) return callback(err);

            callback(messages);
        });
    }
};

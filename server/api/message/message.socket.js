/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var message = require('./message.model');

exports.register = function (socket) {
    message.schema.post('save', function (doc) {
        console.log('onSave running... ');
        onSave(socket, doc);
    });
};

function onSave(socket, doc, cb) {
    socket.emit('message:save', doc);
}

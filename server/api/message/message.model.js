'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
    text: String,
    createdAt: {type: Date, index: {expires: '7d'}},
    author: String
});

function init() {
    return mongoose.model('Message', MessageSchema);
}

module.exports = init();

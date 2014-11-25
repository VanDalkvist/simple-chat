'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
    text: String,
    createdAt: {type: Date, index: {expires: '7d'}},
    author: {type: Schema.Types.Mixed}
});

function init() {
    return mongoose.model('Message', MessageSchema);
}

module.exports = init();

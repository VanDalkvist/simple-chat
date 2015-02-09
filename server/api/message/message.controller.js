/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /messages              ->  index
 * POST    /messages              ->  create
 * GET     /messages/:id          ->  show
 * PUT     /messages/:id          ->  update
 * DELETE  /messages/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Message = require('./message.model');
var moment = require('moment');

// Get list of messages
exports.index = function (req, res) {
    var query = {createdAt: {"$gte": moment().startOf('day').toDate()}};
    var options = {sort: {'createdAt': -1}, limit: 200};
    Message.find(query, {}, options, function (err, messages) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(messages);
    });
};

// Get a single message
exports.show = function (req, res) {
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return handleError(res, err);
        }
        if (!message) {
            return res.status(404).end();
        }
        return res.json(message);
    });
};

// Creates a new message in the DB.
exports.create = function (req, res) {
    Message.create(req.body, function (err, message) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(message);
    });
};

// Updates an existing message in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return handleError(res, err);
        }
        if (!message) {
            return res.status(404).end();
        }
        var updated = _.merge(message, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(message);
        });
    });
};

// Deletes a message from the DB.
exports.destroy = function (req, res) {
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return handleError(res, err);
        }
        if (!message) {
            return res.status(404).end();
        }
        message.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).end();
        });
    });
};

exports.removeAll = function (req, res) {
    Message.find().remove(function (err) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).end();
    });
};

function handleError(res, err) {
    return res.send(500, err);
}

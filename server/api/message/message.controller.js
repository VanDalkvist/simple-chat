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

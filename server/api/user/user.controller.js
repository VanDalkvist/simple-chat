'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function (res, err) {
    return res.status(422).json(err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function (req, res) {
    User.find({}, '-salt -hashedPassword', function (err, users) {
        if (err) return res.status(500).json(err);
        res.json(users);
    });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.save(function (err, user) {
        if (err) return validationError(res, err);
        var token = jwt.sign({_id: user._id}, config.secrets.session, {expiresInMinutes: 60 * 5});
        res.json({token: token});
    });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
    var userId = req.params.id;

    User.findById(userId, function (err, user) {
        if (err) return next(err);
        if (!user) return res.status(401).end();
        res.json(user.profile);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).json(err);
        return res.status(204).end();
    });
};

/**
 * Change a users password
 */
exports.changePassword = function (req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findById(userId, function (err, user) {
        if (user.authenticate(oldPass)) {
            user.password = newPass;
            user.save(function (err) {
                if (err) return validationError(res, err);
                res.status(200).end();
            });
        } else {
            res.status(403).end();
        }
    });
};

exports.isAdmin = function _isAdmin(req, res, next) {
    res.send(req.user.role == 'admin');
};

/**
 * Get my info
 */
exports.me = function (req, res, next) {
    var userId = req.user._id;
    // don't ever give out the password or salt
    User.findOne({_id: userId}, '-salt -hashedPassword', function (err, user) {
        if (err) return next(err);
        if (!user) return res.redirect('/');
        res.json(user);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function (req, res, next) {
    res.redirect('/');
};

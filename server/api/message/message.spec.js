'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest')(app);
var agentHelper = require('../../tests/core/login-helper');
var User = require('../user/user.model');
var _ = require('lodash');

describe('GET /api/messages', function () {

    var agent;
    var token;

    before(function (done) {
        var password = 'password';
        var userModel = new User({
            provider: 'local',
            name: 'Fake User',
            email: 'test1@test1.com',
            password: password
        });

        User.remove().exec().then(function () {
            userModel.save(function (err, user) {
                should.not.exist(err);
                should.exist(user);

                agentHelper.login(request, {email: user.email, password: password}, function (loginAgent, credentials) {
                    agent = loginAgent;
                    token = credentials.token;
                    done();
                });
            });
        });
    });

    afterEach(function (done) {
        User.remove().exec().then(function () {
            done();
        });
    });
});

'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest')(app);
var agentHelper = require('../../tests/core/login-helper');
var User = require('../user/user.model');

describe('GET /api/messages', function () {

    var agent;
    var token;

    before(function (done) {
        var user = new User({
            provider: 'local',
            name: 'Fake User',
            email: 'test@test.com',
            password: 'password'
        });

        user.save(function (err, user) {
            should.not.exist(err);
            should.exist(user);

            agentHelper.login(request, function (loginAgent, credentials) {
                agent = loginAgent;
                token = credentials.token;
                done();
            });
        });
    });

    afterEach(function (done) {
        User.remove().exec().then(function () {
            done();
        });
    });

    it('should respond with JSON array', function (done) {
        var reg = request.get('/api/messages');
        agent.attachCookies(reg);
        reg
            .set({'Authorization': 'Bearer ' + token})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);

                done();
            });
    });
});

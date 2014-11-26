/*
 * SuperAgent Login helper for tests
 */

// #region dependents

var superAgent = require('superagent');
var agent = superAgent.agent();

var User = require('../../api/user/user.model');

// #region initialization

var user = {
    email: 'test@test.com',
    password: 'password'
};

// #region private methods

function _login(request, done) {
    request
        .post('/auth/local')
        .send(user)
        .expect(200)
        .end(function (err, res) {
            if (err) {
                throw err;
            }
            done(agent, {token: res.body.token});
        });
}
// #region exports

exports.login = _login;

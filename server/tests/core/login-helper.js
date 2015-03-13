/*
 * SuperAgent Login helper for tests
 */

// #region dependents

var superAgent = require('superagent');
var agent = superAgent.agent();

// #region initialization

// #region private methods

function _login(request, user, done) {
    console.log(user);
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

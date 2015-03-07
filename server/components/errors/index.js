/**
 * Error responses
 */

'use strict';

module.exports[404] = _pageNotFound;
module.exports[401] = _unauthorized;

// private functions

function _pageNotFound(req, res) {
    var viewFilePath = '404';
    var statusCode = 404;
    var result = {
        status: statusCode
    };

    res.status(result.status);
    res.render(viewFilePath, function (err) {
        if (err) {
            return res.json(result, result.status);
        }

        res.render(viewFilePath);
    });
}

function _unauthorized(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.send(401, 'invalid token...');
    }
    next(err);
}

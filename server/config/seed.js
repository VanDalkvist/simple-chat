/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');

function _local() {
    User.find({}).remove(function () {
        User.create({
                provider: 'local',
                name: 'Test User',
                email: 'test@test.com',
                password: 'test'
            }, {
                provider: 'local',
                role: 'admin',
                name: 'Admin',
                email: 'admin@admin.com',
                password: 'admin'
            }, function () {
                console.log('finished populating users');
            }
        );
    });
}

function _prod() {
}

module.exports = { local: _local, prod: _prod };

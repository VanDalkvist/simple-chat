
'use strict';

angular.module('simple-chat.app')
    .factory('User', function ($resource) {
        return $resource('/api/users/:id/:action', {id: '@_id'}, {
            changePassword: {method: 'PUT', params: {action: 'password'}},
            get: {method: 'GET', params: {id: 'me'}}
        });
    });

'use strict';

angular.module('simpleChatApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('admin', {
                url: '/admin',
                templateUrl: 'app/admin/admin.html',
                controller: 'AdminCtrl'
            });
    });

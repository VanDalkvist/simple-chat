'use strict';

angular.module('simple-chat.app')
    .config(function ($stateProvider) {
        $stateProvider
            .state('admin', {
                url: '/admin',
                parent: 'main',
                views: {
                    'content@main': {
                        templateUrl: 'app/admin/admin.html',
                        controller: 'AdminCtrl'
                    }
                }
            });
    });

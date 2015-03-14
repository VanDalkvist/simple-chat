'use strict';

angular.module('simple-chat.app')
    .config(function ($stateProvider) {
        console.debug("admin.routes: Configuring 'admin' routes.");

        $stateProvider
            .state('admin', {
                url: '/admin',
                parent: 'main',
                views: {
                    'content@main': {
                        templateUrl: 'app/components/admin/admin.html',
                        controller: 'AdminCtrl'
                    }
                }
            });
    });

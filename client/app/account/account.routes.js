'use strict';

angular.module('simple-chat.app')
    .config(function ($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/account/login/login.html',
                controller: 'LoginCtrl',
                resolve: {
                    currentUser: ['$location', 'Auth', function ($location, Auth) {
                        var currentUser = Auth.getCurrentUser();
                        if (!_.isEmpty(currentUser)) return $location.path('/');
                        return undefined;
                    }]
                }
            })
            .state('settings', {
                url: '/settings',
                authenticate: true,
                parent: 'main',
                views: {
                    'content@main': {
                        templateUrl: 'app/account/settings/settings.html',
                        controller: 'SettingsCtrl'
                    }
                }
            }
        );
    });

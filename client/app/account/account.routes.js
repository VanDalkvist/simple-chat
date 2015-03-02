'use strict';

angular.module('simple-chat.app')
    .config(function ($stateProvider) {
        console.debug("account.routes: Configuring [login, settings] routes.");

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/account/login/login.html',
                controller: 'LoginCtrl',
                //parent: 'main',
                resolve: {
                    currentUser: ['$state', '$log', 'Auth', function ($state, $log, Auth) {
                        var currentUser = Auth.getCurrentUser();
                        if (!_.isEmpty(currentUser)) {
                            $log.log("currentUser - resolve: Current user is loaded. Redirect to main page.");
                            return $state.go('home');
                        }
                        $log.log("currentUser - resolve: Current user is empty.");
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

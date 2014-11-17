'use strict';

angular.module('simpleChatApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl',
                resolve: {
                    currentUser: ['Auth', function (Auth) {
                        return Auth.getCurrentUser();
                    }]
                }
            });
    });

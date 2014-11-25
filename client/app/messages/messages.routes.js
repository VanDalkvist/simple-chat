'use strict';

angular.module('simpleChatApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MessagesCtrl',
                resolve: {
                    currentUser: ['Auth', function (Auth) {
                        return Auth.getCurrentUser();
                    }]
                }
            });
    });

'use strict';

angular.module('simple-chat.app')
    .config(function ($stateProvider) {
        console.debug("account.routes: Configuring 'login' routes.");

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/account/login/login.html',
                controller: 'LoginCtrl'
            });
    });

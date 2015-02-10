(function () {

    'use strict';

    angular.module('simple-chat.app')
        .config(function ($stateProvider) {
            $stateProvider
                .state('home', {
                    url: '/',
                    parent: 'main',
                    views: {
                        'content@main': {
                            templateUrl: 'app/messages/messages.html',
                            controller: 'MessagesCtrl'
                        }
                    }
                });
        });
})();

(function () {

    'use strict';

    angular.module('simple-chat.app')
        .config(function ($stateProvider) {
            console.debug("messages.routes: Configuring 'home' routes.");

            $stateProvider
                .state('home', {
                    url: '/',
                    parent: 'main',
                    authenticate: true,
                    views: {
                        'content@main': {
                            templateUrl: 'app/components/messages/messages.html',
                            controller: 'MessagesCtrl'
                        }
                    }
                });
        });
})();

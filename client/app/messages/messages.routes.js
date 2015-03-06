(function () {

    'use strict';

    angular.module('simple-chat.app')
        .config(function ($stateProvider) {
            console.debug("messages.routes: Configuring [home] routes.");

            $stateProvider
                .state('home', {
                    url: '/',
                    parent: 'main',
                    //authenticate: true,
                    views: {
                        'content@main': {
                            templateUrl: 'app/messages/messages.html',
                            controller: 'MessagesCtrl'
                        }
                    },
                    resolve: {
                        currentUser: ['$state', '$log', 'Auth', function ($state, $log, Auth) {
                            return Auth.getCurrentUser();
//                             if (!_.isEmpty(currentUser) && currentUser.hasOwnProperty('$promise')) {
//                                 $log.log("main state - current user - resolve: current user has promise - return it.");
//                                 return currentUser.$promise;
//                             }

//                             $log.log("main state - current user - resolve: Current user does not exist. Redirect to login page.");
//                             return $state.go('login');
                        }]
                    }
                });
        });
})();

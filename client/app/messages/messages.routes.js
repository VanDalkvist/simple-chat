(function () {

    'use strict';

    angular.module('simple-chat.app')
        .config(function ($stateProvider) {
            $stateProvider
                .state('main', {
                    url: '/',
                    templateUrl: 'app/main/main.html',
                    controller: 'MessagesCtrl',
                    resolve: {
                        currentUser: ['$location', 'Auth', function ($location, Auth) {
                            var currentUser = Auth.getCurrentUser();
                            if (!currentUser || !currentUser.hasOwnProperty('$promise')) {
                                $location.path('/login');
                                return;
                            }
                            return currentUser.$promise;
                        }]
                    }
                });
        });
})();

(function () {

    'use strict';

    angular.module('simple-chat.app')
        .config(function ($stateProvider) {
            $stateProvider
                .state('main', {
                    url: '^',
                    abstract: true,
                    templateUrl: 'app/main/main.html',
                    controller: 'MainCtrl',
                    resolve: {
                        currentUser: ['$location', 'Auth', function ($location, Auth) {
                            var currentUser = Auth.getCurrentUser();
                            if (currentUser && currentUser.hasOwnProperty('$promise')) return currentUser.$promise;

                            return $location.path('/login');
                        }]
                    }
                });
        });
})();

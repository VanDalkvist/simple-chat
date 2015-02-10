(function () {
    'use strict';

    angular.module('simple-chat.app')
        .controller('MainCtrl', function ($rootScope, $location, $state, Auth) {
            $rootScope.state = $state;

            $rootScope.isCollapsed = true;
            $rootScope.isLoggedIn = Auth.isLoggedIn;
            $rootScope.isAdmin = Auth.isAdmin;
            $rootScope.getCurrentUser = Auth.getCurrentUser;

            $rootScope.logout = function () {
                Auth.logout();
                $location.path('/login');
            };

            $rootScope.isActive = function (route) {
                return route === $location.path();
            };
        });
})();

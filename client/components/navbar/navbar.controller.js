'use strict';

angular.module('simpleChatApp')
    .controller('NavbarCtrl', function ($rootScope, $location, Auth) {

        $rootScope.menu = [{'title': 'Home', 'link': '/'}];

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

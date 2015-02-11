(function () {
    'use strict';

    angular.module('simple-chat.app')
        .controller('NavigationCtrl', function ($scope, $mdSidenav) {
            $scope.$mdSidenav = $mdSidenav;
        });
})();

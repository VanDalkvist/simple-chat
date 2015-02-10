'use strict';

angular.module('simple-chat.app')
    .controller('LoginCtrl', function ($scope, Auth, $location, currentUser) {
        $scope.login = _login;
        $scope.user = {};
        $scope.errors = {};

        function _login(form) {
            $scope.submitted = true;

            if (!form.$valid) return;

            Auth.login({email: $scope.user.email, password: $scope.user.password}).then(function () {
                $location.path('/');
            }, function (err) {
                $scope.errors.other = err.message;
            });
        }
    });

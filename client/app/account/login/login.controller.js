'use strict';

angular.module('simple-chat.app')
    .controller('LoginCtrl', function ($scope, Auth, $location) {
        $scope.user = {};
        $scope.errors = {};

        $scope.login = function (form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.login({
                    email: $scope.user.email,
                    password: $scope.user.password
                }).then(function () {
                    $location.path('/');
                }).catch(function (err) {
                    $scope.errors.other = err.message;
                });
            }
        };
    });

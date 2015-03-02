'use strict';

angular.module('simple-chat.app')
    .controller('LoginCtrl', function ($scope, $state, $log, Auth, currentUser) {
        $scope.login = _login;
        $scope.user = {};
        $scope.errors = {};

        $log.log("LoginCtrl - init. Current user is ", currentUser);

        function _login(form) {
            $scope.submitted = true;

            if (!form.$valid) return;

            Auth.login({email: $scope.user.email, password: $scope.user.password}).then(function () {
                $state.go('home');
            }, function (err) {
                $scope.errors.other = err.message;
            });
        }
    });

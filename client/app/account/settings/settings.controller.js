'use strict';

angular.module('simple-chat.app')
    .controller('SettingsCtrl', function ($scope, User, Auth) {
        $scope.errors = {};

        $scope.changePassword = function (form) {
            $scope.submitted = true;
            if (!form.$valid) return;

            Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
                .then(function () {
                    $scope.message = 'Password successfully changed.';
                }, function () {
                    form.password.$setValidity('mongoose', false);
                    $scope.errors.other = 'Incorrect password';
                    $scope.message = '';
                });
        };
    });

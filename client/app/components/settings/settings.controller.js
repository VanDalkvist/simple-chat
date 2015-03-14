'use strict';

angular.module('simple-chat.app')
    .controller('SettingsCtrl', function ($scope, Auth) {
        $scope.errors = {};

        $scope.changePassword = _changePassword;

        function _changePassword(form) {
            $scope.submitted = true;
            if (!form.$valid) return;

            Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
                .then(function () {
                    $scope.message = 'Password successfully changed.';
                }, function _onPasswordChangeError() {
                    form.password.$setValidity('db', false);
                    $scope.errors.other = 'Incorrect password';
                    $scope.message = '';
                });
        }
    });

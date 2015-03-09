'use strict';

angular.module('simple-chat.app')
    .controller('AdminCtrl', function ($scope, $mdToast, User, Messages) {

        $scope.users = User.query();
        $scope.delete = _delete;
        $scope.removeAll = _removeAll;

        function _delete(user) {
            User.remove({id: user._id});
            angular.forEach($scope.users, function (u, i) {
                if (u === user) {
                    $scope.users.splice(i, 1);
                }
            });
        }

        function _removeAll() {
            Messages.delete(function (response) {
                _showNotification('All messages was removed.');
            }, function (response) {
                _showNotification('Error does occur during removing messages.');
            });
        }

        function _showNotification(message) {
            $mdToast.show(
                $mdToast.simple()
                    .content(message)
                    .position('bottom right')
                    .hideDelay(3000)
            );
        }
    });

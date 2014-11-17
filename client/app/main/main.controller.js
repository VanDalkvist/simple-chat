'use strict';

angular.module('simpleChatApp')
    .controller('MainCtrl', function ($scope, $http, $resource, socket) {
        $scope.messages = [];

        var Message = $resource('/api/messages/:id');

        $scope.messages = Message.query(function () {
            socket.syncUpdates('message', $scope.messages);
        });

        $scope.addMessage = function (newMessage) {
            if (newMessage === '') {
                return;
            }
            var message = {text: newMessage, createdAt: moment().toDate()};
            Message.save(message, function () {
                $scope.messages.push(message);
            });
            $scope.newMessage = '';
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('message');
        });
    });

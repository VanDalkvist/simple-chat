(function () {

    'use strict';

    angular.module('simple-chat.app')
        .controller('MessagesCtrl', MessagesCtrl);

    MessagesCtrl.$inject = ['$scope', 'socket', 'currentUser', 'Messages', 'emojis'];

    function MessagesCtrl($scope, socket, currentUser, Messages, emojis) {
        // #region init

        var author = {name: currentUser.name, email: currentUser.email};
        $scope.emojis = emojis.values.map(function (emoji) {
            return {name: emoji.substr(1, emoji.length - 2)};
        });

        // #region scope

        $scope.messages = Messages.query(function () {
            socket.syncUpdates('message', $scope.messages);
        });

        $scope.addMessage = function (newMessage) {
            if (newMessage === '') return;

            Messages.save({text: newMessage, createdAt: moment().toDate(), author: author});
            $scope.newMessage = '';
        };

        $scope.isAuthor = function (message) {
            return message.isAuthor = (currentUser.email === message.author.email);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('message');
        });
    }
})();

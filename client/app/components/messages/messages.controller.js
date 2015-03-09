(function () {

    'use strict';

    angular.module('simple-chat.app')
        .controller('MessagesCtrl', MessagesCtrl);

    MessagesCtrl.$inject = ['$scope', '$log', 'socket', 'currentUser', 'Messages', 'emojis', '$mdDialog'];

    function MessagesCtrl($scope, $log, socket, currentUser, Messages, emojis, $mdDialog) {
        $log.log("MessagesCtrl - init. Current user is ", currentUser);

        // #region init

        var author = currentUser && {name: currentUser.name, email: currentUser.email};

        // #region scope

        $scope.emojis = emojis.values.map(function (emoji) {
            return {name: emoji.substr(1, emoji.length - 2)};
        });

        $scope.messages = Messages.query(_onMessagesLoaded);

        $scope.addMessage = _addMessage;
        $scope.isAuthor = _isAuthor;
        $scope.openEmojisDialog = _openEmojisDialog;

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('message');
        });

        // #region private functions

        // todo: rewrite to sockets
        function _onMessagesLoaded(res) {
            socket.syncUpdates('message', $scope.messages);
        }

        // todo: rewrite to sockets
        function _addMessage(newMessage) {
            if (newMessage === '') return;

            Messages.save({text: newMessage, createdAt: moment().toDate(), author: author});
            $scope.newMessage = '';
        }

        function _isAuthor(message) {
            return message.isAuthor = (currentUser.email === message.author.email);
        }

        function _openEmojisDialog(event) {
            $mdDialog.show({
                controller: 'EmojisController',
                templateUrl: 'app/components/emojis/emojis.html',
                targetEvent: event
            }).then(function (answer) {
                $scope.newMessage.concat(" " + answer);
            });
        }
    }
})();

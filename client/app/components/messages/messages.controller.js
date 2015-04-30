(function () {

    'use strict';

    angular.module('simple-chat.app')
        .controller('MessagesCtrl', MessagesCtrl);

    MessagesCtrl.$inject = ['$scope', '$sce', 'Messages', 'emojis', 'currentUser', 'connection'];

    function MessagesCtrl($scope, $sce, Messages, emojis, currentUser, connection) {
        // #region init

        var author = currentUser && {name: currentUser.name, email: currentUser.email};

        // #region scope

        $scope.emojis = emojis.values.map(function (emoji) {
            return {name: emoji.substr(1, emoji.length - 2)};
        });

        $scope.messages = Messages.query(_onMessagesLoaded, _unsyncUpdates);

        $scope.addMessage = _addMessage;
        $scope.isAuthor = _isAuthor;

        // watches and events

        $scope.$on('$destroy', function () {
            _unsyncUpdates();
        });

        // #region private functions

        function _onMessagesLoaded(messages) {
            _syncUpdates(messages);
            _prepareMessages(messages);
        }

        function _prepareMessages(messages) {
            messages.forEach(function (message) {
                message.text = $sce.trustAsHtml(message.text);
            });
        }

        // todo: rewrite to sockets
        function _syncUpdates(res) {
            connection.sync('message', $scope.messages);
        }

        function _unsyncUpdates() {
            connection.unsync('message');
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
    }
})();

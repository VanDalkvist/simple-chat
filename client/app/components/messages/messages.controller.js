(function () {

    'use strict';

    angular.module('simple-chat.app')
        .controller('MessagesCtrl', MessagesCtrl);

    MessagesCtrl.$inject = ['$scope', '$sce', 'emojis', 'currentUser', 'connection'];

    function MessagesCtrl($scope, $sce, emojis, currentUser, connection) {

        // #region init

        var author = currentUser && {name: currentUser.name, email: currentUser.email};

        // #region scope

        $scope.emojis = emojis.values.map(function (emoji) {
            return {name: emoji.substr(1, emoji.length - 2)};
        });

        $scope.messages = [];

        connection.socket.emit('message:fetch-all', {}, function (messages) {
            _onMessagesLoaded(messages);
        });
        //$scope.messages = Messages.query(_onMessagesLoaded, _unsyncUpdates);

        $scope.addMessage = _addMessage;
        $scope.isAuthor = _isAuthor;

        // watches and events

        $scope.$on('$destroy', function () {
            _unsyncUpdates();
        });

        // #region private functions

        function _onMessagesLoaded(messages) {
            $scope.messages = messages;

            _syncUpdates($scope.messages);
            _prepareMessages($scope.messages);
        }

        function _prepareMessages(messages) {
            messages.forEach(function (message) {
                message.text = $sce.trustAsHtml(message.text).toString();
            });
        }

        function _syncUpdates(res) {
            connection.sync('message', $scope.messages);
        }

        function _unsyncUpdates() {
            connection.unsync('message');
        }

        function _addMessage(newMessage) {
            if (newMessage === '') return;

            connection.socket.emit('message:save', {
                text: newMessage,
                createdAt: moment().toDate(),
                author: author
            }, function (message) {
                $scope.newMessage = '';
            });
        }

        function _isAuthor(message) {
            return message.isAuthor = (currentUser.email === message.author.email);
        }
    }
})();

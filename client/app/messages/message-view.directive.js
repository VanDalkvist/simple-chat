(function () {

    'use strict';

    angular.module('simple-chat.app')
        .directive('messageView', messageViewDirective);

    messageViewDirective.$inject = [];

    function messageViewDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/messages/message-view.html',
            scope: {
                message: '='
            },
            link: _link
        };

        // #region private functions

        function _link(scope) {
            var url = 'https://placehold.it/50/';

            var meColor = '3f51b5';
            scope.$watch('message', function (value) {
                value.url = url + (value.isAuthor ? meColor : 'FA6F57') + '/fff&text=' + (value.isAuthor ? 'ME' : 'YOU');
            });
        }
    }
})();

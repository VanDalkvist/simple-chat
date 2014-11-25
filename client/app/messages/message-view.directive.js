(function () {

    'use strict';

    angular.module('simpleChatApp')
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
            var url = 'http://placehold.it/50/';

            scope.$watch('message', function (value) {
                value.url = url + (value.isAuthor ? '55C1E7' : 'FA6F57') + '/fff&text=' + (value.isAuthor ? 'ME' : 'YOU');
            });
        }
    }
})();

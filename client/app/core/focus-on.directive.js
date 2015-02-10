(function () {

    'use strict';

    angular.module('simple-chat.app')
        .directive('focusOn', focusOn);

    function focusOn() {
        return {
            link: link
        };

        function link(scope, element, attrs) {
            scope.$on(attrs.focusOn, function (event) {
                element[0].focus();
                event.preventDefault();
            })
        }
    }
})();

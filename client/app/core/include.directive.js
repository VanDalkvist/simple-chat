(function () {

    'use strict';

    angular.module('simple-chat.app')
        .directive('include', include);

    include.$inject = ['$http', '$templateCache', '$compile'];

    function include($http, $templateCache, $compile) {
        return {
            restrict: 'E',
            link: function (scope, element, attributes) {
                var templateUrl = scope.$eval(attributes.view);
                $http.get(templateUrl, {cache: $templateCache}).success(function (tplContent) {
                    element.replaceWith($compile(tplContent)(scope));
                });
            }
        };
    }
})();

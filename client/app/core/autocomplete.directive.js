'use strict';

/**
 * Removes server error when user updates input
 */
angular.module('simple-chat.app')
    .directive('stAutocomplete', ['$templateCache',
        function ($templateCache) {
            return {
                restrict: 'AE',
                scope: {
                    stAutocomplete: '=',
                    stAt: '@',
                    /**
                     * Only plain html string supports as template
                     */
                    stTemplate: '@'
                },
                link: function (scope, element) {
                    var template = $templateCache.get(scope.stTemplate);

                    scope.$watch('stAutocomplete', function (newVal) {
                        newVal && element.atwho({
                            at: scope.stAt || ':',
                            data: newVal,
                            limit: 50,
                            displayTpl: template,
                            insertTpl: ":${name}:"
                        });
                    });
                }
            };
        }
    ]
);

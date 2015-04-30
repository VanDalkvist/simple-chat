(function () {

    'use strict';

    angular.module('simple-chat.app')
        .controller('EmojisController', EmojisController);

    EmojisController.$inject = ['$scope', '$sce', 'emojis'];

    function EmojisController($scope, $sce, emojis) {
        $scope.emojis = emojis.values.map(function (emoji) {
            return {name: emoji.substr(1, emoji.length - 2), view: $sce.trustAsHtml(emoji)};
        });
    }
})();

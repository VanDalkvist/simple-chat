(function () {

    'use strict';

    angular.module('simple-chat.app')
        .controller('EmojisController', EmojisController);

    EmojisController.$inject = ['$scope', '$mdDialog', 'emojis'];

    function EmojisController($scope, $mdDialog, emojis) {
        //$scope.emojis = emojis.values.map(function (emoji) {
        //    return {name: emoji.substr(1, emoji.length - 2), view: emoji};
        //});

        $scope.emojis = buildGridModel({
            name: "",
            background: ""
        });

        function buildGridModel(tileTmpl) {
            var it, results = [];

            for (var j = 0; j < emojis.values.length; j++) {
                var emoji = emojis.values[j];
                it = angular.extend({view: emoji}, tileTmpl);
                it.name = emoji.substr(1, emoji.length - 2);
                it.span = {row: "1", col: "1"};

                switch (j % 11 + 1) {
                    case 1:
                        it.background = "red";
                        break;
                    case 2:
                        it.background = "green";
                        break;
                    case 3:
                        it.background = "darkBlue";
                        break;
                    case 4:
                        it.background = "blue";
                        break;
                    case 5:
                        it.background = "yellow";
                        break;
                    case 6:
                        it.background = "pink";
                        break;
                    case 7:
                        it.background = "darkBlue";
                        break;
                    case 8:
                        it.background = "purple";
                        break;
                    case 9:
                        it.background = "deepBlue";
                        break;
                    case 10:
                        it.background = "lightPurple";
                        break;
                    case 11:
                        it.background = "yellow";
                        break;
                }
                results.push(it);
            }
            return results;
        }

        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }
})();

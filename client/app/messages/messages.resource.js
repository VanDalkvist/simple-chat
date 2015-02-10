(function () {

    'use strict';

    angular.module('simple-chat.app')
        .factory('Messages', Messages);

    Messages.$inject = ['$resource'];

    function Messages($resource) {
        return $resource('/api/messages/:id');
    }
})();

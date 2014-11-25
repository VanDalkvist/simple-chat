(function () {

    'use strict';

    angular.module('simpleChatApp')
        .factory('Messages', Messages);

    Messages.$inject = ['$resource'];

    function Messages($resource) {
        return $resource('/api/messages/:id');
    }
})();

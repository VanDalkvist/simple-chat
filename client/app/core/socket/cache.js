(function () {
    'use strict';

    angular.module('simple-chat.app')
        .provider('cache', cacheProvider);

    function cacheProvider() {

        // #region initialization

        var storage;

        var storageFactory = {
            create: function (storageType) {
                return window[storageType];
            }
        };

        this.init = function (storageType) {
            storage = storageFactory.create(storageType);
        };

        this.$get = function () {
            return {
                get: _get,
                put: _put,
                remove: _remove
            };
        };

        // #region private functions

        function _get(key) {
            var item = storage.getItem(key);
            return item ? angular.fromJson(item) : item;
        }

        function _put(key, value) {
            storage.setItem(key, angular.toJson(value));
        }

        function _remove(key) {
            storage.removeItem(key);
        }
    }
})();

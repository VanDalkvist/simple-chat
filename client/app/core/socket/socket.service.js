/* global io */
'use strict';

angular.module('simple-chat.app')
    .factory('socket', function ($location, $log, socketFactory, Auth) {

        var socket = undefined;

        return {
            connect: _connect
        };

        // private functions

        function _connect() {
            if (socket) return {sync: _syncUpdates, unsync: _unsyncUpdates};

            $log.log("socket: initialization");

            var token = Auth.getToken();

            // socket.io now auto-configures its connection when we omit a connection url
            var ioSocket = io('', {
                query: 'token=' + token,
                path: '/socket.io-client'
            });

            socket = socketFactory({ioSocket: ioSocket});

            return {sync: _syncUpdates, unsync: _unsyncUpdates};
        }

        /**
         * Register listeners to sync an array with updates on a model
         *
         * Takes the array we want to sync, the model name that socket updates are sent from,
         * and an optional callback function after new items are updated.
         *
         * @param {String} modelName
         * @param {Array} array
         * @param {Function} cb
         */
        function _syncUpdates(modelName, array, cb) {
            cb = cb || angular.noop;

            /**
             * Syncs item creation/updates on 'model:save'
             */
            socket.on(modelName + ':save', function (item) {
                var oldItem = _.find(array, {_id: item._id});
                var index = array.indexOf(oldItem);
                var event = 'created';

                // replace oldItem if it exists
                // otherwise just add item to the collection
                if (oldItem) {
                    array.splice(index, 1, item);
                    event = 'updated';
                } else {
                    array.unshift(item);
                }

                cb(event, item, array);
            });

            /**
             * Syncs removed items on 'model:remove'
             */
            socket.on(modelName + ':remove', function (item) {
                var event = 'deleted';
                _.remove(array, {_id: item._id});
                cb(event, item, array);
            });
        }

        /**
         * Removes listeners for a models updates on the socket
         *
         * @param modelName
         */
        function _unsyncUpdates(modelName) {
            socket.removeAllListeners(modelName + ':save');
            socket.removeAllListeners(modelName + ':remove');
        }
    });

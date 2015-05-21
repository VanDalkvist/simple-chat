(function () {

    'use strict';

    angular.module('simple-chat.app')
        .config(function ($stateProvider) {
            console.debug("main.routes: Configuring [main] routes.");

            $stateProvider
                .state('main', {
                    url: '^',
                    abstract: true,
                    templateUrl: 'app/main/main.html',
                    controller: 'MainCtrl',
                    resolve: {
                        currentUser: ['User', function (User) {
                            return User.get().$promise;
                        }],
                        connection: ['socket', 'PresenceHandler', 'currentUser', function (socket, PresenceHandler, currentUser) {
                            var connection = socket.connect();
                            PresenceHandler.start(10000, function () {
                                connection.socket.emit('user:on', {name: currentUser.name});
                            }, function () {
                                connection.socket.emit('user:out', {name: currentUser.name});
                            });
                            return connection;
                        }],
                        loginModel: ['$q', 'Auth', 'currentUser', function ($q, Auth, currentUser) {
                            var isAdminPromise = Auth.isAdmin();
                            return isAdminPromise.then(function (isAdmin) {
                                return $q.all({isLoggedIn: true, isAdmin: isAdmin});
                            });
                        }]
                    }
                });
        });
})();

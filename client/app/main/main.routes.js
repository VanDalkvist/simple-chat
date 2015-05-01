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
                        connection: ['socket', 'currentUser', function (socket, currentUser) {
                            return socket.connect();
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

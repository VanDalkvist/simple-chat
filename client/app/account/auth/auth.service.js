(function () {
    'use strict';

    angular.module('simple-chat.app')
        .factory('Auth', function Auth($location, $rootScope, $http, $log, $cookieStore, $q, User) {
            $rootScope.user = {};
            if ($cookieStore.get('token')) {
                $log.log("Auth: Token was found. Try to load user info.");

                $rootScope.user = User.get(function () {
                    $log.log("Auth: Current user was loaded.");
                });
            }

            return {

                /**
                 * Authenticate user and save token
                 *
                 * @param  {Object}   user     - login info
                 * @return {Promise}
                 */
                login: function (user) {
                    var deferred = $q.defer();

                    $http.post('/auth/local', {
                        email: user.email,
                        password: user.password
                    }).
                        success(function (data) {
                            $cookieStore.put('token', data.token);
                            $log.log("Auth - login: Success login.");
                            $rootScope.user = User.get(function () {
                                $log.log("Auth - login: Current user was loaded.");
                            });
                            deferred.resolve(data);
                        }).
                        error(function (err) {
                            this.logout();
                            $log.log("Auth - login: Failure login.");
                            deferred.reject(err);
                        }.bind(this));

                    return deferred.promise;
                },

                /**
                 * Delete access token and user info
                 */
                logout: function () {
                    $cookieStore.remove('token');
                    $log.log("Auth - logout: Reset user. Remove token.");
                    $rootScope.user = {};
                },

                /**
                 * Change password
                 *
                 * @param  {String}   oldPassword
                 * @param  {String}   newPassword
                 * @return {Promise}
                 */
                changePassword: function (oldPassword, newPassword) {
                    // todo: remove userId from request
                    return User.changePassword(
                        {id: $rootScope.user._id},
                        {oldPassword: oldPassword, newPassword: newPassword}
                    ).$promise;
                },

                /**
                 * Gets all available info on authenticated user
                 *
                 * @return {Object} user
                 */
                getCurrentUser: function () {
                    return $rootScope.user;
                },

                /**
                 * Check if a user is logged in
                 *
                 * @return {Boolean}
                 */
                isLoggedIn: function () {
                    return $rootScope.user ? $rootScope.user.hasOwnProperty('role') : false;
                },

                /**
                 * Waits for currentUser to resolve before checking if user is logged in
                 */
                isLoggedInAsync: function (cb) {
                    //if (currentUser.hasOwnProperty('$promise')) {
                    User.get().$promise.then(function () {
                        $log.log("Auth - isLoggedInAsync - by promise: You are logged in.");
                        cb(true);
                    }).catch(function () {
                        $log.log("Auth - isLoggedInAsync - by promise: You are not logged in.");
                        cb(false);
                    });
                    //} else if (currentUser.hasOwnProperty('role')) {
                    //    $log.log("Auth - isLoggedInAsync - by role: You are logged in.");
                    //    cb(true);
                    //} else {
                    //    $log.log("Auth - isLoggedInAsync - by role: You are not logged in.");
                    //    cb(false);
                    //}
                },

                /**
                 * Check if a user is an admin
                 *
                 * @return {Boolean}
                 */
                isAdmin: function () {
                    return $rootScope.user ? $rootScope.user.role === 'admin' : false;
                },

                /**
                 * Get auth token
                 */
                getToken: function () {
                    return $cookieStore.get('token');
                }
            };
        }
    );
})();

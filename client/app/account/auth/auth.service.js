(function () {
    'use strict';

    angular.module('simple-chat.app')
        .factory('Auth', function Auth($location, $rootScope, $http, $log, $cookieStore, $q, User) {
            var currentUser = {};
            if ($cookieStore.get('token')) {
                $log.log("Auth: Token was not found. Try to load user info.");
                currentUser = User.get(function () {
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
                            currentUser = User.get(function () {
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
                 *
                 * @param  {Function}
                 */
                logout: function () {
                    $cookieStore.remove('token');
                    $log.log("Auth - logout: Reset user. Remove token.");
                    currentUser = {};
                },

                /**
                 * Change password
                 *
                 * @param  {String}   oldPassword
                 * @param  {String}   newPassword
                 * @return {Promise}
                 */
                changePassword: function (oldPassword, newPassword) {
                    return User.changePassword(
                        {id: currentUser._id},
                        {oldPassword: oldPassword, newPassword: newPassword}
                    ).$promise;
                },

                /**
                 * Gets all available info on authenticated user
                 *
                 * @return {Object} user
                 */
                getCurrentUser: function () {
                    return currentUser;
                },

                /**
                 * Check if a user is logged in
                 *
                 * @return {Boolean}
                 */
                isLoggedIn: function () {
                    return currentUser.hasOwnProperty('role');
                },

                /**
                 * Waits for currentUser to resolve before checking if user is logged in
                 */
                isLoggedInAsync: function (cb) {
                    if (currentUser.hasOwnProperty('$promise')) {
                        currentUser.$promise.then(function () {
                            $log.log("Auth - isLoggedInAsync - by promise: You are logged in.");
                            cb(true);
                        }).catch(function () {
                            $log.log("Auth - isLoggedInAsync - by promise: You are not logged in.");
                            cb(false);
                        });
                    } else if (currentUser.hasOwnProperty('role')) {
                        $log.log("Auth - isLoggedInAsync - by role: You are logged in.");
                        cb(true);
                    } else {
                        $log.log("Auth - isLoggedInAsync - by role: You are not logged in.");
                        cb(false);
                    }
                },

                /**
                 * Check if a user is an admin
                 *
                 * @return {Boolean}
                 */
                isAdmin: function () {
                    return currentUser.role === 'admin';
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

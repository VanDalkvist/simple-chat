(function () {
    'use strict';

    angular.module('simple-chat.app')
        .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
            var currentUser = {};
            if ($cookieStore.get('token')) {
                currentUser = User.get();
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
                            currentUser = User.get();
                            deferred.resolve(data);
                        }).
                        error(function (err) {
                            this.logout();
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
                            cb(true);
                        }).catch(function () {
                            cb(false);
                        });
                    } else if (currentUser.hasOwnProperty('role')) {
                        cb(true);
                    } else {
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

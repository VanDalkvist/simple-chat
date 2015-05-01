(function () {
    'use strict';

    angular.module('simple-chat.app')
        .factory('Auth', function Auth($http, $log, $cookieStore, $q, User) {
            return {

                /**
                 * Authenticate user and save token
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
                },

                /**
                 * Change password
                 * @param  {String}   oldPassword
                 * @param  {String}   newPassword
                 * @return {Promise}
                 */
                changePassword: function (oldPassword, newPassword) {
                    return User.changePassword({}, {oldPassword: oldPassword, newPassword: newPassword}).$promise;
                },

                /**
                 * Check if a user is an admin
                 * @return {Boolean}
                 */
                isAdmin: function () {
                    return User.isAdmin().$promise.then(function (res) {
                        return res.isAdmin;
                    });
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

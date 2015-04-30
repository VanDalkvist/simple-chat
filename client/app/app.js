'use strict';

angular.module('simple-chat.app', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'ui.bootstrap',
    'angularMoment',
    'emoji',
    'ui.bootstrap.typeahead',
    'ngMaterial'
])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $mdThemingProvider) {
        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');

        $mdThemingProvider.theme('indigo');
    })
    .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location, $log) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                if ($cookieStore.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                } else {
                    $log.log("request: Token was not found in cookies.");
                }
                return config;
            },

            // Intercept 401 and 403 errors and redirect you to login
            responseError: function (response) {
                if (response.status !== 401 && response.status !== 403) {
                    return $q.reject(response);
                }
                // remove any stale tokens
                $log.log("responseError %d: Redirect to login page. Remove token from cookies.", response.status);
                $location.path('/login');
                $cookieStore.remove('token');
                return $q.reject(response);
            }
        };
    })
    .constant('States', (function () {
        return {
            directRoutes: ['login']
        };
    })())
    .service('AuthHandler', ['$interval', '$log', 'User',
        function AuthHandler($interval, $log, User) {

            // public functions

            this.start = _start;

            // private functions

            function _start(interval) {
                interval = angular.isNumber(interval) ? interval : 10000;

                $interval(function () {
                    $log.log("AuthHandler: checking user is logged in or not.");

                    User.get();
                }, interval);
            }
        }
    ])
    .run(function ($rootScope, $log, $state, $cookieStore, AuthHandler) {
        $log.log("app: Subscribe to $stateChangeStart.");

        // handle any route related errors (specifically used to check for hidden resolve errors)
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            $log.log('$stateChangeError: ', error);

            // todo: prepare token, current user
            if (error.status === 401 || error.status === 403) {
                $cookieStore.remove('token');
                $state.go('login');
            }
        });

        AuthHandler.start(30000);
    });

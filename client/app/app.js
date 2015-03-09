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
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $mdThemingProvider, cacheProvider) {
        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');

        $mdThemingProvider.theme('indigo');

        cacheProvider.init('sessionStorage');
    })
    .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location, $log, cache) {
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

            // Intercept 401s and redirect you to login
            responseError: function (response) {
                if (response.status !== 401 && response.status !== 403) {
                    return $q.reject(response);
                }
                // remove any stale tokens
                $rootScope.user = undefined;
                cache.remove('user');
                $log.log("responseError 401: Redirect to login page. Remove token from cookies.");
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
    .run(function ($rootScope, $log, $state, Auth, States) {
        $log.log("app: Subscribe to $stateChangeStart.");

        // handle any route related errors (specifically used to check for hidden resolve errors)
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
            $log.log('$stateChangeError: ', error);

            // todo: prepare token, current user
            if (error.status === 401)
                $state.go('login');
        });

        //$rootScope.$on('$stateChangeStart', function (event, next) {
        //    Auth.isLoggedInAsync(function (loggedIn) {
        //        $log.log("$stateChangeStart: Next is ", next);
        //
        //        if (_.includes(States.directRoutes, next.name)) return;
        //
        //        if (next.authenticate && !loggedIn) {
        //            //event.preventDefault();
        //            $log.log("$stateChangeStart: You are not logged in. Redirect to login page.");
        //            $state.go('login');
        //        }
        //    });
        //});
    });

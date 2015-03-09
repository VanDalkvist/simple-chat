(function () {

    'use strict';

    angular.module('simple-chat.app')
        .config(function ($stateProvider) {
            console.debug("settings.routes: Configuring [main] routes.");

            $stateProvider
                .state('settings', {
                    url: '/settings',
                    authenticate: true,
                    parent: 'main',
                    views: {
                        'content@main': {
                            templateUrl: 'app/components/settings/settings.html',
                            controller: 'SettingsCtrl'
                        }
                    }
                });
        });
})();

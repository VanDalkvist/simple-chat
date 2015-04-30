'use strict';

describe('Controller: MessagesCtrl', function () {

    // load the controller's module
    beforeEach(module('simple-chat.app'));
    beforeEach(module('socketMock'));

    var MessagesCtrl,
        scope,
        $httpBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
        $httpBackend = _$httpBackend_;

        $httpBackend.when('GET', '/api/users/me')
            .respond({name: 'test'});

        $httpBackend.when('GET', '/api/messages')
            .respond([{text:'HTML5 Boilerplate'}, {text: 'AngularJS'}, {text: 'Karma'}, {text: 'Express'}]);

        scope = $rootScope.$new();
        MessagesCtrl = $controller('MessagesCtrl', {
            $scope: scope, currentUser: {email: 'email'}, connection: {sync: function(){}, unsync: function(){}}
        });
    }));

    it('should attach a list of messages to the scope', function () {
        $httpBackend.flush();
        expect(scope.messages.length).toBe(4);
    });
});

'use strict';

angular.module('simple-chat.app')
    .factory('Modal', function ($rootScope, $modal) {
        /**
         * Opens a modal
         * @param  {Object} scopeModel      - an object to be merged with modal's scope
         * @param  {String} modalClass - (optional) class(es) to be applied to the modal
         * @return {Object}            - the instance $modal.open() returns
         */
        function openModal(scopeModel, modalClass) {
            var modalScope = $rootScope.$new();
            scopeModel = scopeModel || {};
            modalClass = modalClass || 'modal-default';

            angular.extend(modalScope, scopeModel);

            return $modal.open({
                templateUrl: 'app/core/modal/modal.html',
                windowClass: modalClass,
                scope: modalScope
            });
        }

        // Public API here
        return {

            /* Confirmation modals */
            confirm: {

                /**
                 * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
                 * @param  {Function} del - callback, ran when delete is confirmed
                 * @return {Function}     - the function to open the modal (ex. myModalFn)
                 */
                delete: function (del) {
                    del = del || angular.noop;

                    /**
                     * Open a delete confirmation modal
                     * @param  {String} name   - name or info to show on modal
                     * @param  {All}           - any additional args are passed staight to del callback
                     */
                    return function () {
                        var args = Array.prototype.slice.call(arguments),
                            name = args.shift(),
                            ModalInstance;

                        ModalInstance = openModal({
                            modal: {
                                dismissable: true,
                                title: 'Confirm Delete',
                                html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                                buttons: [{
                                    classes: 'btn-danger',
                                    text: 'Delete',
                                    click: function (e) {
                                        ModalInstance.close(e);
                                    }
                                }, {
                                    classes: 'btn-default',
                                    text: 'Cancel',
                                    click: function (e) {
                                        ModalInstance.dismiss(e);
                                    }
                                }]
                            }
                        }, 'modal-danger');

                        ModalInstance.result.then(function (event) {
                            del.apply(event, args);
                        });
                    };
                }
            }
        };
    });

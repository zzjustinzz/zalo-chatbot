'use strict';

//Shops service used for devices REST endpoint
angular.module('mean.zalo-chatbot').factory('Interact', ['$resource',
    function($resource) {
        return $resource('/api/interacts/:interactId', {
            interactId: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            get_interacts_time: {
                method: 'GET',
                url: '/api/interacts/get_interacts_time',
                isArray: true
            },
            get_configs: {
                method: 'GET',
                url: '/api/configs'
            }
        });
    }
]);
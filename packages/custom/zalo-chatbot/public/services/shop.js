'use strict';

//Shops service used for devices REST endpoint
angular.module('mean.zalo-chatbot').factory('Shop', ['$resource',
    function($resource) {
        return $resource('/api/shops/:shopId', {
            shopId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
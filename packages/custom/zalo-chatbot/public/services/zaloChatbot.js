(function() {
    'use strict';

    function ZaloChatbot($http, $q) {
        return {
            name: 'zalo-chatbot',
            checkCircle: function(circle) {
                var deferred = $q.defer();

                $http.get('/api/zaloChatbot/example/' + circle).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
                return deferred.promise;

            }
        };
    }

    angular
        .module('mean.zalo-chatbot')
        .factory('ZaloChatbot', ZaloChatbot);

    ZaloChatbot.$inject = ['$http', '$q'];

})();

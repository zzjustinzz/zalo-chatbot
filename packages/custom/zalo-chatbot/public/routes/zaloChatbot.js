(function() {
    'use strict';

    var checkLoggedin = function($q, $timeout, $http, $location) {
        // Initialize a new promise
        var deferred = $q.defer();

        // Make an AJAX call to check if the user is logged in
        $http.get('/api/loggedin').success(function(user) {
            // Authenticated
            if (user !== '0') $timeout(deferred.resolve);

            // Not Authenticated
            else {
                $timeout(deferred.reject);
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    function ZaloChatbot($stateProvider) {
        $stateProvider.state('zaloChatbot example page', {
            url: '/zaloChatbot/example',
            templateUrl: 'zalo-chatbot/views/index.html'
        }).state('zaloChatbot circles example', {
            url: '/zaloChatbot/example/:circle',
            templateUrl: 'zalo-chatbot/views/example.html'
        }).state('create shop', {
            url: '/shops/create',
            templateUrl: 'zaloChatbot/views/shop/create.html',
            resolve: {
                loggedin: checkLoggedin
            }
        });
    }

    angular
        .module('mean.zalo-chatbot')
        .config(ZaloChatbot);

    ZaloChatbot.$inject = ['$stateProvider'];

})();
(function() {
    'use strict';

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
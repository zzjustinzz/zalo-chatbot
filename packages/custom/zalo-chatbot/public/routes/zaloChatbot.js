(function() {
    'use strict';

    function ZaloChatbot($stateProvider) {
        $stateProvider.state('zaloChatbot example page', {
            url: '/zaloChatbot/example',
            templateUrl: 'zalo-chatbot/views/index.html'
        }).state('zaloChatbot circles example', {
            url: '/zaloChatbot/example/:circle',
            templateUrl: 'zalo-chatbot/views/example.html'
        }).state('list interacts', {
            url: '/interacts/list',
            templateUrl: 'zalo-chatbot/views/interact/list.html'
        }).state('dashboard interacts', {
            url: '/interacts/dashboard',
            templateUrl: 'zalo-chatbot/views/interact/dashboard.html'
        });
    }

    angular
        .module('mean.zalo-chatbot')
        .config(ZaloChatbot);

    ZaloChatbot.$inject = ['$stateProvider'];

})();
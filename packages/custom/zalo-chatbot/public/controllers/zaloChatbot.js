(function() {
    'use strict';

    /* jshint -W098 */

    function ZaloChatbotController($scope, Global, ZaloChatbot, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'zalo-chatbot'
        };

        $scope.checkCircle = function() {
            ZaloChatbot.checkCircle($stateParams.circle).then(function(response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };
    }

    angular
        .module('mean.zalo-chatbot')
        .controller('ZaloChatbotController', ZaloChatbotController);

    ZaloChatbotController.$inject = ['$scope', 'Global', 'ZaloChatbot', '$stateParams'];

})();

(function() {
    'use strict';

    /* jshint -W098 */

    function ShopController($scope, Global, Shop, $stateParams, $mdToast, $location) {
        $scope.global = Global;
        $scope.package = {
            name: 'zalo-chatbot'
        };

        $scope.initList = function() {};

        $scope.initCreate = function() {

        };
    }

    angular
        .module('mean.zalo-chatbot')
        .controller('ShopController', ShopController);

    ShopController.$inject = ['$scope', 'Global', 'Shop', '$stateParams', '$mdToast', '$location'];

})();
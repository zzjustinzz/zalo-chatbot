(function() {
    'use strict';

    /* jshint -W098 */

    function InteractController($scope, Global, Interact, $stateParams, $location) {
        $scope.global = Global;
        $scope.package = {
            name: 'zalo-chatbot'
        };

        $scope.initList = function() {
            $scope.options = {
                decapitate: false,
                boundaryLinks: true,
                limitSelect: true,
                pageSelect: true
            };

            $scope.limitOptions = [5, 10, 15];

            $scope.query = {
                order: 'customerSay',
                limit: 10,
                page: 1
            };

            Interact.query(function(interacts) {
                $scope.interacts = interacts;
            });
        };

        $scope.initDashboard = function() {
            var interactTemp = [];
            Interact.get_interacts_time((interacts) => {
                var data = Array.apply(null, Array(60));
                data = data.map((dataParse, index) => {
                    return {
                        x: index,
                        y: 0
                    };
                });
                $scope.dataRealtime = [{ values: data, key: 'Interaction', area: true }];
                interacts.forEach((interact) => {
                    var end = moment();
                    var start = moment(interact.timestamp);
                    var d = moment.duration(end.diff(start)).get('minutes');
                    console.log(d);
                    console.log($scope.dataRealtime[0]);
                    console.log($scope.dataRealtime[0].values[60 - d]);
                    $scope.dataRealtime[0].values[60 - d].y += 1;
                });
            });

            var localip = '127.0.0.1';

            Interact.get_configs((config) => {
                if (config.environment === 'production') {
                    localip = '118.102.6.55';
                    console.log('localip:' + localip);
                }
                var socket = io('http://' + localip + ':' + config.socketPort + '/');
                socket.on('new_interact', function(data) {
                    console.log(data);
                    interactTemp.push(data.interact);
                });
            });

            $scope.options = {
                chart: {
                    type: 'lineChart',
                    height: 180,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 40,
                        left: 55
                    },
                    x: function(d) {
                        return d.x;
                    },
                    y: function(d) { return d.y; },
                    useInteractiveGuideline: true,
                    duration: 500,
                    yAxis: {
                        tickFormat: function(d) {
                            return d3.format('d')(d);
                        }
                    },
                    xAxis: {
                        tickFormat: function(d) {
                            var duration = 60 - d;
                            return moment().subtract(duration, 'm').format('HH:mm');
                        }
                    }
                }
            };

            setInterval(function() {
                $scope.dataRealtime[0].values.shift();
                $scope.dataRealtime[0].values.push({ x: 59, y: interactTemp.length });
                interactTemp = [];
                $scope.$apply(); // update both chart
            }, 60000);
        };
    }

    angular
        .module('mean.zalo-chatbot', ['md.data.table', 'nvd3'])
        .controller('InteractController', InteractController);

    InteractController.$inject = ['$scope', 'Global', 'Interact', '$stateParams', '$location'];

})();
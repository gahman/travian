(function () {
    'use strict';

    angular.module('app').controller('playerController', playerController);
    
    function playerController($scope, $location, travianFactory, stateService) {
        var vm = this;

        var userId = $location.search().id;
        var serverName = $location.search().server;

        vm.getPlayer = function (uid, server) {
            if (typeof (server) === 'undefined') server = 'ts19';
            travianFactory.travian().get({ id: uid, category: 'player', server: server }, function (data) {
                if (data.api) {

                    vm.player = data.api.player;
                    vm.player.villages = [];
                    vm.player.alliance = data.api.player.alliance;

                    console.log("player name: " + vm.player.name);

                    // if more than one village
                    console.log(Object.prototype.toString.call(data.api.villages.data));

                    var mapDataToVillage = function (data, village) {
                        village.name = data.name;
                        village.id = data.id;
                        village.inhabitants = data.inhabitants;
                        village.coordinates = data.coordinates;
                    }

                    if (Object.prototype.toString.call(data.api.villages.data) === '[object Array]') {
                        angular.forEach(data.api.villages.data, function (value, key) {
                            var village = new Village;
                            mapDataToVillage(value, village);
                            vm.player.villages.push(village);
                        });
                    } else {
                        var village = new Village;
                        mapDataToVillage(data.api.villages.data, village);
                        vm.player.villages.push(village);
                    }

                    stateService.setActivePlayer(vm.player);
                } else {
                    // player not found

                }
            }, function (error) {
                console.log("failed to get player with id: " + uid);
                // TODO: notify user
            });
            vm.uid = '';
        }

        vm.savePlayer = function (player) {
            travianFactory.travian().save(player);
        }

        vm.deletePlayer = function (id) {
            travianFactory.travian().delete({ id: id });
        }

        init();

        function init() {
            vm.player = stateService.getActivePlayer();
            if (userId) {
                if (vm.player.uid != userId) {
                    vm.getPlayer(userId, serverName);
                }
            }
        }
    };
})();
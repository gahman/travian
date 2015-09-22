(function () {
    'use strict';

    angular.module('app').controller('playerController', playerController);
    
    function playerController(travianFactory) {
        var vm = this;
        vm.uid = '';
        vm.player = new Player;

        vm.setUID = function (uid) {
            vm.uid = uid;
        }

        vm.navigated = "in player controller";

        vm.getPlayer = function (uid) {
            travianFactory.travian().get({ id: uid }, function (data) {
                vm.player = data.api.player;
                vm.player.villages = [];

                console.log("player name: " + vm.player.name);

                angular.forEach(data.api.villages.data, function (value, key) {
                    var village = new Village;
                    village.name = value.name;
                    village.id = value.id;
                    village.population = value.inhabitants;
                    village.coordinates = value.coordinates;
                    vm.player.villages.push(village);
                });
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
    };
})();
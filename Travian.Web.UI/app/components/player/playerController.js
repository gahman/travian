(function () {
    'use strict';

    angular.module('app').controller('playerController', playerController);
    
    function playerController($scope, $location, travianFactory, stateService) {
        var vm = this;

        var userId = $location.search().id;
        var serverName = $location.search().server;

        vm.unitSpeed = 6;
        vm.landTime = new Date();
        vm.tournament = 100;

        vm.distances = [];
        vm.idSelectedVillage = null;
        vm.selectedVillage = null;

        vm.getPlayer = getPlayer;
        vm.setSelectedVillage = setSelectedVillage;
        vm.hasExpired = hasExpired;

        $scope.$watch('vm.landTime', function () { // assuming that view use the same 'vm', othwerwise go 'playerController.landTime'
            updateTables();
        });
        
        // return true if the date (time) has passed the current date (time)
        function hasExpired(date) {
            return date <= Date.now();
        }

        function setSelectedVillage(selectedVillage) {
            vm.idSelectedVillage = selectedVillage.did;
            vm.selectedVillage = selectedVillage;
            updateTables();
        }

        // update the distance and launch time tables
        function updateTables() {
            if (vm.landTime && vm.selectedVillage) {
                vm.distances = [];
                angular.forEach(vm.player.villages, function (village, key) {
                    var dist = calcTravianDistance(vm.selectedVillage, village); // d:hh:mm:ss
                    var p = stringToParams(dist);
                    var launchDate = new Date(
                        vm.landTime.getFullYear(),
                        vm.landTime.getMonth(),
                        vm.landTime.getDate() - p.days,
                        vm.landTime.getHours() - p.hours,
                        vm.landTime.getMinutes() - p.minutes,
                        vm.landTime.getSeconds() - p.seconds,
                        0);
                    vm.distances.push({ distance: dist, launchTime: launchDate, formattedLaunchTime: dateToString(launchDate) });
                });
            };
        }

        function getPlayer(uid, server) {
            if (typeof (server) === 'undefined') server = 'ts19';
            travianFactory.travian().get({ id: uid, category: 'player', server: server }, function (data) {
                if (data.api) {

                    vm.player = data.api.player;
                    vm.player.villages = [];
                    vm.player.alliance = data.api.player.alliance;

                    console.log("player name: " + vm.player.name);

                    var mapDataToVillage = function (data, village) {
                        village.name = data.name;
                        village.did = data.did;
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
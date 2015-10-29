/// <reference path="../../shared/model.js" />
/// <reference path="C:\Projects\Travian\Web\Travian.Web\Travian.Web.UI\assets/js/utilities.js" />
/// <reference path="C:\Projects\Travian\Web\Travian.Web\Travian.Web.UI\Scripts\angular.min.js" />

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
        vm.selectedVillage = null;
        vm.player = null;
        vm.targetPlayer = null;
        vm.selectedTargetVillage = null;

        vm.getPlayer = getPlayer;
        vm.setSelectedVillage = setSelectedVillage;
        vm.setSelectedTargetVillage = setSelectedTargetVillage;
        vm.hasExpired = hasExpired;

        $scope.$watch('vm.landTime', function () { // assuming that view use the same 'vm', othwerwise go 'playerController.landTime'
            updateTables();
        });
        
        // return true if the date (time) has passed the current date (time)
        function hasExpired(date) {
            return date <= Date.now();
        }

        function setSelectedVillage(selectedVillage) {
            vm.selectedVillage = selectedVillage;
            updateTables();
        }
        
        function setSelectedTargetVillage(selectedVillage) {
            vm.selectedTargetVillage = selectedVillage;
        }

        function getPlayer(player, playerType, server) {
            if (typeof (server) === 'undefined') server = 'ts19.travian.se';
            travianFactory.travian().get({ id: player.uid, category: 'player', server: server }, function (data) {
                if (data.api) {

                    player = data.api.player;
                    player.villages = [];
                    player.alliance = data.api.player.alliance;

                    console.log("player name: " + player.name);

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
                            player.villages.push(village);
                        });
                    } else {
                        var village = new Village;
                        mapDataToVillage(data.api.villages.data, village);
                        player.villages.push(village);
                    }

                    if (playerType === "playerBtn") {
                        stateService.setActivePlayer(player);
                        vm.player = player;
                    } else {
                        // stateService.setTargetPlayer(player);
                        vm.targetPlayer = player;
                    }
                    console.log("target player: " + vm.targetPlayer.name);
                } else {
                    // player not found

                }
            }, function (error) {
                console.log("failed to get player with id: " + player.uid);
                // TODO: notify user
            });
        }

        vm.savePlayer = function (player) {
            travianFactory.travian().save(player);
        }

        vm.deletePlayer = function (id) {
            travianFactory.travian().delete({ id: id });
        }
        
        // update the distance and launch time tables
        function updateTables() {
            if (vm.landTime && vm.selectedVillage && vm.targetPlayer) {
                vm.distances = [];
                angular.forEach(vm.targetPlayer.villages, function (village, key) {
                    var dist = calcTravianDistance(vm.selectedVillage, village, vm.unitSpeed, vm.tournament); // d:hh:mm:ss
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

        init();

        function init() {
            vm.player = stateService.getActivePlayer();
            // vm.targetPlayer = stateService.getTargetPlayer();½½½
            if (userId) {
                if (vm.player.uid != userId) {
                    vm.getPlayer(vm.player, 'playerBtn', serverName);
                }
            }
        }
    };
})();
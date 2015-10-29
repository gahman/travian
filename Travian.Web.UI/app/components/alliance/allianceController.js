(function () {
    'use strict';

    angular.module('app').controller('allianceController', allianceController);

    function allianceController($scope, $location, travianFactory, stateService) {
        var vm = this;

        var allianceId = $location.search().id;
        var serverName = $location.search().server;

        vm.getAlliance = function (uid, server) {
            if (typeof (server) === 'undefined') server = 'ts19.travian.se';
            travianFactory.travian().get({ id: uid, category: 'alliance', server: server }, function (data) {
                if (data.api) {
                    vm.alliance = data.api.alliance;
                    vm.alliance.players = [];

                    console.log("alliance name: " + vm.alliance.name);

                    
                    if (Object.prototype.toString.call(data.api.players.data) === '[object Array]') {
                        angular.forEach(data.api.players.data, function (value, key) {
                            var player = new Player;
                            player.uid = value.uid;
                            player.name = value.name;
                            player.inhabitants = value.inhabitants;
                            player.rank = value.rank;

                            vm.alliance.players.push(player);
                        });
                    } else {
                        var player = new Player;
                        player.uid = data.api.players.data.uid;
                        player.name = data.api.players.data.name;
                        player.inhabitants = data.api.players.data.inhabitants;
                        player.rank = data.api.players.data.rank;

                        vm.alliance.players.push(player);
                    }
                    stateService.setActiveAlliance(vm.alliance);
                } else {
                    // alliance id not found
                }

            }, function (error) {
                console.log("failed to get alliance with id: " + vm.aid);
                // TODO: notify user
            });
            vm.uid = '';
        }

        init();

        function init() {
            vm.alliance = stateService.getActiveAlliance();
            if (allianceId) {
                if (vm.alliance.aid != allianceId) {
                    vm.getAlliance(allianceId, serverName);
                }
            }
        }
    }

})();
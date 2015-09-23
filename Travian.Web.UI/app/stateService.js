(function () {
    'use strict';

    angular.module('app').service('stateService', stateService);

    function stateService(localStorageService) {

        var activePlayer = ''; // active player
        var activeAlliance = ''; // active alliance


        var setActivePlayer = function (player) {
            localStorageService.set('activePlayer', player);
            activePlayer = player;
        }

        var getActivePlayer = function () {
            if (!activePlayer) {
                var activePlayer = localStorageService.get('activePlayer');
                if (!activePlayer) {
                    activePlayer = new Player;
                }
            }

            return activePlayer;
        }

        var setActiveAlliance = function (alliance) {
            localStorageService.set('activeAlliance', alliance);
            activeAlliance = alliance;
        }

        var getActiveAlliance = function () {
            if (!activeAlliance) {
                var activeAlliance = localStorageService.get('activeAlliance');
                if (!activeAlliance) {
                    activeAlliance = new Alliance;
                }
            }

            return activeAlliance;
        }


        return {
            setActivePlayer: setActivePlayer,
            getActivePlayer: getActivePlayer,

            setActiveAlliance: setActiveAlliance,
            getActiveAlliance: getActiveAlliance
        };
    };
})();
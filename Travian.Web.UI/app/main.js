﻿(function () {
    'use strict';

    angular.module('app', ['LocalStorageModule', 'ngResource', 'ngRoute'])

        .config(function ($routeProvider, localStorageServiceProvider) {
            $routeProvider
                // route for the player page
                .when('/', {
                    templateUrl: 'views/player.html',
                    controller: 'playerController as vm'
                })

                // route for the player page
                .when('/player', {
                    templateUrl: 'views/player.html',
                    controller: 'playerController as vm'
                })

                // route for the village page
                .when('/village', {
                    templateUrl: 'views/village.html',
                    controller: 'villageController as vm'
                })

                // route for the alliance page
                .when('/alliance', {
                    templateUrl: 'views/alliance.html',
                    controller: 'allianceController as vm'
                });

            localStorageServiceProvider.setPrefix('travian').setNotify(true, true);
            // localStorageServiceProvider.setStorageType('sessionStorage');
        })

        .controller('mainController', function ($scope) {
            $scope.navigated = "in main controller";

        })

        .factory('travianFactory', travianFactory);

    function travianFactory($http, $resource) {
        return ({
            travian: function (uid) {
                return $resource("http://localhost:53000/api/travian/:id");
            }
        });
    }
})();

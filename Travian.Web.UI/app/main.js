(function () {
    'use strict';

    angular.module('app', ['ngResource', 'ngRoute'])

        .config(function ($routeProvider) {
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
                    controller: 'villageController'
                })

                // route for the alliance page
                .when('/alliance', {
                    templateUrl: 'views/alliance.html',
                    controller: 'allianceController'
                });
        })

        .controller('mainController', function ($scope) {
            $scope.navigated = "in main controller";

        })

        .controller('allianceController', allianceController)

        .factory('travianFactory', travianFactory);

    function allianceController($scope) {
        $scope.navigated = "in alliance controller";
    }

    function travianFactory($http, $resource) {
        return ({
            travian: function (uid) {
                return $resource("http://localhost:53000/api/travian/:id");
            }
        });
    }
})();

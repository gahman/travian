(function () {
    'use strict';

    // NOTE: mgcrera.ngStrap kanske behöver ngAnimate?
    angular.module('app', ['mgcrea.ngStrap', 'LocalStorageModule', 'ngResource', 'ngRoute'])

        .config(function ($routeProvider, $locationProvider, localStorageServiceProvider) {
            $routeProvider
                // route for the player page
                .when('/', {
                    templateUrl: 'app/components/player/playerView.html',
                    controller: 'playerController as vm'
                })

                // route for the player page
                .when('/player', {
                    templateUrl: 'app/components/player/playerView.html',
                    controller: 'playerController as vm'
                })

                // route for the village page
                .when('/village', {
                    templateUrl: 'app/components/village/villageView.html',
                    controller: 'villageController as vm'
                })

                // route for the alliance page
                .when('/alliance', {
                    templateUrl: 'app/components/alliance/allianceView.html',
                    controller: 'allianceController as vm'
                });

            // one of the steps to remove # from urls, NOTE: weird behavior in FF
            //$locationProvider.html5Mode({
            //    enabled: true,
            //    requireBase: false
            //});
            localStorageServiceProvider.setPrefix('travian').setNotify(true, true);
            // localStorageServiceProvider.setStorageType('sessionStorage');
        })

        .controller('mainController', function ($scope) {
            $scope.selectedTab = 'player';

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

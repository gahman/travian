(function () {
    'use strict';

    angular.module('app').controller('villageController', villageController);

    function villageController($scope) {
        $scope.navigated = "in village controller";
        $scope.viewName = "village view edited";

    }

})();
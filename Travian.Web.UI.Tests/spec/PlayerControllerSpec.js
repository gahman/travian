// tests for playerController.js
'use strict';

describe("playerController", function () {
    var $controller;
    var $scope, controller;
    var $rootScope;

    beforeEach(module('app'));

    beforeEach(inject(function (_$rootScope_, _$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $rootScope = _$rootScope_;
    }));

    beforeEach(function () {
        $scope = $rootScope.$new();
        controller = $controller('playerController', { $scope: $scope });
    });

    describe("hasExpired", function () {
        it("return false if the passed date is in the future", function () {
            var futureDate = new Date();
            futureDate.setHours(futureDate.getHours() + 1);
            expect(controller.hasExpired(futureDate)).toBe(false);
        });
        it("return true if the passed date is in the passed", function () {
            var passedDate = new Date();
            passedDate.setHours(passedDate.getHours() - 1);
            expect(controller.hasExpired(passedDate)).toBe(true);
        });
    });

    describe("setSelectedVillage", function () {
        it("should set the selected village", function () {
            expect(controller.selectedVillage).toBeNull();
            controller.setSelectedVillage(new Village());
            expect(controller.selectedVillage).not.toBeNull();
        });
        xit("should update the tables", function () {
            spyOn(controller, 'update');
            controller.setSelectedVillage(new Village());
            
            expect(controller.update).toHaveBeenCalled();
        })
    })
});
// tests for stateService
'use strict';

describe("stateService", function() {
	var service, localStorage;
	var mockLocalStorage = function () {
		// get: function() { return 1; },
		// set: function(value) { return value; }
		this.get = jasmine.createSpy('get');
		this.set = jasmine.createSpy('set');
	}
	
	beforeEach(module('app'));
	
	beforeEach(module(function($provide) {
		$provide.service("localStorageService", mockLocalStorage);
	}));

    beforeEach(inject(function (_stateService_, _localStorageService_) {
		localStorage = _localStorageService_;
        service = _stateService_;
    }));
	
	describe("getActivePlayer", function() {
		it("should get player from local storage if no active player", function() {
			service.activePlayer = null;
			var aPlayer = service.getActivePlayer();
			expect(localStorage.get).toHaveBeenCalled();
		});
	});
	
	describe("setActivePlayer", function() {
		it("should save the player to local storage", function () {
			var existingPlayer = new Player();
			existingPlayer.name = "test player";
			service.setActivePlayer(existingPlayer);
			expect(localStorage.set).toHaveBeenCalled();
		});
	});	
});
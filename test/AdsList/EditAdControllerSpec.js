/// <reference path="../../typings/tsd.d.ts" />

describe("editAdController", function () {
	var adsServiceMock;
	var controller;
	var scope;

	beforeEach(module("app"));
	beforeEach(module(function ($provide) {
		$provide.factory("adsService", function () {
			return adsServiceMock;
		});
	}));
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		scope.ad = {
			name: "foo",
			campaignName: "bar",
			picture: "somePic",
			description: "testing",
			isActive: false,
			$update: jasmine.createSpy("update")
		};
		scope.$close = jasmine.createSpy("close");
		controller = $controller("EditAdController", {
			$scope: scope,
			adsService: adsServiceMock
		});
		scope.$apply();
	}));
	
	it("does not close edit modal when submitting if a field is empty", function () {
		//Arrange
		scope.name = "";
		
		//Act
		scope.submit();
		
		//Assert
		expect(scope.$close).not.toHaveBeenCalled();
	});
	
	it("closes the modal and updates(PUTs) the ad when submitting", function () {
		//Arrange
		scope.name = "new Name";
		
		//Act
		scope.submit();
		
		//Assert
		expect(scope.ad.name).toBe("new Name");
		expect(scope.$close).toHaveBeenCalled();
		expect(scope.ad.$update).toHaveBeenCalled();
	});
});

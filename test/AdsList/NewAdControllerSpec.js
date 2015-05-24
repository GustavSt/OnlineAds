/// <reference path="../../typings/tsd.d.ts" />

describe("NewAdController", function () {
	var adsServiceMock;
	var scope;
	var controller;
	var $q;
	
	function pupulateScope(scoe) {
		scope.name = "foo",
		scope.campaignName = "bar",
		scope.picture = "fooPic",
		scope.description = "testing";
		scope.isActive = true;
	}
	beforeEach(module("app"));
	beforeEach(module(function ($provide) {
		adsServiceMock = jasmine.createSpyObj("AdsServiceMock", ["addNewAd"]);
		$provide.factory("adsService", function () {
			return adsServiceMock;
		});
	}));

	beforeEach(inject(function ($controller, $rootScope, _$q_) {
		$q = _$q_;
		scope = $rootScope.$new();
		controller = $controller("NewAdController", {
			$scope: scope,
			adsService: adsServiceMock
		});
		scope.$apply();
	}));

	it("does not ad new ad if any propery is empty", function () {
		//act
		scope.submit();
		
		//Assert
		expect(adsServiceMock.addNewAd).not.toHaveBeenCalled();
	});
	
	it("ads the new ad and closes modal on successful ad", function () {
		//Arrange
		scope.$close = jasmine.createSpy("$close");
		var expectedNewAd;
		adsServiceMock.addNewAd.and.callFake(function (newAd) {
			expectedNewAd = newAd;
			var deferred = $q.defer();
			deferred.resolve(newAd);
			return {
				$promise: deferred.promise
			};
		});
		pupulateScope();
		//Act
		scope.submit();
		scope.$apply();
		
		//Assert
		expect(scope.$close).toHaveBeenCalledWith(expectedNewAd);
	});
});

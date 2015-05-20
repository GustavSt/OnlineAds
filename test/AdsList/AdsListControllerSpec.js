/// <reference path="../../typings/tsd.d.ts" />

describe("adsListController", function () {
	var controller;
	var adsServiceMock;
	var modalServiceMock;
	var scope;
	var $q;
	beforeEach(angular.mock.module("app"));
	beforeEach(function () {
		adsServiceMock = jasmine.createSpyObj("adsServiceMock", ["buildAdRows", "getAds"]);
		modalServiceMock = jasmine.createSpyObj("modalServiceMock", ["open"]);
		
		adsServiceMock.getAds.and.callFake(function () {
			return [];
		});
	});
	beforeEach(angular.mock.inject(function ($controller, $rootScope, _$q_) {
		$q = _$q_;
		scope = $rootScope.$new();
		controller = $controller("AdsListController", {
			$scope: scope,
			adsService: adsServiceMock,
			$modal: modalServiceMock
		});
		scope.$apply();
	}));

	describe("add a new ad", function () {
		var deferred;
		beforeEach(function () {
			deferred = $q.defer();
			modalServiceMock.open.and.callFake(function () {
				return {
					result: deferred.promise
				};
			});
		});
		
		it("opens $modal", function () {
			//Act
			scope.newAd();
			//Assert
			expect(modalServiceMock.open).toHaveBeenCalled();
		});
		
		it("ads the new ad to the adsContainer once the modal closes",function () {
			//Arrange
			var newAd = {foo: "bar"};
			//Act
			scope.newAd();
			deferred.resolve(newAd);
			scope.$apply();
			
			//Assert
			expect(scope.adsContainer.ads[0]).toBe(newAd);
		});
	});
	
	describe("when adsContainer changes", function () {
		it("updates the adsRows", function () {
			//Arrange
			var newAd = {foo: "bar"};
			//Act
			scope.adsContainer.ads.push(newAd);
			scope.$apply();
			//Assert
			expect(adsServiceMock.buildAdRows).toHaveBeenCalledWith(scope.adsContainer.ads);
		});
	});

});

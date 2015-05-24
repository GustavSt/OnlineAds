/// <reference path="../../typings/tsd.d.ts" />

describe("online ad directive", function () {
	var scope;
	var modalMock;
	var adsServiceMock;
	var element;
	var ad;
	var $q;
	beforeEach(module("app"));
	beforeEach(module("app/AdsList/onlineAd.html"));
	beforeEach(module("app/AdsList/adStatus.html"));

	beforeEach(module(function ($provide) {
		modalMock = jasmine.createSpyObj("modalMock", ["open"]);
		adsServiceMock = jasmine.createSpyObj("adsServiceMock", ["getAds"]);
		$provide.factory("$modal", function () {
			return modalMock;
		});

		$provide.factory("adsService", function () {
			return adsServiceMock;
		});
	}));

	beforeEach(inject(function ($compile, $rootScope, _$q_) {
		$q = _$q_;
		ad = {
			name: "foo",
			campaignName: "bar",
			impressions: 15,
			spend: 150
		};
		scope = $rootScope.$new();
		scope.ad = ad;
		element = $compile("<online-ad></online-ad>")(scope);
		scope.$digest();
	}));

	it("views ad properties", function () {
		expect(element.find(".online-ad-name")).toContainHtml(ad.name);
		expect(element.find(".info-value").get(0)).toContainHtml(ad.campaignName);
		expect(element.find(".info-value").get(1)).toContainHtml(ad.impressions);
		expect(element.find(".info-value").get(2)).toContainHtml(ad.spend);
	});

	it("removes the ad from adsContainer", function () {
		//Arrange
		scope.adsContainer = { ads: [scope.ad] };
		scope.ad.$delete = function () {
			var deferred = $q.defer();
			deferred.resolve();
			return deferred.promise;
		};
		
		//Act
		scope.remove();
		//resolved promises then-functions gets executed on scope.$apply
		scope.$apply();
		
		//assert
		expect(scope.adsContainer.ads.length).toBe(0);
	});

	describe("edit ad", function () {
		var resultDeferred;
		var getDeferred;
		beforeEach(function () {
			modalMock.open.and.callFake(function () {
				resultDeferred = $q.defer();
				return {
					result: resultDeferred.promise
				};
			});
			scope.ad.$get = function () {
				getDeferred = $q.defer();
				return getDeferred.promise;
			};
		});
		
		it("opens modal when user edits ad", function () {
			//act
			scope.edit();
			
			//assert
			expect(modalMock.open).toHaveBeenCalled();
		});
	});
});

/// <reference path="../../typings/tsd.d.ts" />

describe("adsService", function () {
	var sut;
	var http;
	beforeEach(module("app"));

	beforeEach(inject(function ($httpBackend, adsService) {
		http = $httpBackend;
		sut = adsService;
	}));

	afterEach(function () {
		http.verifyNoOutstandingExpectation();
		http.verifyNoOutstandingRequest();
	});

	it("gets all ads", function () {
		//Arrange
		http.whenGET("/api/ads").respond([{ name: "ad" }]);
		http.expectGET("/api/ads");
		//Act
		sut.getAds();
		http.flush();
	});

	it("ads a new ad", function () {
		//Arrange
		var newAd = { _id: 1234 };
		http.whenPOST("/api/ads/1234").respond({ _id: 1234, added: true });
		http.expectPOST("/api/ads/1234");
		//Act
		var result = sut.addNewAd(newAd);
		http.flush();
		//Assert
		expect(result.added).toBeTruthy();
	});

	describe("building adRows returns an array of", function () {
		it("one array containing 3 ads when providing 3 ads", function () {
			//Arrange
			var ads = [1, 2, 3];
			//Act
			var result = sut.buildAdRows(ads);
			
			//Assert
			expect(result.length).toBe(1);
			expect(result[0][0]).toBe(1);
			expect(result[0][1]).toBe(2);
			expect(result[0][2]).toBe(3);
		});

		it("2 arrays, one containing 3 ads and one 2 ads when providing 5 ads", function () {
			//Arramge
			var ads = [1, 2, 3, 4, 5];
			//Act
			var result = sut.buildAdRows(ads);
			//Assert
			expect(result.length).toBe(2);
			expect(result[0][0]).toBe(1);
			expect(result[0][1]).toBe(2);
			expect(result[0][2]).toBe(3);
			expect(result[1][0]).toBe(4);
			expect(result[1][1]).toBe(5);
		});

		it("3 arrays, 2 containing 3 ads and one 2 ads when providing 8 ads", function () {
			//Arramge
			var ads = [1, 2, 3, 4, 5,6,7,8];
			//Act
			var result = sut.buildAdRows(ads);
			//Assert
			expect(result.length).toBe(3);
			expect(result[0][0]).toBe(1);
			expect(result[0][1]).toBe(2);
			expect(result[0][2]).toBe(3);
			expect(result[1][0]).toBe(4);
			expect(result[1][1]).toBe(5);
			expect(result[1][2]).toBe(6);
			expect(result[2][0]).toBe(7);
			expect(result[2][1]).toBe(8);
		});
	});
});

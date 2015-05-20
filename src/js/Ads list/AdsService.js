/// <reference path="../app.js" />

app.service("adsService", ["$resource", function ($resource) {
	var adsResource = $resource(
		"/api/ads/:id", 
		{ id: "@_id" },
		{
			"update": { method: "PUT" }
		});


	this.getAds = function () {
		return adsResource.query();
	};

	/**
	 * returns an array of arrays each containg max 3 ads
	 */
	this.buildAdRows = function (ads) {
		var adsRows = [];
		for (var i = 0; i < ads.length; i++) {
			var currentAd = ads[i];
			var currentAdsRowsIndex = adsRows.length - 1;
			if (i % 3 === 0) {
				adsRows[adsRows.length] = [currentAd];
			} else if (!adsRows[currentAdsRowsIndex]) {
				adsRows[currentAdsRowsIndex] = [currentAd];
			} else {
				adsRows[currentAdsRowsIndex].push(currentAd);
			}
		}
		return adsRows;
	};

	this.addNewAd = function (newAd) {
		return adsResource.save(newAd);
	};
}]);
/// <reference path="../app.js" />

app.service("adsService", ["$resource", function ($resource) {
	this.adsResource = $resource(
		"/api/ads/:id",
		{ id: "@_id" },
		{
			"update": { method: "PUT" }
		});


	this.getAds = function () {
		return this.adsResource.query();
	};

	this.buildAdRows = function (ads) {
		var adsRows = [];
		for (var i = 0; i < ads.length; i++) {
			if (i % 3 === 0) {
				adsRows[adsRows.length] = [ads[i]];
			} else if (!adsRows[adsRows.length - 1]) {
				adsRows[adsRows.length - 1] = [ads[i]];
			} else {
				adsRows[adsRows.length - 1].push(ads[i]);
			}
		}
		return adsRows;
	};

	this.addNewAd = function (newAd) {
		return this.adsResource.save(newAd);
	};
}]);
/// <reference path="../app.js" />

app.controller("AdsListController",
	["$scope", "adsService",
		function ($scope, adsService) {
			$scope.adsRows = [];

			adsService.getAds().$promise.then(function (ads) {
				$scope.adsRows = adsService.buildAdRows(ads);
			});
		}]);

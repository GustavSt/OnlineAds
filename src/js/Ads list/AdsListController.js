/// <reference path="../app.js" />

app.controller("AdsListController",
	["$scope", "$resource",
		function ($scope, $resource) {
			var ads = $resource("/api/ads").query();
			$scope.adsRows = [];
			ads.$promise.then(function () {
				for (var i = 0; i < ads.length; i++) {
					if (i % 3 === 0) {
						$scope.adsRows[$scope.adsRows.length] = [ads[i]];
					} else if (!$scope.adsRows[$scope.adsRows.length - 1]) {
						$scope.adsRows[$scope.adsRows.length - 1] = [ads[i]];
					} else {
						$scope.adsRows[$scope.adsRows.length - 1].push(ads[i]);
					}
				}
			});
		}]);

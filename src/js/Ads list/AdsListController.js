/// <reference path="../app.js" />

app.controller("AdsListController",
	["$scope", "adsService",
		function ($scope, adsService) {
			$scope.adsRows = [];
			$scope.ads = adsService.getAds();
			
			$scope.newAd = function () {
				$scope.$broadcast("openNewAdModal");
			};
			
			$scope.$watch("ads", function (newValue, oldValue) {
				if(newValue === oldValue){
					return;
				}
				$scope.adsRows = adsService.buildAdRows(newValue);
			}, true);
		}]);

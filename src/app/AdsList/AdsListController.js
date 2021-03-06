/// <reference path="../app.js" />

app.controller("AdsListController",
	["$scope", "adsService", "$modal",
		function ($scope, adsService, $modal) {
			$scope.adsRows = [];
			$scope.adsContainer = {
				ads: adsService.getAds()
			};

			$scope.newAd = function () {
				var modalInstance = $modal.open({
					templateUrl: "app/AdsList/adInfoModal.html",
					controller: "NewAdController"
				});
				modalInstance.result.then(function (newAd) {
					$scope.adsContainer.ads.push(newAd);
				});
			};

			$scope.$watch("adsContainer", function (newValue, oldValue) {
				if (newValue === oldValue) {
					return;
				}
				$scope.adsRows = adsService.buildAdRows(newValue.ads);
			}, true);
		}]);

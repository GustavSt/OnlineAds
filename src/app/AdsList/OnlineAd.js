/// <reference path="../app.js" />

app.directive("onlineAd",["$modal", "adsService", function ($modal, adsService) {
	return {
		replace: true,
		templateUrl: "app/AdsList/onlineAd.html",
		link: function ($scope, element, attrs) {
			$scope.remove = function () {
				$scope.ad.$delete().then(function () {
					var indexToDelete = $scope.adsContainer.ads.indexOf($scope.ad);
					$scope.adsContainer.ads.splice(indexToDelete, 1);
				});
			};
			$scope.edit = function () {
				var modalInstance = $modal.open({
					templateUrl: "app/AdsList/adInfoModal.html",
					controller: "EditAdController",
					scope: $scope
				});
				
				modalInstance.result.catch(function (error) {
					$scope.ad.$get().catch(function (error) {
						$scope.adsContainer.ads = adsService.getAds();
					});
				});
			};
		}
	};
}]);

/// <reference path="../app.js" />

app.directive("newAdModal", ["adsService", function (adsService) {
	return {
		replace: true,
		scope: true,
		templateUrl: "../views/partials/newModal.html",
		link: function ($scope, element, attrs) {
			$scope.$on("openNewAdModal", function () {
				element.modal();
			});
			$scope.addNewAd = function () {
				if (!isFormValid()) {
					return;
				}
				adsService.addNewAd({
					adName: $scope.adName,
					campaignName: $scope.campaignName,
					pictureUrl: $scope.pictureUrl,
					description: $scope.description
				}).$promise.then(function (createdAd) {
					$scope.ads.push(createdAd);
				});
				element.modal("hide");
			};
			function isFormValid() {
				if ((!$scope.adName || $scope.adName === "")
					|| (!$scope.campaignName || $scope.campaignName === "")
					|| (!$scope.pictureUrl || $scope.pictureUrl === "")
					|| (!$scope.description || $scope.description === "")) {
					return false;
				}
				return true;
			}
			function resetScope() {
				$scope.adName = undefined;
				$scope.campaignName = undefined;
				$scope.pictureUrl = undefined;
				$scope.description = undefined;
			}

			element.on("hidden.bs.modal", function () {
				resetScope();
			});
		}
	};
}]);
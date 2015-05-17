/// <reference path="../app.js" />

app.directive("newAdModal", function () {
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
});
app.controller("NewAdController", ["$scope", "adsService", function ($scope, adsService) {
	$scope.modalHeader = "Create new Ad";
	$scope.modalButton = "Add";

	$scope.submit = function () {
		if (!isFormValid()) {
			return;
		}
		adsService.addNewAd({
			adName: $scope.adName,
			campaignName: $scope.campaignName,
			picture: $scope.picture,
			description: $scope.description,
			isActive: $scope.isActive
		}).$promise.then(function (createdAd) {
			$scope.$close(createdAd);
		});
	};

	function isFormValid() {
		if ((!$scope.adName || $scope.adName === "")
			|| (!$scope.campaignName || $scope.campaignName === "")
			|| (!$scope.picture || $scope.picture === "")
			|| (!$scope.description || $scope.description === "")) {
			return false;
		}
		return true;
	}
}]);
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
			pictureUrl: $scope.pictureUrl,
			description: $scope.description
		}).$promise.then(function (createdAd) {
			$scope.$close(createdAd);
		});
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
}]);
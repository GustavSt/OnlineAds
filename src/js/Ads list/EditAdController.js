app.controller("EditAdController", ["$scope", "adsService", function ($scope, adsService) {
	initForm($scope.ad);
	
	$scope.submit = function () {
		if (!isFormValid()) {
			return;
		}
		console.log("edit");
		$scope.$close("fooo");
	};
	function initForm(ad) {
		$scope.modalHeader = "Edit " + ad.name;
		$scope.modalButton = "Edit";
		$scope.adName = ad.name;
		$scope.campaignName = ad.campaignName;
		$scope.picture = ad.picture;
		$scope.description = ad.description;
		$scope.isActive = ad.isActive;
	}
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
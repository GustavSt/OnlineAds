app.controller("EditAdController", ["$scope", "adsService", function ($scope, adsService) {
	$scope.modalHeader = "Edit " + $scope.ad.name;
	$scope.modalButton = "Edit";
	mapAd($scope, $scope.ad);

	$scope.submit = function () {
		if (!isFormValid()) {
			return;
		}
		console.log("edit");
		$scope.$close("fooo");
	};
	function mapAd(toAd, fromAd) {
		toAd.name = fromAd.name;
		toAd.campaignName = fromAd.campaignName;
		toAd.picture = fromAd.picture;
		toAd.description = fromAd.description;
		toAd.isActive = fromAd.isActive;
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
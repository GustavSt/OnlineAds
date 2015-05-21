app.controller("EditAdController", ["$scope", "adsService", function ($scope, adsService) {
	$scope.modalHeader = "Edit " + $scope.ad.name;
	$scope.modalButton = "Edit";
	mapAdInfo($scope, $scope.ad);

	$scope.submit = function () {
		if (!isFormValid()) {
			return;
		}
		mapAdInfo($scope.ad, $scope);
		$scope.$close($scope.ad.$update());
	};
	function mapAdInfo(toAdInfo, fromAdInfo) {
		toAdInfo.name = fromAdInfo.name;
		toAdInfo.campaignName = fromAdInfo.campaignName;
		toAdInfo.picture = fromAdInfo.picture;
		toAdInfo.description = fromAdInfo.description;
		toAdInfo.isActive = fromAdInfo.isActive;
	}
	function isFormValid() {
		if ((!$scope.name || $scope.name === "")
			|| (!$scope.campaignName || $scope.campaignName === "")
			|| (!$scope.picture || $scope.picture === "")
			|| (!$scope.description || $scope.description === "")) {
			return false;
		}
		return true;
	}
}]);
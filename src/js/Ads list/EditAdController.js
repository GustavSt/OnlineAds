app.controller("EditAdController", ["$scope", "adsService", function ($scope, adsService) {
	$scope.modalHeader = "Edit " + $scope.ad.name;
	$scope.modalButton = "Edit";

	$scope.submit = function () {
		console.log("edit");
		$scope.$close("fooo");
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
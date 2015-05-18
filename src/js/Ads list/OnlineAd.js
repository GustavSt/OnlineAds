/// <reference path="../app.js" />

app.directive("onlineAd",["$modal", function ($modal) {
	return {
		replace: true,
		templateUrl: "../views/partials/onlineAd.html",
		link: function ($scope, element, attrs) {
			$scope.remove = function () {
				$scope.ad.$delete().then(function () {
					var indexToDelete = $scope.ads.indexOf($scope.ad);
					$scope.ads.splice(indexToDelete, 1);
				});
			};
			$scope.edit = function () {
				$modal.open({
					templateUrl: "../views/partials/adInfoModal.html",
					controller: "EditAdController",
					scope: $scope
				});
			};
		}
	};
}]);

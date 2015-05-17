/// <reference path="../app.js" />

app.directive("onlineAd", function () {
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
		}
	};
});

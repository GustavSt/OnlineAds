/// <reference path="../app.js" />

app.directive("adStatus", function () {
	return {
		replace: true,
		templateUrl: "app/AdsList/adStatus.html",
	};
});

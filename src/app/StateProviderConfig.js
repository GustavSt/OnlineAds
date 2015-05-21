/// <reference path="app.js" />

app.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/ads");

	$stateProvider
		.state("ads", {
		url: "/ads",
		templateUrl: "app/AdsList/AdsList.html",
		controller: "AdsListController"
	})
		.state("about", {
		url: "/about",
		templateUrl: "app/About/About.html"
	});
});

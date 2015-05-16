/// <reference path="app.js" />

app.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/ads");

	$stateProvider
		.state("ads", {
		url: "/ads",
		templateUrl: "../views/AdsList.html"
	})
		.state("about", {
		url: "/about",
		templateUrl: "../views/About.html"
	});
});

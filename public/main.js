/// <reference path="../../typings/tsd.d.ts" />

var app = angular.module("app", ["ui.router"]);
/// <reference path="../../typings/tsd.d.ts" />

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

/// <reference path="../../../typings/tsd.d.ts" />

app.controller("AdsListController", function () {
	
});

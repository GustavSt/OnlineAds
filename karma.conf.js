module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		files: [
			"https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js",
			"https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular-resource.min.js",
			"https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.13.0/ui-bootstrap-tpls.min.js",
			"https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.14/angular-ui-router.min.js",
			"https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular-mocks.js",
			"src/app/app.js",
			"./src/app/AdsList/*.js",
			"src/app/*.js",
			"test/**/*.js"
		],
		browsers: ["PhantomJS"],
		singleRun: true
	});
};
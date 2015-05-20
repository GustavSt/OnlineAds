/// <reference path="typings/tsd.d.ts" />

var gulp = require("gulp");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var shell = require("gulp-shell");
var sequence = require("gulp-sequence");
var sass = require("gulp-sass");
var mongoose = require("mongoose");
var adsSchema = require("./models/ads");
var mockData = require("./mockdata.json");
var karma = require("karma").server;

function runTests(singleRun, done) {
	karma.start({
		configFile: __dirname + "/karma.conf.js",
		singleRun: singleRun
	}, done);
}

gulp.task("start-server", ["compress", "compile-sass"], shell.task([
	"node server/index.js"
]));

gulp.task("test-dev", ["test-multiple"], function (done) {
	gulp.watch(["./src/js/**/*.js", "test/**/*.js"], function () {
		gulp.run("test-multiple");
	});
});

gulp.task("test-multiple", function (done) {
	runTests(false, done);
});

gulp.task("test-single", function (done) {
	runTests(true, done);
});

gulp.task("re-populate-db", function () {
	mongoose.connect("mongodb://localhost/onlineAds");
	var Ads = mongoose.model("ads");
	Ads.find().remove();
	for (var i = 0; i < mockData.length; i++) {
		new Ads(mockData[i]).save();
	}
	return;
});

gulp.task("deploy", ["test-single", "start-server"], function () {
});

gulp.task("deploy-dev", sequence(["compress", "watch-js", "watch-sass"], "deploy"));

gulp.task("watch-js", function () {
	gulp.watch("./src/js/**/*.js", ["compress"]);
});

gulp.task("watch-sass", function () {
	gulp.watch("./src/styling/**/*.scss", ["compile-sass"]);
});

gulp.task("compress", function () {
	return gulp.src(["./src/js/app.js", "./src/js/Ads List/*", "./src/js/*.js"])
		.pipe(concat("main.js"))
		.pipe(gulp.dest("public"));
});

gulp.task("compile-sass", function () {
	gulp.src("./src/styling/**/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(concat("main.css"))
		.pipe(gulp.dest("public"));
});
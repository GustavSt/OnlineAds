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
var inject = require("gulp-inject");
var del = require("del");

function runTests(singleRun, done) {
	karma.start({
		configFile: __dirname + "/karma.conf.js",
		singleRun: singleRun
	}, done);
}

gulp.task("start-server", shell.task([
	"node server/index.js"
]));

gulp.task("test-dev", ["test-multiple"], function (done) {
	gulp.watch(["./src/app/**/*.js", "test/**/*.js"], function () {
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

gulp.task("deploy", sequence("clean-public","test-single", "inject-html-live", "start-server"));

gulp.task("deploy-dev", sequence("clean-public", ["inject-html-dev", "watch-js", "watch-sass"], "start-server"));

gulp.task("watch-js", function () {
	gulp.watch("./src/app/**/*.js", ["move-dev"]);
});

gulp.task("watch-sass", function () {
	gulp.watch("./src/styling/**/*.scss", ["compile-sass"]);
});

gulp.task("compressJs", function () {
	return gulp.src(["./src/app/app.js", "./src/app/AdsList/*.js", "./src/app/*.js"])
		.pipe(concat("main.js"))
		.pipe(gulp.dest("public/app"));
});

gulp.task("compile-sass", function () {
	return gulp.src("./src/styling/**/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(concat("main.css"))
		.pipe(gulp.dest("public/styling"));
});

gulp.task("move-live", function () {
	return gulp.src("src/app/**/*.html")
		.pipe(gulp.dest("public/app"));
});

gulp.task("move-dev", function () {
	return gulp.src("src/app/**/*")
		.pipe(gulp.dest("public/app"));
});

gulp.task("inject-html-live", ["compile-sass", "compressJs", "move-live"], function () {
	
	return gulp.src("src/index.html")
		.pipe(inject(gulp.src(["./public/app/*.js", "./public/styling/*.css"]), { ignorePath: "public" }))
		.pipe(gulp.dest("public"));
});

gulp.task("inject-html-dev", ["move-dev", "compile-sass"], function () {
	var sources = gulp.src([
		"./public/app/app.js",
		"./public/app/AdsList/*.js",
		"./public/app/*.js",
		"./public/styling/*.css"
	]);
	return gulp.src("src/index.html")
		.pipe(inject(sources, { ignorePath: "public" }))
		.pipe(gulp.dest("public"));
});

gulp.task("clean-public", function () {
	del.sync(["public/**/*", "!public/*.jpg"]);
});
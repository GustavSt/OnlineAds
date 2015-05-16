/// <reference path="typings/tsd.d.ts" />

var gulp = require("gulp");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var shell = require("gulp-shell");
var sequence = require("gulp-sequence");
var sass = require("gulp-sass")

gulp.task("start-server", ["compress", "compile-sass"], shell.task([
	"node server/index.js"
]));

gulp.task("test", function () {
	
});

gulp.task("deploy", ["start-server"], function () {
});

gulp.task("deploy-dev", sequence(["compress", "watch-js", "watch-sass"], "deploy"));

gulp.task("watch-js", function () {
	gulp.watch("./src/js/**/*.js", ["compress"]);
});

gulp.task("watch-sass", function () {
	gulp.watch("./src/styling/**/*.scss", ["compile-sass"]);
});

gulp.task("compress", function () {
	return gulp.src(["./src/js/app.js", "./src/js/Ads List/*","./src/js/*.js"])
	.pipe(concat("main.js"))
	.pipe(gulp.dest("public"));
});

gulp.task("compile-sass", function () {
	gulp.src("./src/styling/**/*.scss")
	.pipe(sass().on("error", sass.logError))
	.pipe(concat("main.css"))
	.pipe(gulp.dest("public"));
});
var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var shell = require("gulp-shell");

gulp.task("start-server", ["compress"], shell.task([
	"node server/index.js"
]));

gulp.task("test", function () {
	
});

gulp.task("deploy", ["start-server"], function () {
	
});

gulp.task("compress", function () {
	return gulp.src("./src/js/*.js")
	.pipe(concat("main.js"))
	.pipe(gulp.dest("public"));
});
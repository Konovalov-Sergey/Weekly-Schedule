'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('default', function () {
	browserSync.init({
		server: "app",
		browser: "",
		startPath: "index.html"
	});
	browserSync.watch(['app/**/*.html','app/**/*.js','app/**/*.css']).on('change', browserSync.reload);
});

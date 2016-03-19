"use strict";

/* Import modules */
var fs = require('fs');
var rimraf = require('rimraf');
var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');

/* Function for creating a folder */
function mkdir(path) {
	try { fs.mkdirSync(path); }
	catch(e) { if(e.code !== 'EEXIST') throw e; }
}

/* Set constant variables */
const WATCH_IGNORE = ['!**/~*', '!**/.*̈́', '!**/*.swp'];
const SRC_PATH = 'src/';
const DIST_PATH = 'dist/';
const JS_MAIN = SRC_PATH + 'js/Main.js';
const JS_DISTNAME = 'Game.js';

/* Gulp plugin options */
const WEBPACK_OPTS = {
	target: 'web',
	output: { filename: '[name].js' },
	module: {
		loaders: [ {
			loader: 'babel-loader',
			query: { presets: ['stage-3'] }
		} ],
		cache: true
	}
};

/* Gulp tasks */
gulp.task('javascript', function() {
	return gulp.src(JS_MAIN)
		.pipe( webpack(WEBPACK_OPTS) )
		.pipe( rename({ basename: JS_DISTNAME, extname: '' }) )
		.pipe( gulp.dest(DIST_PATH) )
		.pipe( uglify() )
		.pipe( rename({ extname: '.min.js' }) )
		.pipe( gulp.dest(DIST_PATH) );
});


gulp.task('clean', function() {
	rimraf.sync(DIST_PATH);
	mkdir(DIST_PATH);
});

gulp.task('watch', function() {
	gulp.watch([SRC_PATH + 'js/**', ...WATCH_IGNORE], ['javascript']);
});

gulp.task('build', ['clean', 'javascript']);

/* Default gulp task is build, followed by watch */
gulp.task('default', ['build', 'watch']);

'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');

var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		dist: './dist'
	}
};

// Start server
gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		base: config.devBaseUrl,
		port: config.port,
		livereload: true
	});
});

gulp.task('open', ['connect'], function() {
	gulp.src('./dist/index.html')
		.pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
});

gulp.task('default', ['html', 'open', 'watch'], function() {

});
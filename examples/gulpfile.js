var gulp = require('gulp');
var autoRestart = require('gulp-auto-restart');
autoRestart({'task': 'watch'});

// Default
// ----------------------------------------------------------------------------
gulp.task('default', []);

// Basic tasks
// ----------------------------------------------------------------------------
var stylus = require('gulp-stylus');
gulp.task('stylus', function() {
	gulp.src('src/stylus/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('public/css/'));
});

var jade = require('gulp-jade');
gulp.task('jade', function() {
	gulp.src('src/jade/**/*.jade')
		.pipe(jade({pretty:true}))
		.pipe(gulp.dest('public/'))
});

// Complex tasks
// ----------------------------------------------------------------------------
var browserSync = require('browser-sync');
var browserSyncConfig = {
	server: {
		baseDir: './public',
	},
	open: true,
	browser: ["chrome"],
	reloadOnRestart: true
};
gulp.task('watch', ['jade', 'stylus'], function() {
	var args = require('minimist')(process.argv.slice(2));
	if(args.restart) {
		browserSyncConfig.open = false; // don't reopen browsers on restart.
	}
	browserSync(browserSyncConfig);
	gulp.watch('src/**/*.jade', ['jade', browserSync.reload]);
	gulp.watch('src/stylus/**/*.styl', ['stylus', browserSync.reload]);
});


var options = {
	'gulpfile'     : './gulpfile.js',
	'task'         : 'default',
	'pathToGulpjs' : './node_modules/gulp/bin/gulp.js'
};

var setOptions = function(op) {
	if(typeof op !== 'object') {
		return;
	}
	if(op.gulpfile)     options.gulpfile     = op.gulpfile;
	if(op.task)         options.task         = op.task;
	if(op.pathToGulpjs) options.pathToGulpjs = op.pathToGulpjs;
};

var execute = function(op) {
	setOptions(op);
	if(!gulp) {
		var gulp = require('gulp');
		gulp.task('default', ['auto-restart']);
	}

	var child_process = require('child_process');
	var gulpProcess   = null;
	var platform      = process.platform;
	
	gulp.task('auto-restart', ['spawn-child_process'], function() {
		gulp.watch(options.gulpfile, ['kill-child_process', 'spawn-child_process']);
	});
	
	gulp.task('kill-child_process', function() {
		if(gulpProcess === null) {
			return;
		}
		console.log('kill gulp ( PID : ' + gulpProcess.pid + ' )');
		if(platform === 'win32') {
			child_process.exec('taskkill /PID ' + gulpProcess.pid + ' /T /F', function() {});
			return;
		}
		gulpProcess.kill();
	});
	gulp.task('spawn-child_process', function() {
		var restart = '';
		if(gulpProcess !== null) {
			restart = '--restart';
		}
		gulpProcess = child_process.spawn('node', [options.pathToGulpjs, options.task, restart, '--gulpfile='+options.gulpfile], {stdio: 'inherit'});
		console.log('spawn gulp' + options.task + ' ( PID : ' + gulpProcess.pid + ' )');
	});
};
exports = module.exports = execute;

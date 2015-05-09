var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var del = require('del');
var runSequence = require('run-sequence');

// build creates bundle.js
gulp.task('dist:bundle', ['build'], function () {
  return gulp.src([
      '.tmp/*.js'
    ])
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('dist:style', function () {
	return gulp.src([
			'.tmp/*.css'
		])
		.pipe(gulp.dest('dist'));
});

gulp.task('dist:app', [ 'assets' ], function () {
	return gulp.src([
		  	'src/index.html',
		  	'.tmp/*/**'
	    ])
	    .pipe(gulp.dest('dist'));
});

gulp.task('dist:img', function () {
	return gulp.src([
			'src/img/*.*'
		])
		.pipe(gulp.dest('dist/img'));
});

gulp.task('dist', function () {
	del('dist', function () {
		return runSequence([
			'dist:bundle', 
			'dist:style', 
			'dist:img',
			'dist:app'
		]);
	});
});
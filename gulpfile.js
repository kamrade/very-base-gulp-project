'use strict'

var gulp         = require('gulp');
var rename       = require('gulp-rename');
var sass         = require('gulp-sass');
var cleanCSS     = require('gulp-clean-css');
var autoPrefixer = require('gulp-autoprefixer');
var pug			 = require('gulp-pug');
var livereload   = require('gulp-livereload');
var connect      = require('gulp-connect');

gulp.task('js', function(){
	gulp.src('app/js/*.js')
		.pipe(connect.reload())
		.pipe(gulp.dest('public/js/'));
});

gulp.task('sass', function() {
	gulp.src('app/styles/main.sass')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoPrefixer({
			browsers: ['last 2 versions', '> 1%', 'IE 8'],
			cascade: false
		}))
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(rename('bundle.min.css'))
	.pipe(gulp.dest('public/css/'))
	.pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
	root: './public',
	livereload: true,
	port: 8080
  });
});

gulp.task('pug', function() {
	return gulp.src('app/views/*.pug')
		.pipe(pug({
			pretty:true
		}))
		.pipe(gulp.dest('./public'))
		.pipe(connect.reload());
});


gulp.task('watch', function(){
	gulp.watch('app/styles/**/*.sass', ['sass']);
	gulp.watch('app/styles/**/*.scss', ['sass']);
	gulp.watch('app/views/**/*.*', ['pug']);
	gulp.watch('app/js/*.js', ['js']);
});

gulp.task('default', ['connect', 'pug', 'js', 'sass', 'watch']);

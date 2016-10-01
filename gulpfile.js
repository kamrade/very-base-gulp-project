'use strict'

var gulp         = require('gulp');
var rename       = require('gulp-rename');
var sass         = require('gulp-sass');
var cleanCSS     = require('gulp-clean-css');
var autoPrefixer = require('gulp-autoprefixer');
var jade		 = require('gulp-jade');
var livereload   = require('gulp-livereload');
var connect      = require('gulp-connect');

gulp.task('js', function(){
	gulp.src('src/js/*.js')
		.pipe(connect.reload())
		.pipe(gulp.dest('dist/js/'));
});

gulp.task('sass', function() {
	gulp.src('src/sass/main.sass')
    .pipe(sass())
	.pipe(autoPrefixer({
			browsers: ['last 2 versions', '> 1%', 'IE 8'],
			cascade: false
		}))
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(rename('bundle.min.css'))
    .pipe(gulp.dest('dist/css/'))
	.pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true,
	port: 8080
  });
});

gulp.task('jade', function(){
	gulp.src('src/jade/**/*.jade')
		.pipe(jade({ pretty:true }))
		.pipe(gulp.dest('./'))
		.pipe(connect.reload());
});

// gulp.task('html', function(){
// 	gulp.src('index.html')
// 		.pipe(connect.reload());
// });

gulp.task('watch', function(){
	gulp.watch('src/sass/**/*.sass', ['sass']);
	gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch('src/jade/**/*.jade', ['jade']);
	gulp.watch('src/jade/**/*.html', ['jade']);
	gulp.watch('src/js/*.js', ['js']);
});

gulp.task('default', ['connect', 'jade', 'js', 'sass', 'watch']);

var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var cheerio = require('gulp-cheerio'); // https://www.npmjs.com/package/gulp-cheerio
var connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server();
});

gulp.task('clean', function () {  
  return gulp.src('./build', {read: false})
    .pipe(clean());
});

gulp.task('concat-app-js', function() {  
  return gulp.src('./app/js/*.js')
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'))
    .on('error', gutil.log);
});

gulp.task('copy-bower-js', function() {  
  return gulp.src('./bower_components/**/*.min.js')
    .pipe(gulp.dest('./build/js/'))
    .on('error', gutil.log);
});

gulp.task('copy-css', function(){
    return gulp.src('./app/css/**/*')
        .pipe(gulp.dest('./build/css'))
        .on('error', gutil.log);
});

gulp.task('copy-images', function(){
    return gulp.src('./app/images/*')
        .pipe(gulp.dest('./build/images'))
        .on('error', gutil.log);
});

gulp.task('copy-templates', function(){
    return gulp.src('./app/templates/*')
        .pipe(gulp.dest('./build/templates'))
        .on('error', gutil.log);
});

gulp.task('indexHtml', function() {
    return gulp.src('./app/index.html')
        .pipe(cheerio(function ($) {
            $('script').remove();
            //$('link').remove();
            $('head').append('<script type="text/javascript" src="js/angular/angular.min.js"></script>\n');    
            $('head').append('<script type="text/javascript" src="js/angular-animate/angular-animate.min.js"></script>\n');    
            $('head').append('<script type="text/javascript" src="js/angular-messages/angular-messages.min.js"></script>\n'); 
            $('head').append('<script type="text/javascript" src="js/angular-route/angular-route.min.js"></script>\n');
            $('head').append('<script type="text/javascript" src="js/angular-touch/angular-touch.min.js"></script>\n');    
            $('head').append('<script type="text/javascript" src="js/app.min.js"></script>\n');
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task('build', ['clean','concat-app-js','copy-bower-js','indexHtml','copy-css','copy-images','copy-templates']);
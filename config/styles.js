/**
 * Created by sophia.wang on 17/8/25.
 */
'use strict';

var path = require('path'),
    gulp = require('gulp'),
    conf = require('./conf');

var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();

//styles
gulp.task('less', function() {
    return gulp.src(path.join(conf.paths.src, 'styles/**.less'))
        .pipe($.less())
        .pipe($.concat('app.css'))
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.rev())
        .pipe(gulp.dest(path.join(conf.paths.tmp, 'app/css')))
        .pipe($.notify({ message: 'Less task compvare' }));
});

gulp.task('styles', ['less']);

gulp.task('styles-reload', ['styles'], function () {
    return gulp.src(path.join(conf.paths.tmp, 'app/css'))
        .pipe(browserSync.stream());
});
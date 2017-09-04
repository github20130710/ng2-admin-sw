/**
 * Created by sophia.wang on 17/8/25.
 */
'use strict';

var path = require('path'),
    gulp = require('gulp'),
    conf = require('./conf');

//加载package.json中的依赖包
var $ = require('gulp-load-plugins')();

gulp.task('directives', function() {
    return gulp.src(path.join(conf.paths.src, '/scripts/directives/**.js'))
        .pipe($.concat('directives.js'))
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.uglify())
        .pipe($.rev())
        .pipe(gulp.dest(path.join(conf.paths.tmp, 'app/js')));
});

gulp.task('services', function() {
    return gulp.src(path.join(conf.paths.src, '/scripts/services/**.js'))
        .pipe($.concat('services.js'))
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.uglify())
        .pipe($.rev())
        .pipe(gulp.dest(path.join(conf.paths.tmp, 'app/js')));
});

gulp.task('filters', function() {
    return gulp.src(path.join(conf.paths.src, '/scripts/filters/**.js'))
        .pipe($.concat('filters.js'))
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.uglify())
        .pipe($.rev())
        .pipe(gulp.dest(path.join(conf.paths.tmp, 'app/js')));
});

gulp.task('utils', function() {
    return gulp.src(path.join(conf.paths.src, '/scripts/utils/**.js'))
        //.pipe($.concat('utils.js'))
        //.pipe($.rename({ suffix: '.min' }))
        //.pipe($.uglify())
        .pipe($.rev())
        .pipe(gulp.dest(path.join(conf.paths.tmp, 'app/js')));
});

gulp.task('copy-js', function () {
    return gulp.src(path.join(conf.paths.src, '/scripts/*.js'))
        .pipe(gulp.dest(path.join(conf.paths.tmp, 'app/js')));
});

gulp.task('scripts', ['directives','services','filters','utils', 'copy-js']);

gulp.task('scripts-reload', function() {
    return gulp.src(path.join(conf.paths.tmp, 'app/js'))
        .pipe(browserSync.stream())
        .pipe($.notify({ message: 'scripts-reload task compvare' }));
});


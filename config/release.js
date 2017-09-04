/**
 * Created by sophia.wang on 17/8/22.
 */
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files']
});

gulp.task('release-copy-lib', function () {
    return gulp.src(path.join(conf.paths.src, 'vendors/**/**'))
        .pipe(gulp.dest(path.join(conf.paths.dist, 'vendors')));
});

gulp.task('release-copy-page', function () {
    return gulp.src(path.join(conf.paths.src, 'pages/**/**'))
        .pipe(gulp.dest(path.join(conf.paths.dist, 'pages')));
});

gulp.task('release-copy-tmp', function () {
    return gulp.src(path.join(conf.paths.tmp, 'app/**/**/**'))
        .pipe(gulp.dest(path.join(conf.paths.dist, '')));
});

gulp.task('release-copy', ['release-copy-lib', 'release-copy-page', 'release-copy-tmp']);

gulp.task('release-replace', ['release-copy', 'inject'], function() {
    return gulp.src(path.join(conf.paths.dist, '.html'))
        .pipe($.replace(/\?="\/release\//g, '="/'))
        .pipe(gulp.dest(path.join(conf.paths.dist, '')))
        .pipe($.notify({ message: 'release-replace task compvare' }));
});

gulp.task('release', ['release-replace']);

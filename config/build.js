/**
 * Created by sophia.wang on 17/8/22.
 */
'use strict';

var path = require('path'),
    gulp = require('gulp'),
    conf = require('./conf');

//加载package.json中的依赖包
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

var browserSync = require('browser-sync');

gulp.task('clean', function () {
    return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
});

gulp.task('other', function () {
    return gulp.src(path.join(conf.paths.src, '/assets/**/**'))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/app/assets')));
});

gulp.task('inject-reload', ['inject'], function () {
    browserSync.reload();
});

gulp.task('inject', ['release-copy'], function () {
    var injectStyles = gulp.src(path.join(conf.paths.dist, 'css/*.css'), {read: false});

    var injectScripts = gulp.src(path.join(conf.paths.dist, 'js/*.js'), {read: false});

    return gulp.src(path.join(conf.paths.src, '/index.html'))
        .pipe($.inject(injectStyles, {starttag: '<!-- inject:css -->'}), {relative: true})
        .pipe($.inject(injectScripts, {starttag: '<!-- inject:js -->'}), {relative: true})
        .pipe(gulp.dest(path.join(conf.paths.dist, '')))
        .pipe($.notify({ message: 'inject task compvare' }));
});

gulp.task('build', ['scripts', 'styles', 'other'], function(){
    gulp.start('release');
});
/**
 * Created by sophia.wang on 17/8/24.
 */
var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');   //单页面刷新,参见https://github.com/shakyShane/browser-sync-spa

var util = require('util');

function browserSyncInit(baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;

    var server = {
        baseDir: baseDir
    };

    browserSync.instance = browserSync.init({
        startPath: '/',
        server: server,
        browser: browser,
        ghostMode: false
    });
}

browserSync.use(browserSyncSpa({
    selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve', ['watch'], function () {
    browserSyncInit([path.join(conf.paths.tmp, '/app'), conf.paths.src]);
});

gulp.task('serve:dist', ['build'], function () {
    browserSyncInit(conf.paths.dist);
});

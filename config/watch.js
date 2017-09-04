/**
 * Created by sophia.wang on 17/8/25.
 */
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
    return event.type === 'changed';
}

gulp.task('watch', ['inject'], function () {

    gulp.watch([path.join(conf.paths.src, '/*.html'), 'package.json'], ['inject-reload']);

    gulp.watch(path.join(conf.paths.src, '/styles/*.less'),
        function(event) {
            if(isOnlyChange(event)) {
                gulp.start('styles-reload');
            } else {
                gulp.start('inject-reload');
            }
        }
    );

    gulp.watch([
        path.join(conf.paths.src, '/pages/**/*.js'),
        path.join(conf.paths.src, '/scripts/**/*.js')
    ], function(event) {

    });

    gulp.watch(path.join(conf.paths.src, 'pages/**/*.html'), function(event) {

    });
});

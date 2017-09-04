/**
 * Created by sophia.wang on 17/8/22.
 */
var gulp = require('gulp');
var wrench = require('wrench');

wrench.readdirSyncRecursive('./config').filter(function(file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
    require('./config/' + file);
});

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});
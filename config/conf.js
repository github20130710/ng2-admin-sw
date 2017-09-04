/**
 * Created by sophia.wang on 17/8/22.
 */

/**
 * 文件包含了gulp所需的配置,包括路径等
 *
 * @type {*|exports|module.exports}
 */
var gutil = require('gulp-util');
exports.paths = {
    src: 'src',
    dist: 'release',
    tmp: '.tmp'
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
    'use strict';

    return function(err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};
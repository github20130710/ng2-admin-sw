/**
 * Created by sophia.wang on 17/3/6.
 */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var openURL = require('open');

//styles
gulp.task('less', function() {
    return gulp.src('src/theme/styles/**.less')
        .pipe($.less())
        .pipe($.concat('app.css'))
        .pipe($.rename({ suffix: '.min' }))
        //.pipe($.rev())
        .pipe($.cleanCss())
        //.pipe(gulp.dest('src/main/webapp/dist/css'))
        .pipe(gulp.dest('src/css'));
});

//生成文档任务，根据源文件生成
gulp.task('doc:generate', function (cb) {
    //生成章节
    return $.ngdocs.sections({
            api: {
                glob: ['src/**/**/*.js'], //源码目录
                api: true,
                title: 'API文档' //章节标题
            },
            guide: {
                glob: ['src/guide/*.ngdoc'],
                title: '开发指南'
            }
        })
        .pipe($.ngdocs.process({
            image: '',
            title: '前端框架' //标题
        }))
        .pipe(gulp.dest('./docs'))
        .pipe($.connect.reload());
});

//服务器任务，提供在线查看功能
gulp.task('doc:serve', function(cb) {
    $.connect.server({
        root: ['docs'],
        livereload: true,
        port: 666,
        fallback: 'docs/index.html'
    });
    openURL(`http://localhost:666`);
});

gulp.task('default', ['less']);

//watch all files change
gulp.task('watch', function() {

    gulp.watch('src/theme/styles/**.less', ['less']);
    gulp.watch('src/**/**/*.js', ['doc:generate']);

    //$.livereload.listen();

});

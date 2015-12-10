var gulp = require('gulp'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'), //js压缩
minifycss = require("gulp-minify-css"), //css压缩
rename = require('gulp-rename'),
del = require('del'),
watch = require('gulp-watch'),
connect = require('gulp-connect'),
processhtml = require('gulp-processhtml');


gulp.task('style-dev', function (){
    return gulp.src('src/css/*.css')
        .pipe(concat('nbmui.css'))
        .pipe(gulp.dest('dev/css/'))
});

gulp.task('style-build', function (){
    return gulp.src('src/css/*.css')
        .pipe(concat('nbmui.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('nbmui/css/'))
});

var copyArray = [
    'src/fonts/*',
    'src/test/*.html'
];

gulp.task('copyfile-dev', function (){
    return gulp.src(copyArray)
        .pipe(gulp.dest(function (fp){
            var toPath = 'dev/';

            if(fp.base.indexOf('src/fonts') > -1){
                toPath += 'fonts/'
            }
            if(fp.base.indexOf('src/test') > -1){
                toPath += 'test/'
            }

            return toPath;
        }))
});

gulp.task('copyfile-build', function (){
    return gulp.src(copyArray)
        .pipe(gulp.dest(function (fp){
            var toPath = 'nbmui/';

            if(fp.base.indexOf('src/fonts') > -1){
                toPath += 'fonts/'
            }

            return toPath;
        }))
});

//监测本地文件修改
gulp.task('watch', function (){
    gulp.watch('src/css/*.css', ['style-dev']);
    gulp.watch(['src/fonts/*.*','src/test/*.html'], ['copyfile-dev']);
});

//清除之前生成的文件
gulp.task('clean-dev', function (cb){
    del(['dev'], cb);
});
gulp.task('clean-build', function (cb){
    del(['nbmui'], cb);
});

//本地调试服务命令
gulp.task('host-server', function (){
    connect.server({
        root: 'dev',
        port: 8888,
        livereload: false
    })
});


//打包生成
gulp.task('dev', ['clean-dev'], function (){
    gulp.start('style-dev','copyfile-dev','host-server','watch');
});

gulp.task('build', ['clean-build'], function (){
    gulp.start('style-build','copyfile-build');
});









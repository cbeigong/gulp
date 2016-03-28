// 组件安装 : npm install browser-sync gulp-sass gulp-minify-css gulp-concat gulp-uglify gulp-rename del --save-dev
var gulp        = require('gulp');
var sass        = require('gulp-sass');
var minifycss = require('gulp-minify-css');  //CSS压缩
var concat = require('gulp-concat');         // 文件合并
var uglify = require('gulp-uglify');         //js压缩插件
var rename = require('gulp-rename');         // 重命名
var del = require('del'); 
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;


// 静态服务器
gulp.task('browser-sync', ['sass'],function() {
    browserSync.init({
        // server: {
        //     baseDir: "./"
        // }
        server: "./"
        // proxy: "http://localhost:3000",
        // files: ['public/**/*.*'],
        // browser: "google chrome",
        // port: 4000
        // proxy: "你的域名或IP"

    });
    gulp.watch("./sass/*.scss", ['sass']);
    // gulp.watch("js/*.js", ['js-watch']);
    gulp.watch("*.html").on('change', reload);


});
// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function() {
    return gulp.src("./sass/*.scss")
        .pipe(sass())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./css"))
        .pipe(reload({stream: true}));
});

// 代理
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         proxy: "你的域名或IP"
//     });
// });

// 默认执行的任务
gulp.task('default',  function() {
    gulp.start('clean','minifycss', 'minifyjs');  // 要执行的任务
});

// CSS压缩
gulp.task('minifycss', function() {
    return gulp.src('src/*.css')                  //压缩的文件
         .pipe(minifycss())                       //执行压缩
         .pipe(gulp.dest('minified/css'));        //输出文件夹
});

// js合并压缩
gulp.task('minifyjs', function() {
    return gulp.src('src/*.js')
        .pipe(concat('main.js'))                  //合并所有js到main.js
        .pipe(gulp.dest('minified/js'))           //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))           //rename压缩后的文件名
        .pipe(uglify())                           //压缩
        .pipe(gulp.dest('minified/js'));          //输出
});

// 执行压缩前先删除目录里面的内容
gulp.task('clean', function(cb) {
    del(['minified/css', 'minified/js'], cb)
});

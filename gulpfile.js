const gulp = require("gulp");
//html
gulp.task("copy",function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
})
//images
gulp.task("img",function(){
    return gulp.src("img/*.{jpg,png}")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})

//js
gulp.task("script",function(){
    return gulp.src(["js/*.js","!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})

//json
gulp.task("data",function(){
    return gulp.src(["data/*.json","!package.json"])
    .pipe(gulp.dest("dist/json"))
    .pipe(connect.reload());
})

const sass = require("gulp-sass");
const minifyCss = require("gulp-minify-css");
const rename = require("gulp-rename")
//scss1
gulp.task("sass1",function(){
    return gulp.src("sass/index.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCss())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("sass2",function(){
    return gulp.src("sass/reset.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCss())
    .pipe(rename("reset.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("sass3",function(){
    return gulp.src("sass/iconfont.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCss())
    .pipe(rename("iconfont.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("sass4",function(){
    return gulp.src("sass/buttons.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCss())
    .pipe(rename("buttons.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("sass5",function(){
    return gulp.src("sass/bootstrap.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCss())
    .pipe(rename("bootstrap.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("sass6",function(){
    return gulp.src("sass/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("build",["copy","img","script","sass1","sass2","sass3","sass4","sass5","sass6","data"],function(){
    console.log("项目建立成功");
})

gulp.task("watch",function(){
    gulp.watch("*.html",["copy"]);
    gulp.watch("img/*.{jpg,png}",["img"]);
    gulp.watch(["js/*.js","!gulpfile.js"],["script"]);
    gulp.watch(["data/*.json","!package.json"],["data"]);
    gulp.watch("sass/index.scss",["sass1"]);
    gulp.watch("sass/reset.scss",["sass2"]);
    gulp.watch("sass/iconfont.scss",["sass3"]);
    gulp.watch("sass/buttons.scss",["sass4"]);
    gulp.watch("sass/bootstrap.scss",["sass5"]);
    gulp.watch("sass/*.scss",["sass6"]);
})

const connect = require("gulp-connect");
gulp.task("server",function(){
    connect.server({
        root:"dist",
        port:8888,
        livereload:true
    })
})

gulp.task("default",["watch","server"]);
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var prettyError = require('gulp-prettyerror');
var sourcemaps = require('gulp-sourcemaps');


// ------------------------------------------------------

var src_sass = "./sass/**/*.sass";
var src_scss = "./sass/**/*.scss"; // dit voor scss

var dest_css = "./css";

// Sass to css
gulp.task('scss', function () {
    return gulp.src(src_scss)
        .pipe(plumber())
        .pipe(prettyError())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest_css));
});

// Zit een fout op gulp blijft lopen
// onderstaande regel verwijdert uit de gulp.task
// gulp.watch('css/*.css', ['minify-css']);
gulp.task('minify-css', function() {
    return gulp.src(['css/*.css', '!css/*.min.css'])
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('css'));
});

// //////////////////////////////////////////////////////////
// Task Image minify
// //////////////////////////////////////////////////////////

gulp.task('compress-images', function(){
   return gulp.src('images/**/*')
        .pipe(imagemin({ progressive: true}))
        .pipe(gulp.dest('images-min'));
});

// ///////////////////////////////////////////////////
// Watch Task
// ///////////////////////////////////////////////////
gulp.task('watch', function(){
    gulp.watch('sass/**/*.scss', ['scss']);
    gulp.watch()
});

// ///////////////////////////////////////////////////
// Default Task
// ///////////////////////////////////////////////////

gulp.task('default' , ['watch', 'scss', 'minify-css']);

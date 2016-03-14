'use strict';

// Requires
var gulp       = require('gulp');

// Include plugins
var gulpsync   = require('gulp-sync')(gulp); // To do all these tasks in bulk
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var minify     = require('gulp-minify-css');
// var sourcemaps = require('gulp-sourcemaps');
// var clean      = require('gulp-clean'); // Clean

// Paths
var vendordir  = 'vendor/';
var source     = 'src/';
var build      = 'dist/';
var dist       = '**/dist/';
var jsdir      = 'js/';
var cssdir     = 'css/';

var project    = 'YasBstrap';

// "_vendor_js" = Concatenate JS vendor files to dist
gulp.task('_vendor_js', function() {
    return gulp.src(vendordir + dist + jsdir + '*.js')
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(build + jsdir));
});

// "_vendor_js_preserve" = Copy JS vendor files *directly* to dist
gulp.task('_vendor_js_preserve', function() {
    return gulp.src(vendordir + '*.js')
        .pipe(gulp.dest(build + jsdir));
});

// "_vendor_css" = Copy CSS vendor files to dist
gulp.task('_vendor_css', function() {
    return gulp.src(vendordir + dist + cssdir + '*.css')
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(build + cssdir));
});

// "_vendor_css_preserve" = Copy CSS vendor files *directly* to dist
gulp.task('_vendor_css_preserve', function() {
    return gulp.src(vendordir + '*.css')
        .pipe(gulp.dest(build + cssdir));
});

// "_js" = concat
gulp.task('_js', function() {
    return gulp.src(source + jsdir + '*.js')
        .pipe(concat(project.toLocaleLowerCase() + '.js'))
        .pipe(gulp.dest(build + jsdir));
});

// "_css" = Copy CSS files to dist
gulp.task('_css', function() {
    return gulp.src([source + cssdir + 'style.css',
                     source + cssdir + 'main.css'])
        .pipe(concat(project.toLocaleLowerCase() + '.css'))
        .pipe(gulp.dest(build + cssdir));
});

// "js" = uglify + concat
gulp.task('js', function() {
    return gulp.src(source + jsdir + '*.js')
        .pipe(uglify())
        .pipe(concat(project.toLocaleLowerCase() + '.js'))
        .pipe(gulp.dest(build + jsdir));
});

// "_css" = Copy CSS files to dist
gulp.task('css', function() {
    return gulp.src(source + cssdir + '*.css')
        .pipe(minify())
        .pipe(concat(project.toLocaleLowerCase() + '.css'))
        .pipe(gulp.dest(build + cssdir));
});

gulp.task('test', function() {
    // Do not include Jasmine if not needed
    var jasmine = require('gulp-jasmine');
});

// ========================================
// Main tasks

// "watch" = Automatically build on file change
gulp.task('watch', function () {
    gulp.watch(source + '*.html', ['_html']);
    gulp.watch(source + jsdir + '*.js', ['_js']);
    gulp.watch(source + cssdir + '*.css', ['_css']);

    // Vendors
    gulp.watch(vendordir + '**/' + build + jsdir + '*.js', ['_vendor_js']);
    gulp.watch(vendordir + '**/' + build + cssdir + '*.css', ['_vendor_css']);
    // Shouldn’t need to track "preserve" ones
});

// "dist" = Make a distribution (build)
// gulp.task('dist', gulpsync.sync(['clean-dist', 'js', 'css', 'vendor']));

// "build" = Make a simple build without optimizations
gulp.task('build', gulpsync.async(['_html', ['_vendor_js', '_js'], ['_vendor_css', '_css']]));
// Default task
gulp.task('default', ['build']);

const gulp = require('gulp');
const njk = require('gulp-nunjucks-render');
const beautify = require('gulp-beautify')

function html() {
    return gulp.src('src/html/pages/**/*.+(html|njk)')
        .pipe(njk({
            path: ['src/html/'],
        }))
        .pipe(beautify.html({ indent_size: 2, preserve_newlines: false }))
        .pipe(gulp.dest('public'))
}

function watch() {
    gulp.watch('src/html/**/*', html)
}

function fonts() {
    return gulp.src('node_modules/bootstrap-icons/font/fonts/*')
        .pipe(gulp.dest('public/resources/fonts'))
}

function assets() {
    return gulp.src('src/assets/**')
        .pipe(gulp.dest('public/resources/assets'))
}

exports.build = gulp.series(html)
exports.watch = gulp.series(watch)
exports.fonts = gulp.series(fonts)
exports.assets = gulp.series(assets)
exports.default = gulp.series(html, watch)

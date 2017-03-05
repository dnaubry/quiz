var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

gulp.task('watch', function () {
    
    browserSync.init({
        notify: false,
        server: {
            baseDir: "app"
        }    
    });
    
    watch('./index.html', function () {
        browserSync.reload();
    });

    watch('./app/css/**/*.css', function () {
        gulp.start('cssInject');
    });
    
    watch('./js/*.js', function() {
        gulp.start('scriptsRefresh');
    });
});

gulp.task('cssInject', ['styles'], function () {
    return gulp.src('./temp/css/styles.css')
    .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', function() {
    browserSync.reload();
})
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('gulp-buffer');
var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');

var ROOT_PATH = "."
var PHASER_PATH = ROOT_PATH + '/node_modules/phaser/build/';
var SOURCE_PATH = ROOT_PATH + '/src';
var ENTRY_FILE = SOURCE_PATH + '/Main.js';
var OUTPUT_FILE = 'game.js';

var PORT = 25565;

function build() {

    var sourcemapPath = ROOT_PATH + '/' + OUTPUT_FILE + '.map';

    return browserify({
        entries: ENTRY_FILE,
        debug: true
    })
    .transform(babelify.configure({
        presets: ["babel-preset-es2015"]
    }))
    .bundle().on('error', function(error){
          gutil.log(gutil.colors.red('[Build Error]'), error.message);
          this.emit('end');
    })
    .pipe(source(OUTPUT_FILE))
    // .pipe(buffer())
    .pipe(gulp.dest(ROOT_PATH));

}

function serve() {

    var options = {
        server: {
            baseDir: ROOT_PATH
        },
        port: PORT,
        open: true
    };

    browserSync(options);

    gulp.watch(SOURCE_PATH + '/**/*.js', ['watch-js']);
}


gulp.task('build', build);
gulp.task('serve', ['build'], serve);
gulp.task('watch-js', ['build'], browserSync.reload); // Rebuilds and reloads the project when executed.

gulp.task('default', ['serve']);

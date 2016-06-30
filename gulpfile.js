var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var replace = require('gulp-replace');
var insert = require('gulp-insert');
var streamify = require('gulp-streamify');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var merge = require('merge-stream');
var collapse = require('bundle-collapser/plugin');
var Server = require('karma').Server;

var package = require('./package.json');
var header = "/*!\n" +
    " * Chart.Funnel.js\n" +
    " * A funnel plugin for Chart.js(http://chartjs.org/)\n" +
    " * Version: {{ version }}\n" +
    " *\n" +
    " * Copyright 2016 Jone Casaper\n" +
    " * Released under the MIT license\n" +
    " * https://github.com/xch89820/Chart.Funnel.js/blob/master/LICENSE.md\n" +
    " */\n";

gulp.task('js',function(){
    // Bundled library
    var bundled = browserify('./src/chart.funnel.js', { standalone: 'Chart.Funnel' })
        .plugin(collapse)
        .bundle()
        .pipe(source('chart.funnel.bundled.js'))
        .pipe(insert.prepend(header))
        .pipe(streamify(replace('{{ version }}', package.version)))
        .pipe(streamify(jshint()))
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('dist'))
        .pipe(streamify(uglify()))
        .pipe(insert.prepend(header))
        .pipe(streamify(replace('{{ version }}', package.version)))
        .pipe(streamify(concat('chart.funnel.bundled.min.js')))
        .pipe(gulp.dest('dist'))

    var nonBundled = browserify('./src/chart.funnel.js', { standalone: 'Chart.Funnel' })
        .ignore('chart.js')
        .plugin(collapse)
        .bundle()
        .pipe(source('chart.funnel.js'))
        .pipe(insert.prepend(header))
        .pipe(streamify(replace('{{ version }}', package.version)))
        .pipe(streamify(jshint()))
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('dist'))
        .pipe(streamify(uglify()))
        .pipe(insert.prepend(header))
        .pipe(streamify(replace('{{ version }}', package.version)))
        .pipe(streamify(concat('chart.funnel.min.js')))
        .pipe(gulp.dest('dist'))

    return merge(bundled, nonBundled);
});

gulp.task('jshint',function(){
    return gulp.src('src/**/*.js')
        .pipe(jshint('config.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

// For CI
gulp.task('unittest.ci',function(done){
    new Server({
        configFile: __dirname + '/karma.conf.ci.js',
        singleRun: true
    }, done).start();
});

gulp.task('test.ci', ['jshint', 'unittest.ci']);

gulp.task('default',function(){
    gulp.watch('src/**/*.js',['js']);
});

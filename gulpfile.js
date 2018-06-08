/* global require, process */
'use strict';

var path = require('path');
var fs = require('fs');

var gulp = require('gulp');
var gulpPlugins = require('gulp-load-plugins')();
var utils = require('./gulp/utils');
var config = require('./gulp/config');

fs.readdirSync(path.join(__dirname, 'gulp', 'tasks'))
    .forEach(function(file) {
        require(path.join(__dirname, 'gulp', 'tasks', file))(gulp, gulpPlugins, utils, config);
    });

    gulp.task('manualBuild', [], function() {
        return gulp.src(config.paths.src)
        .pipe(gulpPlugins.plumber())
        .pipe(gulpPlugins.concat(config.paths.outputFilename))
        .pipe(gulpPlugins.header(utils.getBanner()))
        .pipe(gulpPlugins.ngAnnotate())
        .pipe(gulp.dest(config.paths.outputFolder))
        .pipe(gulpPlugins.concat(config.paths.outputFilename))
        .pipe(gulpPlugins.rename({ suffix: '.min' }))
        .pipe(gulpPlugins.uglify())
        .pipe(gulpPlugins.header(utils.getBanner()))
        .pipe(gulp.dest(config.paths.outputFolder));
    });

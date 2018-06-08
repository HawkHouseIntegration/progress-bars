var path = require('path');

module.exports = function (gulp, $, utils, config) {
    gulp.task('test', function() {
        return gulp.src(
                [
                    path.join(config.paths.root, 'node_modules/angular/angular.js'),
                    path.join(config.paths.root, 'node_modules/angular-mocks/angular-mocks.js'),
                    path.join(config.paths.root, 'src/pg.progress-bars.module.js'),
                    path.join(config.paths.root, 'src/services/*'),
                    path.join(config.paths.root, 'src/directives/*')
                ].concat(config.paths.test)
            )
            .pipe($.plumber())
            .pipe($.karma({
                configFile: path.join(config.paths.root, 'test/karma.conf.js'),
                action: process.argv[3] === 'watch' ? 'watch' : 'run'
            }))
            .on('error', function(err) {
                throw err;
            });
    });
};
(function () {
    'use strict';

    angular
        .module('pg.progress-bars')
        .service('ProgressBarsStorage', ProgressBarsStorageService);

    function ProgressBarsStorageService() {
        var progressBars = {};

        this._register = function (progressBar) {
            if (progressBars[progressBar.name] && progressBars[progressBar.name].dummy) {
                progressBars[progressBar.name].apply(progressBar);
            }

            progressBars[progressBar.name] = progressBar;
        };

        this._unregister = function (progressBar) {
            if (progressBars[progressBar.name]) {
                delete progressBars[progressBar.name];
            }
        };

        this.get = function(name) {
            if (!progressBars[name]) {
                progressBars[name] = new ProgressBarDummy();
            }

            return progressBars[name];
        };
    }

    function ProgressBarDummy() {
        var started = false;
        var _progressBar = undefined;

        this.dummy = true;

        this.start = function () {
            started = true;
            if (_progressBar) {
                _progressBar.start();
            }
        }

        this.done = function () {
            started = false;
            if (_progressBar) {
                _progressBar.done();
            }
        }

        this.apply = function (progressBar) {
            if (started) {
                progressBar.start();
            }

            _progressBar = progressBar;
        }
    }
})();

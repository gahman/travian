// Karma configuration
// Generated on Thu Oct 08 2015 15:58:38 GMT+0200 (W. Europe Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      "Travian.Web.UI/Scripts/jquery-1.9.1.min.js",
      "Travian.Web.UI/Scripts/angular.min.js",
      "Travian.Web.UI/Scripts/angular-resource.min.js",
      "Travian.Web.UI/Scripts/angular-route.min.js",
      "Travian.Web.UI/Scripts/bootstrap.min.js",
      "Travian.Web.UI/Scripts/angular-strap.min.js",
      "Travian.Web.UI/Scripts/angular-strap.tpl.min.js",
      "Travian.Web.UI/Scripts/angular-local-storage.min.js",
      "Travian.Web.UI/Scripts/angular-mocks.js",
      "Travian.Web.UI/app/shared/model.js",
      "Travian.Web.UI/assets/js/bootstrap-datetimepicker.min.js",
      "Travian.Web.UI/app/app.module.js",
      "Travian.Web.UI/assets/js/utilities.js",
      "Travian.Web.UI/app/shared/stateService.js",
      // 'Travian.Web.UI.Tests/lib/jasmine-2.3.4/jasmine.js',
      // 'Travian.Web.UI.Tests/lib/jasmine-2.3.4/jasmine-html.js',
      // 'Travian.Web.UI.Tests/lib/jasmine-2.3.4/boot.js',
      "Travian.Web.UI/app/components/player/playerController.js",
      "Travian.Web.UI/app/components/village/villageController.js",
      "Travian.Web.UI/app/components/alliance/allianceController.js",
      
      'Travian.Web.UI.Tests/spec/PlayerControllerSpec.js',
      'Travian.Web.UI.Tests/spec/StateServiceSpec.js'      
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['verbose', 'progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],
    plugins : ['karma-jasmine', 'karma-phantomjs-launcher', 'karma-verbose-reporter'],
    // browsers: ['IE'],
    // plugins : ['karma-jasmine', 'karma-ie-launcher'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}

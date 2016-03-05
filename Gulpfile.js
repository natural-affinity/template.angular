'use strict';

var del = require('del');
var gulp = require('gulp');
var stylish = require('jshint-stylish');
var plugins = require('gulp-load-plugins')();
var tasklist = require('gulp-task-listing');

// read package.json
var pkg = require('./package.json');

var gconf = {
  app: 'myApp',
  src: {
    root: 'src/',
    index: 'src/index.jade',
    scripts: 'src/**/*.js',
    templates: 'src/**/*.html'
  },
  dist: {
    root: 'dist/',
    index: 'index.html',
    styles: {
      root: 'dist/styles',
      app: 'app.min.css',
      lib: 'lib.min.css'
    },
    scripts: {
      root: 'dist/scripts/',
      app: 'app.min.js',
      lib: 'lib.min.js'
    }
  }
};

gulp.task('clean', function () {
  return del([
    'dist/**/*'
  ]);
});

gulp.task('copy:html', function () {
  gulp.src(gconf.src.templates)
      .pipe(gulp.dest(gconf.dist.root));
});

gulp.task('jshint', function () {
  return gulp.src(['Gulpfile.js', gconf.src.scripts])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(stylish));
});

gulp.task('js:libs', function () {
  return gulp.src(['bower_components/angular/angular.min.js',
                   'bower_components/angular-loader/angular-loader.min.js',
                   'bower_components/angular-route/angular-route.min.js'])
                   .pipe(plugins.concat(gconf.dist.scripts.lib))
                   .pipe(gulp.dest(gconf.dist.scripts.root));
});

gulp.task('js:dist', function () {
  return gulp.src(['src/**/*.js'])
    .pipe(plugins.concat(gconf.dist.scripts.app))
    .pipe(gulp.dest(gconf.dist.scripts.root));
});

gulp.task('jade', function () {
  gulp.src(gconf.src.index)
      .pipe(plugins.jade({
        locals: {
          app: gconf.app,
          name: pkg.name,
          version: pkg.version
        },
        pretty: true
      }))
      .pipe(gulp.dest(gconf.dist.root));
});

gulp.task('webserver', function () {
  gulp.src(gconf.dist.root)
      .pipe(plugins.webserver({
        port: 9000,
        livereload: true
      }));
});

gulp.task('watch', function () {
  gulp.watch([gconf.src.index], ['jade']);
  gulp.watch([gconf.src.templates], ['copy:html', 'jade']);
  gulp.watch([gconf.src.scripts], ['jshint', 'js:dist']);
  gulp.watch(['Gulpfile.js'], ['build']);
});

gulp.task('js', ['jshint', 'js:libs', 'js:dist']);
gulp.task('html', ['copy:html', 'jade']);
gulp.task('build', ['js', 'html']);
gulp.task('server', ['build', 'webserver', 'watch']);
gulp.task('default', ['clean', 'build']);
gulp.task('help', tasklist);

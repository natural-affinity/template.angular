'use strict';

var del = require('del');
var gulp = require('gulp');
var yargs = require('yargs');
var stylish = require('jshint-stylish');
var plugins = require('gulp-load-plugins')();
var tasklist = require('gulp-task-listing');
var autoprefixer = require('autoprefixer');

// read package.json
var pkg = require('./package.json');
var pretty = yargs.argv.pretty || true;
var cfg = yargs.argv.env || './conf/local.json';
var app = require(cfg);

var gconf = {
  src: {
    root: 'src/',
    index: 'src/index.jade',
    styles: 'src/sass/**/*.scss',
    scripts: {
      all: 'src/**/*.js',
      main: 'src/app.js',
      router: 'src/*.router.js',
      modules: 'src/**/*.module.js',
      filters: 'src/**/*.filter.js',
      services: 'src/**/*.service.js',
      controllers: 'src/**/*.controller.js',
      directives: 'src/**/*.directive.js'
    },
    templates: 'src/**/*.html'
  },
  dist: {
    all: 'dist/**/*',
    root: 'dist/',
    index: 'index.html',
    styles: {
      root: 'dist/styles/',
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
  return del([gconf.dist.all]);
});

gulp.task('copy:html', function () {
  gulp.src(gconf.src.templates).pipe(gulp.dest(gconf.dist.root));
});

gulp.task('css:libs', function () {
  gulp.src(['bower_components/angular-material/angular-material.min.css'])
      .pipe(plugins.concat(gconf.dist.styles.lib))
      .pipe(gulp.dest(gconf.dist.styles.root));
});

gulp.task('css:dist', function () {
 return gulp.src([gconf.src.styles])
            .pipe(plugins.sass({outputStyle: 'compressed'}))
            .pipe(plugins.postcss([
              autoprefixer({browsers: ['last 2 version']})]
            ))
            .pipe(plugins.concat(gconf.dist.styles.app))
            .pipe(gulp.dest(gconf.dist.styles.root));
});


gulp.task('jshint', function () {
  return gulp.src(['Gulpfile.js',
                   gconf.src.scripts.all])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(stylish));
});

gulp.task('js:libs', function () {
  return gulp.src(['angular/angular.min.js',
                   'angular-animate/angular-animate.min.js',
                   'angular-aria/angular-aria.min.js',
                   'angular-messages/angular-messages.min.js',
                   'angular-loader/angular-loader.min.js',
                   'angular-route/angular-route.min.js',
                   'angular-material/angular-material.min.js'],
                   {cwd: 'bower_components'})
    .pipe(plugins.concat(gconf.dist.scripts.lib))
    .pipe(gulp.dest(gconf.dist.scripts.root));
});

gulp.task('js:dist', function () {
  return gulp.src([gconf.src.scripts.main,
                   gconf.src.scripts.router,
                   gconf.src.scripts.modules,
                   gconf.src.scripts.filters,
                   gconf.src.scripts.services,
                   gconf.src.scripts.controllers,
                   gconf.src.scripts.directives])
    .pipe(plugins.concat(gconf.dist.scripts.app))
    .pipe(plugins.replace('replace.application.name', app.namespace))
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.uglify({compress: true, mangle: true}))
    .pipe(gulp.dest(gconf.dist.scripts.root));
});

gulp.task('jade', function () {
  gulp.src(gconf.src.index)
      .pipe(plugins.jade({
        locals: {
          app: app.namespace,
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
  gulp.watch([gconf.src.styles], ['css:dist']);
  gulp.watch([gconf.src.scripts.all], ['jshint', 'js:dist']);
  gulp.watch([gconf.src.templates], ['copy:html', 'jade']);
  gulp.watch(['Gulpfile.js'], ['build']);
});

gulp.task('js', ['jshint', 'js:libs', 'js:dist']);
gulp.task('css', ['css:libs', 'css:dist']);
gulp.task('html', ['copy:html', 'jade']);
gulp.task('build', ['js', 'css', 'html']);
gulp.task('server', ['build', 'webserver', 'watch']);
gulp.task('default', ['build']);
gulp.task('help', tasklist);

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var typographic = require('typographic');
var nib = require('nib');
var rupture = require('rupture');
var axis = require('axis');
var lost = require('lost');
var postcss = require('gulp-postcss');
var poststylus = require('poststylus');
var rucksack = require('rucksack-css');
var autoprefixer = require('autoprefixer');
var font = require('postcss-font-magician');
var uglify = require('gulp-uglify');
var plumber = require ('gulp-plumber');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var	reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var rename = require('gulp-rename');
var del = require('del');
var ngAnnotate = require('gulp-ng-annotate');
var jade = require('gulp-jade');
var imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
var minifyCSS= require("gulp-uglifycss");
var jshint = require('gulp-jshint');


gulp.task('jshint', function() {
  return gulp.src(['**/*.js','!node_modules/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
  })


/**
 * Compile jade files into HTML
 */
gulp.task('templates', function() {
    return gulp.src('views/**/*.jade')
        .pipe(plumber())
        .pipe(jade())
        // .pipe(gulp.dest('dist/views'))
        .pipe(reload({stream: true}));
});

/**
 * Important!!
 * Separate task for the reaction to `.jade` files
 */
gulp.task('jade-watch', ['templates'], reload);

var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({

    // nodemon our expressjs server
    script: './bin/www',

    // watch core server file(s) that require server restart on change
    watch: ['app.js']
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reLoad() {
        reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browser-sync', ['nodemon'], function () {

  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync({

    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:3000',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000,

    // open the proxied app in chrome
    browser: ['google chrome']
  });
});

gulp.task('scripts', function() {
  return gulp.src(['public/javascripts/app/app.module.js', 'public/javascripts/**/*.js'])
    .pipe(plumber())
    .pipe(ngAnnotate())
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
      }))
    .pipe(concat('scripts.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/distribution/scripts'))
    .pipe(reload({stream: true}));
})

gulp.task('vendor', function() {
  return gulp.src([
      'node_modules/angular/angular.min.js',
      'node_modules/angular-ui-router/release/angular-ui-router.min.js',
      'node_modules/angular-messages/angular-messages.min.js',
      'node_modules/angular-animate/angular-animate.min.js',
      'node_modules/angular-material/angular-material.min.js',
      'node_modules/angular-aria/angular-aria.min.js',
      'node_modules/angular-inview/angular-inview.js' 
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('vendorbundle.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('public/distribution/scripts'))
    .pipe(reload({stream: true}));
})

gulp.task('css',['styles'], function() {
  return gulp.src([
      'public/stylesheets/style.css',
      'node_modules/animate.css/animate.min.css',
      'node_modules/angular-material/angular-material.min.css'

    ])
    .pipe(minifyCSS({'uglyComments': false}))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('public/distribution/scripts'))
    .pipe(reload({stream: true}))
  })


gulp.task('styles', function() {
    return  gulp.src('public/stylesheets/style.styl')
              .pipe(plumber())
              .pipe(stylus({
                use: [typographic(), nib(), rupture(), axis(),  poststylus([lost(), rucksack(), font()])]
              }))
              .pipe(gulp.dest('public/stylesheets'))
              .pipe(reload({stream: true}));
});



gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['browser-sync', 'scripts', 'css'], function () {
  gulp.watch('**/*.js',   ['scripts', reload]);
  gulp.watch('public/stylesheets/**/*.styl',  ['css']);
  gulp.watch('views/**/*.jade', ['jade-watch']);
});



gulp.task('imagemin', function() {
    return gulp.src('public/images/*')
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest('public/distribution/images'));
});





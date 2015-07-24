var tasks = [ "jade-index", "typescript", "stylus-index", "browserify-index" ];
var gulp = require("gulp");
var jade = require("jade");

var gulpJade = require("gulp-jade");
gulp.task("jade-index", function() { gulp.src("./src/index.jade").pipe(gulpJade({
      jade: jade,
      pretty: true
    })).pipe(gulp.dest("../public")); });

var stylus = require("gulp-stylus");
var nib = require("nib");
gulp.task("stylus-index", function() { gulp.src("./src/index.styl").pipe(stylus({use : [ nib() ], errors : true})).pipe(gulp.dest("../public")); });

var ts = require("gulp-typescript");
gulp.task("typescript", function() {
  var tsResult = gulp.src([ "**/*.ts", "!node_modules/**" ]).pipe(ts({
    typescript: require("typescript"),
    declarationFiles: false,
    noImplicitAny: true,
    module: "commonjs",
    target: "ES5"
  }));
  return tsResult.js.pipe(gulp.dest("./"));
});

var browserify = require("browserify");
var source = require("vinyl-source-stream");

gulp.task("browserify-index", ["typescript"], function() {
  var bundler = browserify("./src/index.js");
  function bundle() { return bundler.bundle().pipe(source("index.js")).pipe(gulp.dest("../public")); }
  return bundle();
});

gulp.task("watch", function() {
  gulp.watch(["./src/**/*.jade"], ["jade-index"]);
  gulp.watch(["./src/**/*.styl"], ["stylus-index"]);
  gulp.watch(["./src/**/*.ts"], ["typescript", "browserify-index"]);
});

gulp.task("typescript:all", [ "typescript", "browserify-index" ]);
gulp.task("default", tasks);

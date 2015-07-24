var gulp = require("gulp");
var jade = require("jade");
var gulpJade = require("gulp-jade");
var ts = require("gulp-typescript");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var stylus = require("gulp-stylus");
var nib = require("nib");
var fs = require("fs");

var components = fs.readdirSync("./components");
components.splice(components.indexOf("layout.jade"), 1);

gulp.task("jade", function() {
  for (var i = 0; i < components.length; i++) {
    gulp.src("./components/"+components[i]+"/index.jade").pipe(gulpJade({ jade : jade, pretty : true })).pipe(gulp.dest("./components/"+components[i]));
  }
});

gulp.task("stylus", function() {
  for (var i = 0; i < components.length; i++) {
    gulp.src("./components/"+components[i]+"/index.styl").pipe(stylus({use : [ nib() ], errors : true})).pipe(gulp.dest("./components/"+components[i]));
  }
});

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

gulp.task("browserify", ["typescript"], function() {
  for (var i = 0; i < components.length; i++) {
    var bundler = browserify("./components/" + components[i] + "/index.js");
    function bundle() { return bundler.bundle().pipe(source("index.js")).pipe(gulp.dest("./components/"+components[i])); }
    bundle();
  }
});

gulp.task("watch", function() {
  for (var i = 0; i < components.length; i++) {
    gulp.watch("./components/"+components[i]+"/**/*.jade", ["jade"]);
    gulp.watch("./components/"+components[i]+"/**/*.js", ["browserify"]);
    gulp.watch("./components/"+components[i]+"/**/*.styl", ["stylus"]);
  }
});

gulp.task("default", [ "jade", "typescript", "browserify", "stylus" ]);

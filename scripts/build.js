var fs            = require("fs");
var path          = require("path");
var async         = require("async");
var child_process = require("child_process");

function shouldIgnoreFolder(pluginName) { return pluginName.indexOf(".") !== -1 || pluginName === "node_modules"; }

function log(msg) {
  var text = new Date().toISOString() + " - " + msg;
  console.log(text);
}

// App

var rootPath = path.resolve(__dirname + "/..");

var buildPaths = [
  rootPath + "/client",
  rootPath + "/server"
];

// Plugins

var rootPluginsPath = path.resolve(__dirname + "/../plugins");
fs.readdirSync(rootPluginsPath).forEach(function(pluginAuthor) {
  if (shouldIgnoreFolder(pluginAuthor)) return;

  var pluginAuthorPath = rootPluginsPath + "/" + pluginAuthor;
  fs.readdirSync(pluginAuthorPath).forEach(function(pluginName) {
    if (shouldIgnoreFolder(pluginName)) return;
    buildPaths.push(pluginAuthorPath + "/" + pluginName);
  });
});

// Build

var execSuffix = process.platform == "win32";
var errors = [];

async.eachSeries(buildPaths, function(buildPath, callback) {
  log("Building /" + path.relative(rootPath, buildPath));

  var spawnOptions = { cwd : buildPath, env : process.env, stdio : "inherit" };

  async.series([
    function(cb) {
      if (!fs.existsSync(buildPath + "/gulpfile.js")) { cb(); return; }

      var gulp = child_process.spawn("gulp" + (execSuffix ? ".cmd" : ""), [], spawnOptions);

      gulp.on("close", function(status) {
        if (status !== 0) errors.push("[" + buildPath + "] gulp exited with status code " + status);
        cb();
      });
    }

  ], callback);
}, function() {
  console.log("");

  if (errors.length > 0) {
    log("There were errors:");
    errors.forEach(function(error) {
      console.log(error);
    });
  } else log("Build complete.");
});

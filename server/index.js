/// <reference path="index.d.ts" />
var express = require("express");
var socketio = require("socket.io");
var http = require("http");
var HSHCore = require("../HSHCore/index");
var SocketServer_1 = require("./SocketServer");
var Plugins = require("./Plugins");
var config_1 = require("./config/config");
var port = config_1.default().port;
var host = config_1.default().host;
var pluginsPath = __dirname + "/../plugins";
HSHCore.log("Server starting...");
var mainApp = express();
mainApp.use("/", express.static(__dirname + "/../public"));
for (var _i = 0, _a = Plugins.getAllPlugins(); _i < _a.length; _i++) {
    var plugin = _a[_i];
    for (var _b = 0, _c = plugin.components; _b < _c.length; _b++) {
        var component = _c[_b];
        mainApp.use("/plugins/" + plugin.author + "/" + plugin.name + "/components/" + component.name, express.static(pluginsPath + "/" + plugin.author + "/" + plugin.name + "/components/" + component.name));
    }
}
var mainHttpServer = http.createServer(mainApp);
mainHttpServer.on("error", function (err) {
    if (err.code == "EADDRINUSE") {
        HSHCore.error("Can't run server. Another app is already running on this port.");
        process.exit();
    }
    else if (err.code == "ENOTFOUND") {
        HSHCore.error("Can't run server on this ip. Try changing it on /config.json.");
        process.exit();
    }
    else {
        throw err;
    }
});
var io = socketio(mainHttpServer, { transports: ["websocket"] });
mainHttpServer.listen(port, host, function () {
    HSHCore.log("Server started on http://" + host + ":" + port);
});
var soServer = new SocketServer_1.default(io);

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fs = require("fs");
var HSHCore = require("../HSHCore/index");
var path = require("path");
var PluginRemoteClient = (function (_super) {
    __extends(PluginRemoteClient, _super);
    function PluginRemoteClient(socket) {
        var _this = this;
        _super.call(this, "plugins", socket);
        this.onGetAllPlugins = function () {
            if (!fs.existsSync("./plugins")) {
                HSHCore.error("Plugins' folder has been removed. Please reinstall HSH.");
                process.exit();
            }
            var authors = fs.readdirSync("./plugins");
            var plugins = [];
            for (var _i = 0; _i < authors.length; _i++) {
                var author = authors[_i];
                var pluginsByAuthor = fs.readdirSync("./plugins/" + author);
                for (var _a = 0; _a < pluginsByAuthor.length; _a++) {
                    var pluginName = pluginsByAuthor[_a];
                    plugins.push(new HSHCore.Plugin(author, pluginName));
                }
            }
            _this.plugins = plugins;
            _this.socket.emit("plugins:getAll", _this.plugins);
        };
        this.on("getAll", this.onGetAllPlugins);
        this.trigger();
    }
    return PluginRemoteClient;
})(HSHCore.QueryParent);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PluginRemoteClient;
function getAllPlugins() {
    if (!fs.existsSync("./plugins")) {
        HSHCore.error("Plugins' folder has been removed. Please reinstall HSH.");
        process.exit();
    }
    var authors = fs.readdirSync("./plugins");
    var plugins = [];
    for (var _i = 0; _i < authors.length; _i++) {
        var author = authors[_i];
        var pluginsByAuthor = fs.readdirSync("./plugins/" + author);
        for (var _a = 0; _a < pluginsByAuthor.length; _a++) {
            var pluginName = pluginsByAuthor[_a];
            plugins.push(new HSHCore.Plugin(author, pluginName));
        }
    }
    HSHCore.log("Loaded " + plugins.length + " plugins from " + path.join(__dirname, "../plugins") + ".");
    return plugins;
}
exports.getAllPlugins = getAllPlugins;

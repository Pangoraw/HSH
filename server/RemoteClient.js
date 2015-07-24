var Plugins_1 = require("./Plugins");
var RemoteClient = (function () {
    function RemoteClient(server, socket) {
        var _this = this;
        this._onDisconnect = function () {
            _this._server.removeRemoteClient(_this._socket.id);
        };
        this._socket = socket;
        this._server = server;
        this.pluginRemoteClient = new Plugins_1.default(this._socket);
        this._socket.on("disconnect", this._onDisconnect);
    }
    return RemoteClient;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RemoteClient;

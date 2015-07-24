var RemoteClient_1 = require("./RemoteClient");
var SocketServer = (function () {
    function SocketServer(io) {
        var _this = this;
        this.onConnection = function (socket) {
            var client = new RemoteClient_1.default(_this, socket);
            _this.clientsBySocketId[socket.id] = client;
        };
        this._io = io;
        this.clientsBySocketId = {};
        this._io.on("connection", this.onConnection);
    }
    ;
    SocketServer.prototype.removeRemoteClient = function (id) {
        delete this.clientsBySocketId[id];
    };
    ;
    return SocketServer;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SocketServer;

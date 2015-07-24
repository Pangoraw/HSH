import SocketServer from "./SocketServer";
import * as HSHCore from "../HSHCore/index";
import PluginRemoteClient from "./Plugins";

export default class RemoteClient {
  _socket : SocketIO.Socket;
  _server : SocketServer;
  pluginRemoteClient : PluginRemoteClient;

  constructor( server : SocketServer, socket : SocketIO.Socket ) {
    this._socket = socket;
    this._server = server;

    this.pluginRemoteClient = new PluginRemoteClient( this._socket );
    this._socket.on("disconnect", this._onDisconnect);
  }

  _onDisconnect = () => {
    this._server.removeRemoteClient(this._socket.id);
  }
}

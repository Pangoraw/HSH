import RemoteClient from "./RemoteClient";
import * as Plugins from "./Plugins";

export default class SocketServer {
  _io: SocketIO.Server;
  clientsBySocketId : { [socketId: string]: RemoteClient };

  constructor( io : SocketIO.Server ) {
    this._io = io;
    this.clientsBySocketId = {};

    this._io.on("connection", this.onConnection);
  };

  onConnection = ( socket : SocketIO.Socket ) : void => {
    let client = new RemoteClient(this, socket);
    this.clientsBySocketId[socket.id] = client;
  };

  removeRemoteClient( id : string ) : void {
    delete this.clientsBySocketId[id];
  };
}

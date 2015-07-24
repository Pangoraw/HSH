import * as io from "socket.io-client";

export function connect(options : { reconnection : boolean } = { reconnection : true }) : SocketIOClient.Socket {
  let socket = io.connect(`${window.location.protocol}//${window.location.host}`, { transports: [ "websocket" ], reconnection: options.reconnection });
  return socket;
}

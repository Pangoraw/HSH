/// <reference path="index.d.ts" />

import * as express from "express";
import * as socketio from "socket.io";
import * as http from "http";

import * as HSHCore from "../HSHCore/index";
import SocketServer from "./SocketServer";
import * as Plugins from "./Plugins";
import config from "./config/config";
let port = config().port;
let host = config().host;
let pluginsPath = `${__dirname}/../plugins`;

HSHCore.log("Server starting...");

let mainApp = express();
mainApp.use("/", express.static(`${__dirname}/../public`));

for (let plugin of Plugins.getAllPlugins()) {
  for (let component of plugin.components) {
    mainApp.use(`/plugins/${plugin.author}/${plugin.name}/components/${component.name}`, express.static(`${pluginsPath}/${plugin.author}/${plugin.name}/components/${component.name}`))
  }
}

let mainHttpServer = http.createServer(mainApp);
mainHttpServer.on("error", (err : NodeJS.ErrnoException) => {
  if (err.code == "EADDRINUSE") {
    HSHCore.error("Can't run server. Another app is already running on this port.")
    process.exit();
  } else if (err.code == "ENOTFOUND") {
    HSHCore.error("Can't run server on this ip. Try changing it on /config.json.");
    process.exit();
  } else { throw err; }
});

let io = socketio(mainHttpServer, { transports : [ "websocket" ] });

mainHttpServer.listen(port, host, () => {
  HSHCore.log(`Server started on http://${host}:${port}`);
});

let soServer = new SocketServer(io);

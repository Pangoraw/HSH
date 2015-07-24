/// <reference path="./index.d.ts"/>

import Component from "./src/Component";
import Query from "./src/Query";
import QueryParent from "./src/QueryParent";
import Plugin from "./src/Plugin";
require("colors");

export { error, log, Component, Query, QueryParent, Plugin };

function log( msg : string ) : void {
  let timestamp = new Date().toUTCString();
  console.log(`[${timestamp}] - `.grey.italic + msg.white.bold);
}

function error( msg : string ) : void {
  let timestamp = new Date().toUTCString();
  console.log(`[${timestamp}] -`.grey.italic + msg.red);
  process.exit();
}

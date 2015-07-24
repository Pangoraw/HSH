/// <reference path="../index.d.ts"/>

import * as HSHClient from "../../HSHClient/HSHClient";
import * as HSHCore from "../../HSHCore/index";
import Grid from "./scripts/Grid";

let gridHolder = (<HTMLDivElement>document.getElementById("components"));
let panel = (<HTMLDivElement>document.getElementById("components-panel"));
let button = (<HTMLSpanElement>document.getElementById("reorder"));

let cGrid = new Grid(gridHolder, panel, button);

let socket = HSHClient.connect();
socket.emit("plugins:getAll");
socket.on("plugins:getAll", (plugins : HSHCore.Plugin[]) => {
  for (let plugin of plugins) {
    for (let component of plugin.components) {
      cGrid.appendComponent(component, plugin);
    }
  }
});

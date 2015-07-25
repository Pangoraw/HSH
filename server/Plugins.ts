import * as fs from "fs";
import * as HSHCore from "../HSHCore/index";
import * as path from "path";

export default class PluginRemoteClient extends HSHCore.QueryParent {
  plugins : HSHCore.Plugin[];

  constructor( socket : SocketIO.Socket ) {
    super("plugins", socket);

    this.on("getAll", this.onGetAllPlugins);

    this.trigger();
  }

  onGetAllPlugins = () => {
    if (!fs.existsSync("./plugins")) { HSHCore.error("Plugins' folder is not installed. Please, install install at least the default plugins from Pangoraw."); process.exit(); }
    let authors = fs.readdirSync("./plugins");
    let plugins : HSHCore.Plugin[] = [];

    for (let author of authors) {
      let pluginsByAuthor = fs.readdirSync(`./plugins/${author}`);
      for (let pluginName of pluginsByAuthor) {
        plugins.push(new HSHCore.Plugin(author, pluginName));
      }
    }

    this.plugins = plugins;
    this.socket.emit("plugins:getAll", this.plugins);
  };
}

export function getAllPlugins() : HSHCore.Plugin[] {
  if (!fs.existsSync("./plugins")) { HSHCore.error("Plugins' folder is not installed. Please, install install at least the default plugins from Pangoraw."); process.exit(); return; }
  let authors = fs.readdirSync("./plugins");
  let plugins : HSHCore.Plugin[] = [];

  for (let author of authors) {
    let pluginsByAuthor = fs.readdirSync(`./plugins/${author}`);
    for (let pluginName of pluginsByAuthor) {
      plugins.push(new HSHCore.Plugin(author, pluginName));
    }
  }
  HSHCore.log(`Loaded ${plugins.length} plugins from ${path.join(__dirname, "../plugins")}.`);
  return plugins;
}

import defaultConfig from "./defaultConfig";
import * as fs from "fs";

export default function config() : { port : number, host : string } {
  if (!fs.existsSync("./config.json")) { return defaultConfig() };

  let userConfig : HSHConfig = JSON.parse(fs.readFileSync("./config.json", { encoding: "utf8" }));

  let serverConfig : { port : number, host : string } = { port : defaultConfig().port, host : defaultConfig().host };

  if (userConfig.server.port != undefined) serverConfig.port = userConfig.server.port;
  if (userConfig.server.host != undefined) serverConfig.host = userConfig.server.host;

  return serverConfig;
}

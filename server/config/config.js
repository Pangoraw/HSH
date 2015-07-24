var defaultConfig_1 = require("./defaultConfig");
var fs = require("fs");
function config() {
    if (!fs.existsSync("./config.json")) {
        return defaultConfig_1.default();
    }
    ;
    var userConfig = JSON.parse(fs.readFileSync("./config.json", { encoding: "utf8" }));
    var serverConfig = { port: defaultConfig_1.default().port, host: defaultConfig_1.default().host };
    if (userConfig.server.port != undefined)
        serverConfig.port = userConfig.server.port;
    if (userConfig.server.host != undefined)
        serverConfig.host = userConfig.server.host;
    return serverConfig;
}
exports.default = config;

import * as fs from "fs";
import * as path from "path";
import Plugin from "./Plugin";

export default class Component {
  size : { h : number, w : number };
  name : string;
  url : string;
  plugin : Plugin;
  iFrameURL : string;

  initSize = function( iframe : HTMLIFrameElement ) : HTMLIFrameElement {
    iframe.style.height = (this.size.h * 200).toString() + "px";
    iframe.style.width = (this.size.w * 200).toString() + "px";
    return iframe;
  };

  constructor( name : string, parentUrl : string ) {
    this.name = name;
    this.url = parentUrl + "components/" + this.name;

    if (fs.existsSync(path.join(__dirname, "../../", this.url + "/index.html"))) this.iFrameURL = this.url + "/index.html";
    if (fs.existsSync(path.join(__dirname, "../../", this.url + "/config.json"))) {
      let config : ComponentOptions = JSON.parse(fs.readFileSync(path.join(__dirname, "../../", this.url + "/config.json"), { encoding : "utf-8" }));
      if (config.size != undefined) {
        this.size = config.size;
        this.initSize;
      }
    }
  }
}

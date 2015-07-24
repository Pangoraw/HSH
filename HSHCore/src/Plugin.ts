import Component from "./Component";
import * as fs from "fs";
import * as path from "path";

export default class Plugin {
  components : Component[] = [];

  author : string;
  name : string;
  url : string;

  constructor(author : string, name : string) {
    this.author = author;
    this.name = name;
    this.url = author + "/" + name;

    if (fs.existsSync(path.join(__dirname, "../../plugins/" + this.url + "/components"))) {
      let componentsUrl : string[] = fs.readdirSync(path.join(__dirname, "../../plugins/" + this.url + "/components"));
      for (let url of componentsUrl) {
        if (url.search("layout.jade") == -1)
          this.components.push(new Component(url, `/plugins/${this.author}/${this.name}/`));
      }
    }
  }
}

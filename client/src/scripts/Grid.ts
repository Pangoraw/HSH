import * as HSHCore from "../../../HSHCore/index";

export default class Grid {
  options : {
    heightRatio : number;
    widthRatio : number;
  } = {
    heightRatio : 200,
    widthRatio : 200
  };

  iFrames : Array<HTMLIFrameElement> = [];

  holder : HTMLDivElement;
  reorderPanel : HTMLDivElement;
  triggerButton : HTMLSpanElement;

  reorderPanelState = "in";

  constructor(holder : HTMLDivElement, reorderPanel : HTMLDivElement, triggerButton : HTMLSpanElement, options? : { heightRatio? : number; widthRatio? : number; }) {
    if (holder == undefined || reorderPanel == undefined || triggerButton == undefined ) HSHCore.error("wrong params");

    if (options) {
      if (options.heightRatio)
        this.options.heightRatio = options.heightRatio;
      if (options.widthRatio)
        this.options.widthRatio = options.widthRatio;
    }

    this.holder = holder;
    this.reorderPanel = reorderPanel;
    this.triggerButton = triggerButton;

    this.triggerButton.addEventListener("click", this.onTriggerButtonClick);
    (<HTMLElement>this.reorderPanel.children[0]).children[1].addEventListener("click", this.increaseRatio);
    (<HTMLElement>this.reorderPanel.children[0]).children[2].addEventListener("click", this.decreaseRatio);
  }

  onTriggerButtonClick : (e : Event) => void = ( e : Event ) => {
    e.preventDefault();

    if (this.reorderPanelState == "in") {
      (<HTMLElement>this.triggerButton.children[0]).innerText = "done";
      this.reorderPanel.classList.add("out");
      this.reorderPanel.classList.remove("in");
      this.reorderPanelState = "out";
    } else {
      (<HTMLElement>this.triggerButton.children[0]).innerText = "reorder";
      this.reorderPanel.classList.add("in");
      this.reorderPanel.classList.remove("out");
      this.reorderPanelState = "in";
    }
  }

  appendComponent( c : HSHCore.Component, p : HSHCore.Plugin ) {
    let iframe = document.createElement("iframe");
    iframe.src = c.iFrameURL;
    this.resizeIframe(iframe, c.size);
    document.body.appendChild(iframe);
    this.iFrames.push(iframe);
    let li = document.createElement("li");
    li.innerHTML =
      '<i class="material-icons">swap_vert_circle</i>' +
      '<i class="material-icons">check_box</i>' +
      '<p> ' + `${p.author}/${p.name}/${c.name}` + '</p>' +
      '<hr>';
    li.children[1].addEventListener("click", () => {
      if ((<HTMLElement>li.children[1]).innerHTML == "check_box_outline_blank") {
        (<HTMLElement>li.children[1]).innerHTML = "check_box";
        iframe.style.display = "block";
      } else {
        (<HTMLElement>li.children[1]).innerHTML = "check_box_outline_blank";
        iframe.style.display = "none";
      }
    });
    this.reorderPanel.children[1].appendChild(li);
  }

  increaseRatio = ( e : Event ) => {
    e.preventDefault();

    var hRatio = this.options.heightRatio;
    var wRatio = this.options.widthRatio;

    this.options.heightRatio += 50;
    this.options.widthRatio += 50;

    for (let iframe of this.iFrames) {
      this.resizeIframe(iframe, { h : Math.floor(parseInt(iframe.style.height) / hRatio), w : Math.floor(parseInt(iframe.style.width) / wRatio) })
    }
  };

  decreaseRatio = ( e : Event ) => {
    e.preventDefault();

    var hRatio = this.options.heightRatio;
    var wRatio = this.options.widthRatio;

    this.options.heightRatio -= 50;
    this.options.widthRatio -= 50;

    for (let iframe of this.iFrames) {
      this.resizeIframe(iframe, { h : Math.floor(parseInt(iframe.style.height) / hRatio), w : Math.floor(parseInt(iframe.style.width) / wRatio) })
    }
  }

  resizeIframe(iframe : HTMLIFrameElement, size : { h : number, w : number }) : HTMLIFrameElement {
    iframe.style.height = (size.h * this.options.heightRatio).toString() + "px";
    iframe.style.width = (size.w * this.options.widthRatio).toString() + "px";
    return iframe;
  }
}

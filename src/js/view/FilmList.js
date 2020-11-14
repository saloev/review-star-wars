import { FetchData } from "../utils/index";

import EventsName from "../events/index";

import BaseView from "./BaseView";

export default class BaseLayout extends BaseView {
  constructor() {
    super(".main-content");
    this.filmList = this.getFromLS("list");
  }

  init = () => {
    this.render();
    this.initEvents();
  };

  render() {
    const list = this.filmList;    
  }

  initEvents = () => {};
}

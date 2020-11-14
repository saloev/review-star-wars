import { FetchData } from "../utils/index";

import EventsName from "../events/index";

import BaseView from "./BaseView";

export default class BaseLayout extends BaseView {
  constructor() {
    super("#app");
  }

  init = () => {
    this.initEvents();
  };

  initEvents = () => {
    this.fetchData();
  };

  async fetchData() {
    try {
      const {results} = await FetchData.filmList();
      this.updateLS("list", results);
      this.commit(EventsName.APPLICATION_READY);
    } catch (e) {
      console.error(e);
    }
  }
}

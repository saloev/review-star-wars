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
      const list = this.getFromLS("list");
      if (!list || !list.length) {
        const { results } = await FetchData.filmList();
        // const addFilmDesc = results.map((item) =>
        //   (async () => {
        //     const desc = await FetchData.film(item.episode_id);
        //     return { ...item, desc };
        //   })()
        // );
        // const filmsWithDesc = await Promise.all(addFilmDesc);
        this.updateLS("list", results);
      }
      this.commit(EventsName.APPLICATION_READY);
    } catch (e) {
      console.error(e);
    }
  }
}

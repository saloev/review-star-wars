import { FetchData } from "../utils/index";

import EventsName from "../events/index";

import BaseView from "./BaseView";

export default class BaseLayout extends BaseView {
  constructor() {
    super(".main-content");
    this.filmList = this.getFromLS("list");
  }

  filmTemplate({
    title,
    episode_id: id,
    director,
    producer,
    opening_crawl: desc,
    release_date: releaseDate,
  }) {
    return `<div class="film">
      <header class="film__header">
        <h3 class="film__title">${title}</h3>
        <p class="film__director">${director}</p>
        <p class="film__producer">${producer}</p>
      </header>
      <p class="film__dec">${desc}</p>
      <time datetime="${releaseDate}" class="film__release-date">${releaseDate}</time>
    </div>`;
  }

  init = () => {
    this.renderHTML();
    this.initEvents();
  };

  renderHTML() {
    const list = this.filmList.reduce(
      (html, film) => `${html}<li>${this.filmTemplate(film)}</li>`,
      ""
    );
    super.render(`<ul>${list}</ul>`);
  }

  initEvents = () => {};
}

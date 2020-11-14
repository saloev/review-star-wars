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
    return `
    <div class="card">
      <header class="card-header has-text-center">
        <p class="card-header-title title">
          ${title}
        </p>
      </header>
      <div class="card-content">
        <div class="content has-text-left">
          <p class=""><strong>director:</strong> ${director}</p>  
          <p class=""><strong>producer:</strong> ${producer}</p>  
          <p class="subtitle">${desc}</p>
          <time datetime="${releaseDate}"><strong>release date:</strong> ${releaseDate}</time>
        </div>
      </div>
      <footer class="card-footer">
        <a href="#${id}" class="card-footer-item" data-film-id="${id}">Review</a>
      </footer>
    </div>
    `;
  }

  init = () => {
    this.renderHTML();
    this.initEvents();
  };

  renderHTML() {
    const list = this.filmList.reduce(
      (html, film) => `${html}<li class="column is-half">${this.filmTemplate(film)}</li>`,
      ""
    );
    super.render(`<ul class="columns is-multiline">${list}</ul>`);
  }

  initEvents = () => {};
}

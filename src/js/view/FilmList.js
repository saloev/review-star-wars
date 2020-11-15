import { FetchData } from "../utils/index";

import EventsName from "../events/index";

import BaseView from "./BaseView";

export default class FilmList extends BaseView {
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
    <div class="card is-flex is-flex-direction-column">
      <header class="card-header has-text-center">
        <p class="card-header-title title">
          ${title}
        </p>
      </header>
      <div class="card-content">
        <div class="content has-text-left">
          <p class=""><strong>Director:</strong> ${director}</p>  
          <p class=""><strong>Producer:</strong> ${producer}</p>  
          <p class="subtitle">${desc}</p>
          <time datetime="${releaseDate}"><strong>Release date:</strong> ${releaseDate}</time>
        </div>
      </div>
      <footer class="card-footer">
        <a href="#${id}" class="card-footer-item film__review-btn" data-film-id="${id}">Review</a>
      </footer>
    </div>
    `;
  }

  init = () => {
    this.renderHTML();
    this.initEvents();
  };

  renderHTML() {
    super.setTitleAndSubtitle("STAR WARS", `Film list`);
    const list = this.filmList.reduce(
      (html, film) =>
        `${html}<div class="film-list__item column is-half">${this.filmTemplate(film)}</div>`,
      ""
    );
    super.render(
      `<div class="container film-list-container"><div class="film-list columns is-multiline">${list}</div></div>`
    );
  }

  initEvents = () => {
    const wrapper = super.select(".film-list");
    wrapper.onclick = ({ target }) => {
      const id = target.dataset && target.dataset.filmId;
      if (!id) return;
      super.commit(EventsName.LOAD_ASYNC_FILES, id);
      super.commit(EventsName.BACK_TO_FILM_PAGE, id);
    };
    super.listen(EventsName.BACK_TO_MAIN_PAGE, this.init);
  };
}

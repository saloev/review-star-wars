import BaseView from "./BaseView";

export default class BaseLayout extends BaseView {
  constructor() {
    super("#app");
  }

  init = () => {
    this.initEvents();

    super.render(`
    <div class="main-layout">
      <header class="main-header has-text-weight-bold is-size-2 has-text-centered">
        Star Wars
      </header>
      <main class="main-content content has-text-centered"></main>
      <footer class="main-footer footer">
        <div class="content has-text-centered">
          <p>
            <strong>&copy; ${new Date().getFullYear()} by SS</strong> 
          </p>
        </div>
      </footer>
    </div>`);
  };

  initEvents = () => {};
}

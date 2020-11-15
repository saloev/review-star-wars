import BaseView from "./BaseView";

export default class BaseLayout extends BaseView {
  constructor() {
    super("#app");
  }

  init = () => {
    this.initEvents();

    super.render(`
    <div class="main-layout">
      <header class="main-header has-text-weight-bold is-size-2 has-text-centered mb-5">
        <section class="hero is-medium is-primary is-bold">
          <div class="hero-body">
            <div class="container">
              <h1 class="title main-header__title">
              </h1>
              <h2 class="subtitle main-header__subtitle">
              </h2>
            </div>
          </div>
        </section>
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

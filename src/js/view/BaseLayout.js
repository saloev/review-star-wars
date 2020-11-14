import BaseView from "./BaseView";

export default class BaseLayout extends BaseView {
  constructor() {
    super("#app");
  }

  init = () => {
    this.initEvents();

    super.render(`
    <div class="main-layout">
      <header class="main-header">
        Star Wars
      </header>
      <main class="main-content"></main>
      <footer class="main-footer">&copy; ${new Date().getFullYear()}</footer>
    </div>`);
  };

  initEvents = () => {};
}

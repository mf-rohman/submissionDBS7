import "../../../styles/home-page.css";
import "../../../styles/skip-content.css";
import HomeView from "./home-view.js";
import HomeModel from "./home-model.js";
import HomePresenter from "./home-presenter.js";

export default class HomePage {
  async render() {
    this.view = new HomeView();
    this.model = new HomeModel();
    this.presenter = new HomePresenter({ view: this.view, model: this.model });

    return this.view.render();
  }

  async afterRender() {
    this.view.eventRender();
    this.presenter.loadStories();
  }
}

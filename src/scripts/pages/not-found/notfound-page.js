import NotFoundView from "./notfound-view.js";
import NotFoundModel from "./notfound-model.js";
import NotFoundPresenter from "./notfound-presenter.js";
import "../../../styles/not-found.css";

export default class NotFoundPage {
  async render() {
    this.view = new NotFoundView();
    this.model = new NotFoundModel();
    this.presenter = new NotFoundPresenter({
      view: this.view,
      model: this.model,
    });
    console.log("Rendering Not Found page...");
    return this.view.render();
  }

  async afterRender() {
    this.presenter.init();
  }
}

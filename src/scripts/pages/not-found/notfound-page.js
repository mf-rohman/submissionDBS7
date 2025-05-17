import NotFoundView from "./notFound-view.js";
import NotFoundModel from "./notFound-model.js";
import NotFoundPresenter from "./notFound-presenter.js";
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

import NotFoundView from "@/scripts/pages/not-found/notfound-view.js";
import NotFoundModel from "@/scripts/pages/not-found/notfound-model.js";
import NotFoundPresenter from "@/scripts/pages/not-found/notfound-presenter.js";  
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

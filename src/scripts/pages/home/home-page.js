import "../../../styles/home-page.css";
import "../../../styles/skip-content.css";
import HomeView from "./home-view.js";
import HomeModel from "./home-model.js";
import HomePresenter from "./home-presenter.js";
import { initSubscribeButton } from "../../utils/handleSubscribe.js";
import "../../../styles/button.css";

export default class HomePage {
  async render() {
    console.log("HomePage render....");
    this.view = new HomeView({
      onSaveClick: (story) => this.presenter.handleSaveStory(story),
      onDetailClick: (story) => this.presenter.handleDetailStory(story),
    });
    this.model = new HomeModel();
    this.presenter = new HomePresenter({ view: this.view, model: this.model });

    return this.view.render();
  }

  async afterRender() {
    await initSubscribeButton();
    this.view.eventRender();
    this.presenter.loadStories();
  }
}

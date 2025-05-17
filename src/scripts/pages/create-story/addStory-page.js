// import { createStory } from "../../data/api";
import "leaflet/dist/leaflet.css";
import "../../../styles/create-story-page.css";
import L from "leaflet";
import AddStoryModel from "./addStory-model";
import AddStoryView from "./addStory-view";
import AddStoryPresenter from "./addStroy-presenter";
import { initSubscribeButton } from "../../utils/handleSubscribe";

export default class CreatePage {
  async render() {
    console.log("Rendering create page...");
    this.view = new AddStoryView();
    this.model = new AddStoryModel();
    this.presenter = new AddStoryPresenter(this.view, this.model);
    // const container = document.createElement("div");
    // container. = this.view.render();

    // return container;
    return this.view.render();
  }

  async afterRender() {
    await initSubscribeButton();
    console.log("Running afterRender...");
    // this.view.setupElementReferences();
   this.presenter.init();
  }
}

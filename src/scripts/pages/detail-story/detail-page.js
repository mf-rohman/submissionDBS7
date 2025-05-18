import DetailView from "./detail-view";
import DetailModel from "./detail-model";
import DetailPresenter from "./detail-presenter";

export default class DetailPage {
  constructor(storyId) {
    this.storyId = storyId;
  }

  async render() {
    this.view = new DetailView();
    this.model = new DetailModel();
    this.presenter = new DetailPresenter({
      view: this.view,
      model: this.model,
      storyId: this.storyId,
    });

    return this.view.render();
  }

  async afterRender() {
    this.presenter.loadStoryDetail();
  }
}

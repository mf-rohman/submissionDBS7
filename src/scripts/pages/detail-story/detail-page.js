import DetailView from "./detail-view.js";
import DetailModel from "./detail-model.js";
import DetailPresenter from "./detail-presenter.js";
import { parseActivePathname } from "../../routes/url-parser.js";
import "../../../styles/detail-page.css";


export default class DetailPage {
  constructor() {
    this.storyId = null;
  }

  async render() {
    return new DetailView().render();
  }

  async afterRender() {
    const view = new DetailView();
    const model = new DetailModel();

    const { id } = parseActivePathname();
    this.storyId = id;

    const presenter = new DetailPresenter({
      view,
      model,
      storyId: this.storyId,
    });

    await presenter.loadStoryDetail();
  }
}

import NotFoundModel from "../../pages/not-found/notfound-model.js";
import NotFoundView from "../../pages/not-found/notfound-view.js";

export default class NotFoundPresenter {
  constructor() {
    this._model = new NotFoundModel();
    this._view = new NotFoundView();
  }

  async init() {
    const message = this._model.getMessage();
    return this._view.render(message);
  }
}

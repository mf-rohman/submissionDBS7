import { login } from "../../data/api";
import LoginView from "./login-view";
import LoginModel from "./login-model";
import LoginPresenter from "./login-presenter";
import "../../../styles/login-page.css";

export default class LoginPage {
  async render() {
    this.view = new LoginView();
    this.model = new LoginModel();
    this.presenter = new LoginPresenter({ view: this.view, model: this.model });
    return this.view.render();
  }

  async afterRender() {
    this.view.eventRender();
  }
}

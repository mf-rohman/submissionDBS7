// import { register } from "../../data/api";
import RegisterView from "./register-view";
import RegisterModel from "./register-model";
import RegisterPresenter from "./register-presenter";
import "../../../styles/register-page.css"

export default class RegisterPage {
 
  async render() {
    this.view = new RegisterView();
    this.model = new RegisterModel();
    this.presenter = new RegisterPresenter({ view: this.view, model: this.model });

    return this.view.render();
  }

  async afterRender() {
    this.view.eventRender();
  }
}

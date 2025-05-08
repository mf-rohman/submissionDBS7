import AboutModel from "./about-model.js";
import AboutView from "./about-view.js";

export default class AboutPresenter {
  constructor() {
    this.model = new AboutModel();
    this.view = new AboutView();
  }

  async init() {
    const personalInfo = this.model.getPersonalInfo();
    const skills = this.model.getLearnedSkills();
    const team = this.model.getTeamMembers();
    const contact = this.model.getContactInfo();

    return this.view.render({ personalInfo, skills, team, contact });
  }
}

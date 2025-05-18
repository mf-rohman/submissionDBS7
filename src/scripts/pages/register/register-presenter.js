export default class RegisterPresenter {
  constructor({ view, model }) {
    this.view = view;
    this.model = model;

    this.view.onSubmit = this.handleRegister.bind(this);
  }

  async handleRegister(userData) {
    this.view.showMessage("");

    if (!this.isValidEmail(userData.email)) {
      this.view.showMessage("Email tidak valid.", "red");
      return;
    }

    if (!this.isValidPassword(userData.password)) {
      this.view.showMessage("Password minimal 8 karakter.", "red");
      return;
    }

    try {
      const registerResult = await this.model.userRegister(userData);
      this.view.showMessage("Registration Successful", "green");
      this.view.clearForm();
      this.view.navigateToLogin();
    } catch (error) {
      this.view.showMessage(`Registration Failed: ${error.message}`, "red");
    }
  }
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  isValidPassword(password) {
    return password && password.length >= 8;
  }
}

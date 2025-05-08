export default class RegisterPresenter {
    constructor({ view, model }) {
        this.view = view;
        this.model = model;
    }

    async handleRegister(userData) {
        this.view.showMessage("");
        try {
            const registerResult = await this.model.userRegister(userData);
            this.view.showMessage("Registration Successful!", "green");
            this.view.clearForm();
            if (registerResult) {
                this.view.navigateToHome();
            }
        } catch (error) {
            this.view.showMessage(`Registration Failed: ${error.message}`, "red");
        }
    }
}
export default class LoginPresenter {
    constructor({ view, model }) {
        this.view = view;
        this.model = model;

        this.view.onSubmit = this.handleLogin.bind(this);
    }
    async handleLogin(credentials) {
        this.view.showMessage("");
        
        try {
            const loginResult = await this.model.loginAPI(credentials);
            if (loginResult) {
                this.view.navigateToHome();
            }
        } catch (error) {
            this.view.showMessage(`Login Failed: ${error.message}`);
        }
    }
}
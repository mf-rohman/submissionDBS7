export default class RegisterView {
    constructor() {
        this.formRegister = null;
        this.registerMessage = null;
        this.onSubmit = null;
    }

    render() {
        return `
            <section class="register-page container fade-slide-in" id="register-page">
                <div class="register-box">
                  <h2 class="register-title">Register</h2>
                  <form id="form-register" class="form-register">
                    <div class="form-group">
                      <label for="name">Name</label>
                      <input type="text" id="name" required />
                    </div>
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input type="email" id="email" required />
                    </div>
                    <div class="form-group">
                      <label for="password">Password</label>
                      <input type="password" id="password" required />
                    </div>
                    <button type="submit" class="btn btn-primary">Register</button>
                  </form>
                  <p class="login-link">
                    Already have an account?
                    <a href="#/login">Login here</a>
                  </p>
                  <div id="register-message" class="register-message"></div>
                </div>
            </section>
        `;
    }

    eventRender() {
        this.formRegister = document.getElementById("form-register");
        this.registerMessage = document.getElementById("register-message");

        this.formRegister.addEventListener("submit", (e) => {
            e.preventDefault();
            this.registerMessage.textContent = "";

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (this.onSubmit) {
                this.onSubmit({ name, email, password });
            }
        });
    }

    showMessage(message, color="red") {
        this.registerMessage.textContent = message;
        this.registerMessage.style.color = color;
    }

    navigateToLogin() {
        window.location.hash = "#/login";
    }
}
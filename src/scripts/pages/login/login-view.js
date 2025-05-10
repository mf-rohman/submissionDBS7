export default class LoginView {
  constructor() {
    this.formLogin = null;
    this.loginMessage = null;
    this.onSubmit = null;
  }

  render() {
    return `
        <section class="login-page container fade-slide-in" id="login-page">
            <div class="login-box">
              <h2 class="login-title">Login</h2>
              <form class="login-form" id="login-form">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" required />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" id="password" required />
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
              </form>
              <p class="register-link">Don't have an account? <a href="#/register">Create here</a></p>
              <div id="login-message" class="message-box"></div>
            </div>
        </section>
        `;
    }

    eventRender() {
        this.formLogin = document.getElementById("login-form");
        this.loginMessage = document.getElementById("login-message");

        this.formLogin.addEventListener("submit", (e) => {
            e.preventDefault();
            this.loginMessage.textContent = "";

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (this.onSubmit) {
                this.onSubmit({ email, password });
            }
        });
    }

    showMessage(message) {
        this.loginMessage.textContent = message;
        this.loginMessage.style.color = "red";
    }
    navigateToHome() {
        window.location.hash = "#/";
    }

}

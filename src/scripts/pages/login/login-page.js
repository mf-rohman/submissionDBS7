import { login } from "../../data/api";
import "../../../styles/login-page.css";

export default class LoginPage {
  async render() {
    return `
            <section class="login-page container fade-slide-in">
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
  async afterRender() {
    const formLogin = document.getElementById("login-form");
    const loginMessage = document.getElementById("login-message");

    formLogin.addEventListener("submit", async (e) => {
      e.preventDefault();
      loginMessage.textContent = "";

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const loginResult = await login({ email, password });
        if (loginResult) {
          window.location.hash = "#/";
        }
      } catch (error) {
        loginMessage.textContent = `Login Failed: ${error.message}`;
        loginMessage.style.color = "red";
      }
    });
  }
}

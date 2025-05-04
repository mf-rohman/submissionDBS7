import { register } from "../../data/api";
import "../../../styles/register-page.css"

export default class RegisterPage {
  async render() {
    return `
           <section class="register-page container fade-slide-in">
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
  async afterRender() {
    const formRegister = document.getElementById("form-register");
    const messageRegister = document.getElementById("register-message");

    formRegister.addEventListener("submit", async (e) => {
      e.preventDefault();
      messageRegister.textContent = "";

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        await register({ name, email, password });
        messageRegister.textContent =
          "Resgistration Success! you can login now";
        messageRegister.style.color = "green";
        window.location.hash = "#/login";
      } catch (error) {
        messageRegister.textContent = `Registration Failed: ${error.message}`;
        messageRegister.style.color = "red";
      }
    });
  }
}

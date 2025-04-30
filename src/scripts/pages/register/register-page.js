import { register } from "../../data/api";

export default class RegisterPage {
  async render() {
    return `
            <section class="register-page" container>
              <h2>Register</h2>
              <form id="form-register" class="form-register ">
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
                <button type="submit" class="btn">Register</button>
              </form>
              <p>Do you have an account? <a href="#/login">Login here</a></p>
              <div class="register-message" id="register-message"></div>
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
        await register({name, email, password});
        messageRegister.textContent = "Resgistration Success! you can login now";
        messageRegister.style.color = "green";
        window.location.hash = "#/login";
      } catch (error) {
        messageRegister.textContent = `Registration Failed: ${error.message}`;
        messageRegister.style.color = "red";
      };

    });
  }
};

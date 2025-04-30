import { login } from "../../data/api";

export default class LoginPage {
    async render () {
        return `
            <section class="login-page container">
                <h2>Login</h2>
                <form class="login-form" id="login-form">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" required />
                    </div>
                    <button type="submit" class="btn">Login</button>
                </form>
                <p>Do you haven't an account? <a href="#/register">Create here</a></p>
                <div id="login-message"></div>
            </section>
        `;
    }
    async afterRender() {
        const formLogin = document.getElementById("login-form");
        const loginMessage = document.getElementById("login-message");

        formLogin.addEventListener("submit", async (e) => {
            e.preventDefault();
            loginMessage.textContent = '';

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                await login({email, password});
                window.location.hash = "#/";
            }catch (error) {
                loginMessage.textContent = `Login Failed: ${error.message}`;
                loginMessage.style.color = "red";
            }
        });
    }
};
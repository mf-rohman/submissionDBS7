import HomePage from "../pages/home/home-page";
import AboutPage from "../pages/about/about-page";
import RegisterPage from "../pages/register/register-page";
import LoginPage from "../pages/login/login-page";
import CreatePage from "../pages/create-story/create-story";

const routes = {
  "/": new HomePage(),
  "/about": new AboutPage(),
  "/register": new RegisterPage(),
  "/login": new LoginPage(),
  "/create": new CreatePage(),
};

export default routes;

import HomePage from "../pages/home/home-page";
import AboutPage from "../pages/about/about-page";
import RegisterPage from "../pages/register/register-page";
import LoginPage from "../pages/login/login-page";
import CreatePage from "../pages/create-story/addStory-page";
import DetailPage from "../pages/detail-story/detail-page";

const routes = {
  "/": new HomePage(),
  "/about": new AboutPage(),
  "/register": new RegisterPage(),
  "/login": new LoginPage(),
  "/create": new CreatePage(),
  "/detail/:id": new DetailPage(),
};

export default routes;

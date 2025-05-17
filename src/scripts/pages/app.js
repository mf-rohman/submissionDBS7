import NotFoundPage from "./notFound/notfound-page";
import routes from "../routes/routes";
import { getActiveRoute } from "../routes/url-parser";

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this.#setupDrawer();
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener("click", () => {
      this.#navigationDrawer.classList.toggle("open");
    });

    document.body.addEventListener("click", (event) => {
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target)
      ) {
        this.#navigationDrawer.classList.remove("open");
      }

      this.#navigationDrawer.querySelectorAll("a").forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove("open");
        }
      });
    });
  }

  async renderPage() {
    const url = getActiveRoute();
    const token = localStorage.getItem("token");

    if (!token && url !== "/register" && url !== "/login") {
      window.location.hash = "#/register";
      return;
    }

    const page = routes[url] || new NotFoundPage();
    console.log("Page: ", page);

    if (document.startViewTransition) {
      await new Promise((resolve) => {
        document.startViewTransition(async () => {
          this.#content.innerHTML = await page.render();
          if (page.afterRender) await page.afterRender();
          resolve();
        });
      });
    } else {
      this.#content.innerHTML = await page.render();
      if (page.afterRender) await page.afterRender();
    }
  }
}

export default App;

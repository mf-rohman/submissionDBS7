import "../../../styles/about-page.css";
import AboutPresenter from "./about-presenter.js";


export default class AboutPage {
  constructor() {
    this.presenter = new AboutPresenter();
  }

  async render() {
    return await this.presenter.init();
  }

  async afterRender() {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          if (
            entry.target.classList.contains("slide-in-right") ||
            entry.target.classList.contains("slide-in-left")
          ) {
            entry.target.style.transform = "translateX(0)";
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document
      .querySelectorAll(".fade-in, .slide-in-right, .slide-in-left")
      .forEach((el) => observer.observe(el));

    const featureItems = document.querySelectorAll(".feature-item");
    featureItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        item.style.transform = "translateX(10px)";
      });
      item.addEventListener("mouseleave", () => {
        item.style.transform = "translateX(0)";
      });
    });
  }
  
}


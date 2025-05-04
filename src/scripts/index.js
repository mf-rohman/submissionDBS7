// CSS imports
import "../styles/styles.css";
import "../styles/skip-content.css";
import "../styles/particle-style.css";

import App from "./pages/app";
import handleLogout from "./handle-logout";
import { initParticleBackground } from "./particle-control";
import nameBrand from "./pages/brand-name";

document.addEventListener("DOMContentLoaded", async () => {
  const app = new App({
    content: document.querySelector("#main-content"),
    drawerButton: document.querySelector("#drawer-button"),
    navigationDrawer: document.querySelector("#navigation-drawer"),
  });
  await app.renderPage();
  initParticleBackground("bg-canvas-particle");

  window.addEventListener("hashchange", async () => {
    await app.renderPage();
  });
  nameBrand();
});
window.handleLogout = handleLogout;

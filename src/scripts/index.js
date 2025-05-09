// CSS imports
import "../styles/styles.css";
import "../styles/skip-content.css";
import "../styles/particle-style.css";

import App from "./pages/app";
import handleLogout from "./handle-logout";
import { initParticleBackground } from "./particle-control";
import nameBrand from "./pages/brand-name";
import handleSkipToContent from "./handleSkipToContent";
import stopAllCamera from "./handleCamera";
import AddStoryView from "./pages/create-story/addStory-view";

document.addEventListener("DOMContentLoaded", async () => {
  const app = new App({
    content: document.querySelector("#main-content"),
    drawerButton: document.querySelector("#drawer-button"),
    navigationDrawer: document.querySelector("#navigation-drawer"),
  });
  await app.renderPage();
  initParticleBackground("bg-canvas-particle");

  window.addEventListener("hashchange", async () => {
    stopAllCamera();
    await app.renderPage();
  });
  nameBrand();
  handleSkipToContent();
});
window.handleLogout = handleLogout;
window.handleSkipToContent = handleSkipToContent;

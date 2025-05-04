import "../styles/loader.css";

const loader = document.getElementById("loader-overlay");
const mainContent = document.getElementById("main-content");
let loaderInterval = null;

export function fetchLoader() {
  loader.style.display = "flex";
  document.body.classList.add("blur-active");
  mainContent.style.display = "none";
  const loaderElement = document.querySelector(".loader");

  if (loaderInterval) clearInterval(loaderInterval);

  loaderInterval = setInterval(() => {
    const first = loaderElement.firstElementChild;
    loaderElement.appendChild(first);
  }, 50);
}

export function stopLoader() {
  clearInterval(loaderInterval);
  loaderInterval = null;

  setTimeout(() => {
      loader.style.display = "none";
      document.body.classList.remove("blur-active");
      mainContent.style.display = "";
  }, 3000);
}

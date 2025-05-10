export default function handleSkipToContent() {
  const skipLink = document.querySelector("#skip-to-content");
  skipLink.addEventListener("click", (e) => {
    e.preventDefault();
    const path = window.location.hash;
    console.log({path});
    console.log({windowLocation: window.location.hash});
    
    
    let targetId = "story-list";
    if (path === "#/about") {
      targetId = "about-me";
    } else if (path === "#/create") {
      targetId = "create-page";
    }

    const target = document.getElementById(targetId);
    if (target) {
      target.setAttribute("tabindex", "-1");
      target.focus();
    }
  });
}

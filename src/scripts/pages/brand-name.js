export default function nameBrand() {
  const userBrandName = document.getElementById("brand-name");
  const usernameActive = localStorage.getItem("userName");

  userBrandName.textContent = usernameActive
    ? `おはよう ${usernameActive}!`
    : "APP";
}

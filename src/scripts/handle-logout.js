import nameBrand from "./pages/brand-name";
import { initSubscribeButton } from "./utils/handleSubscribe";

export default function handleLogout() {
  const usernameActive = localStorage.getItem("userName");
  if (
    confirm(`Do you really go away from this Isekai Wahai ${usernameActive}?`)
  ) {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    initSubscribeButton();
    nameBrand();
    window.location.hash = "#/login";
  }
}

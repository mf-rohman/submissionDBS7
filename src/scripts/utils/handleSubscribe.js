import { subscribeWebPush, unsubscribeWebPush } from "../data/api";
import urlBase64ToUint8Array from "./vapidConverter";
import { CONFIG } from "../config";

let currentSubscription = null;

export async function initSubscribeButton({
  containerId = "subscribeContainer",
  buttonId = "subscribeBtn",
} = {}) {
  const keyToken = localStorage.getItem("token");
  const container = document.getElementById(containerId);
  const button = document.getElementById(buttonId);

  if (!keyToken || !("serviceWorker" in navigator)) {
    container?.remove();
    return;
  }

  const registration = await navigator.serviceWorker.ready;
  const existingSubscription = await registration.pushManager.getSubscription();

  if (existingSubscription) {
    currentSubscription = existingSubscription;
    button.textContent = "🔕 Unsubscribe";
  } else {
    button.textContent = "🔔 Subscribe";
  }

  container.style.display = "block";
  button.addEventListener("click", async () => {
    try {
      if (currentSubscription) {
        const endpoint = currentSubscription.endpoint;
        await unsubscribeWebPush(endpoint);
        await currentSubscription.unsubscribe();
        currentSubscription = "";
        button.textContent = "🔔 Subscribe";
        alert("❎ Berhasil unsubscribe.");
      } else {
        const newSubscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(CONFIG.PUBLIC_VAPID_KEY),
        });
        console.log({CONFIG} );

        const endpoint = newSubscription.endpoint;
        const p256dh = btoa(
          String.fromCharCode(
            ...new Uint8Array(newSubscription.getKey("p256dh"))
          )
        );
        const auth = btoa(
          String.fromCharCode(...new Uint8Array(newSubscription.getKey("auth")))
        );

        await subscribeWebPush({ endpoint, p256dh, auth });

        currentSubscription = newSubscription;
        button.textContent = "🔕 Unsubscribe";
        alert("✅ Berhasil subscribe!");
      }
    } catch (error) {
      alert("❌ Error: " + error.message);
      console.error("Subscription error:", error);
    }
  });
}

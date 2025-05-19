const CACHE_NAME = "my-eg-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles/styles.css",
  "/styles/about-page.css",
  "/styles/create-story-page.css",
  "/styles/home-page.css",
  "/styles/loader.css",
  "/styles/login-page.css",
  "/styles/register-page.css",
  "/styles/skip-content.css",
  "/scripts/index.js",
  "/images/my-logo.png",
  "/images/my-logo-192.png",
  "/images/marker.svg",
  "/pages/home/home-page.js",
  "/pages/home/home-model.js",
  "/pages/home/home-view.js",
  "/pages/home/home-presenter.js",
  "/data/api.js",
  "/data/indexDB/save-story.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Jangan tangani permintaan ke domain luar (contoh: OpenStreetMap)
  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// self.addEventListener("push", function (event) {
//   console.log("[Service Worker] Push Received.");
//   const data = event.data?.json() || {};

//   const title = data.title || "Push Default Title";
//   const options = {
//     body: data.body || "Isi body default",
//     icon: "/images/kana-logo192.png",
//     requireInteraction: true,
//     vibrate: [200, 100, 200],
//     tag: "push-test",
//   };

//   event.waitUntil(self.registration.showNotification(title, options));
// });

// self.addEventListener("message", (event) => {
//   if (event.data?.type === "simulate-push") {
//     const { title, body } = event.data.data;

//     console.log("[Service Worker] Simulate push message");

//     self.registration.showNotification(title || "Tes Default", {
//       body: body || "Pesan dari simulasi",
//       requireInteraction: true,
//     });
//   }
// });

self.addEventListener("push", (event) => {
  console.log("Service worker received a push message");

  let title = "Notification";
  let body = "There is a new notification";

  if (event.data) {
    try {
      const data = event.data.json();
      console.log("Push data:", data);
      title = data.title || title;
      body = data.body || body;
    } catch (e) {
      console.error("Failed to parse push payload:", e);
      body = event.data.text();
    }
  }

  const options = {
    body: body,
    icon: "/images/my-logo-192.png",
    requireInteraction: true,
    tag: "test-notif",
    renotify: true,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SHOW_NOTIFICATION") {
    const { title, body } = event.data.data || {};
    const options = {
      body: body || "Default body",
      icon: "/images/my-logo-192.png",
      requireInteraction: true,
      tag: "simulated-notif",
      renotify: true,
    };

    self.registration.showNotification(
      title || "Simulated Notification",
      options
    );
  }
});

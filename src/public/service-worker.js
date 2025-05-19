const CACHE_NAME = "my-eg-v1";
const urlsToCache = [
  "/",
  "./package-lock.json",
  "./package.json",
  "./src",
  "./src/index.html",
  "./src/public",
  "./src/public/favicon.png",
  "./src/public/images",
  "./src/public/images/kana-logo.png",
  "./src/public/images/kana-logo192.png",
  "./src/public/images/kana-logo512.png",
  "./src/public/images/logo.png",
  "./src/public/images/marker.svg",
  "./src/public/images/me.jpeg",
  "./src/public/images/mine.gif",
  "./src/public/images/mine1.gif",
  "./src/public/images/mine2.mp4",
  "./src/public/images/my-logo-192.png",
  "./src/public/images/my-logo.png",
  "./src/public/images/ssDesktop.png",
  "./src/public/manifest.json",
  "./src/public/service-worker.js",
  "./src/scripts",
  "./src/scripts/config.js",
  "./src/scripts/data",
  "./src/scripts/data/api.js",
  "./src/scripts/data/indexDB",
  "./src/scripts/data/indexDB/save-story.js",
  "./src/scripts/handle-logout.js",
  "./src/scripts/handleCamera.js",
  "./src/scripts/handleSkipToContent.js",
  "./src/scripts/index.js",
  "./src/scripts/loader-animation.js",
  "./src/scripts/pages",
  "./src/scripts/pages/about",
  "./src/scripts/pages/about/about-model.js",
  "./src/scripts/pages/about/about-page.js",
  "./src/scripts/pages/about/about-presenter.js",
  "./src/scripts/pages/about/about-view.js",
  "./src/scripts/pages/app.js",
  "./src/scripts/pages/brand-name.js",
  "./src/scripts/pages/create-story",
  "./src/scripts/pages/create-story/addStory-model.js",
  "./src/scripts/pages/create-story/addStory-page.js",
  "./src/scripts/pages/create-story/addStory-view.js",
  "./src/scripts/pages/create-story/addStroy-presenter.js",
  "./src/scripts/pages/detail-story",
  "./src/scripts/pages/detail-story/detail-model.js",
  "./src/scripts/pages/detail-story/detail-page.js",
  "./src/scripts/pages/detail-story/detail-presenter.js",
  "./src/scripts/pages/detail-story/detail-view.js",
  "./src/scripts/pages/home",
  "./src/scripts/pages/home/home-model.js",
  "./src/scripts/pages/home/home-page.js",
  "./src/scripts/pages/home/home-presenter.js",
  "./src/scripts/pages/home/home-view.js",
  "./src/scripts/pages/login",
  "./src/scripts/pages/login/login-model.js",
  "./src/scripts/pages/login/login-page.js",
  "./src/scripts/pages/login/login-presenter.js",
  "./src/scripts/pages/login/login-view.js",
  "./src/scripts/pages/not-found",
  "./src/scripts/pages/not-found/notfound-model.js",
  "./src/scripts/pages/not-found/notfound-page.js",
  "./src/scripts/pages/not-found/notfound-presenter.js",
  "./src/scripts/pages/not-found/notfound-view.js",
  "./src/scripts/pages/register",
  "./src/scripts/pages/register/register-model.js",
  "./src/scripts/pages/register/register-page.js",
  "./src/scripts/pages/register/register-presenter.js",
  "./src/scripts/pages/register/register-view.js",
  "./src/scripts/particle-control.js",
  "./src/scripts/routes",
  "./src/scripts/routes/routes.js",
  "./src/scripts/routes/url-parser.js",
  "./src/scripts/utils",
  "./src/scripts/utils/handleSubscribe.js",
  "./src/scripts/utils/index.js",
  "./src/scripts/utils/vapidConverter.js",
  "./src/styles",
  "./src/styles/about-page.css",
  "./src/styles/create-story-page.css",
  "./src/styles/home-page.css",
  "./src/styles/loader.css",
  "./src/styles/login-page.css",
  "./src/styles/not-found.css",
  "./src/styles/particle-style.css",
  "./src/styles/register-page.css",
  "./src/styles/skip-content.css",
  "./src/styles/styles.css",
  "./STUDENT.txt",
  "./submissionDBS7.zip",
  "./vite.config.js",
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

const CACHE_NAME = "my-eg-v1";
const urlsToCache = [
  "./dist/assets/index-DjohdyQl.css",
  "./dist/assets/index-DPOHSM31.css",
  "./dist/index.html",
  "./dist/images/kana-logo.png",
  "./dist/images/kana-logo192.png",
  "./dist/images/kana-logo512.png",
  "./dist/images/logo.png",
  "./dist/images/marker.svg",
  "./dist/images/me.jpeg",
  "./dist/images/mine.gif",
  "./dist/images/mine1.gif",
  "./dist/images/my-logo-192.png",
  "./dist/images/my-logo.png",
  "./dist/images/ssDesktop.png",
  "./dist/manifest.json",
  "./dist/service-worker.js",
  "./src/public/favicon.png",
  "./src/public/images/kana-logo.png",
  "./src/public/images/kana-logo192.png",
  "./src/public/images/kana-logo512.png",
  "./src/public/images/logo.png",
  "./src/public/images/marker.svg",
  "./src/public/images/me.jpeg",
  "./src/public/images/mine.gif",
  "./src/public/images/mine1.gif",
  "./src/public/images/my-logo-192.png",
  "./src/public/images/my-logo.png",
  "./src/public/images/ssDesktop.png",
  "./src/public/manifest.json",
  "./src/public/service-worker.js",
  "./src/scripts/config.js",
  "./src/scripts/data/api.js",
  "./src/scripts/data/indexDB/save-story.js",
  "./src/scripts/handle-logout.js",
  "./src/scripts/handleCamera.js",
  "./src/scripts/handleSkipToContent.js",
  "./src/scripts/index.js",
  "./src/scripts/loader-animation.js",
  "./src/scripts/pages/about/about-model.js",
  "./src/scripts/pages/about/about-page.js",
  "./src/scripts/pages/about/about-presenter.js",
  "./src/scripts/pages/about/about-view.js",
  "./src/scripts/pages/app.js",
  "./src/scripts/pages/brand-name.js",
  "./src/scripts/pages/create-story/addStory-model.js",
  "./src/scripts/pages/create-story/addStory-page.js",
  "./src/scripts/pages/create-story/addStory-view.js",
  "./src/scripts/pages/create-story/addStroy-presenter.js",
  "./src/scripts/pages/detail-story/detail-model.js",
  "./src/scripts/pages/detail-story/detail-page.js",
  "./src/scripts/pages/detail-story/detail-presenter.js",
  "./src/scripts/pages/detail-story/detail-view.js",
  "./src/scripts/pages/home/home-model.js",
  "./src/scripts/pages/home/home-page.js",
  "./src/scripts/pages/home/home-presenter.js",
  "./src/scripts/pages/home/home-view.js",
  "./src/scripts/pages/login/login-model.js",
  "./src/scripts/pages/login/login-page.js",
  "./src/scripts/pages/login/login-presenter.js",
  "./src/scripts/pages/login/login-view.js",
  "./src/scripts/pages/not-found/notfound-model.js",
  "./src/scripts/pages/not-found/notfound-page.js",
  "./src/scripts/pages/not-found/notfound-presenter.js",
  "./src/scripts/pages/not-found/notfound-view.js",
  "./src/scripts/pages/register/register-model.js",
  "./src/scripts/pages/register/register-page.js",
  "./src/scripts/pages/register/register-presenter.js",
  "./src/scripts/pages/register/register-view.js",
  "./src/scripts/particle-control.js",
  "./src/scripts/routes/routes.js",
  "./src/scripts/routes/url-parser.js",
  "./src/scripts/utils/handleSubscribe.js",
  "./src/scripts/utils/index.js",
  "./src/scripts/utils/vapidConverter.js",
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
  const url = new URL(event.request.url);
  if (url.origin === location.origin) {
    if (event.request.destination === "document") {
      event.respondWith(
        caches.match(event.request).then((response) => {
          return response || fetch(event.request);
        })
      );
    }
  }
  // event.respondWith(
  //   caches.match(event.request).then((response) => {
  //     return response || fetch(event.request);
  //   })
  // );
});

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

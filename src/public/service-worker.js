const CACHE_NAME = 'my-eg-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/styles.css',
  '/styles/about-page.css',
  '/styles/create-story-page.css',
  '/styles/home-page.css',
  '/styles/loader.css',
  '/styles/login-page.css',
  '/styles/register-page.css',
  '/styles/skip-content.css',
  '/scripts/index.js',
  '/images/my-logo.png',
  '/images/my-logo-192.png',
  '/images/marker.svg',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
})
let dataCacheName = 'greenScreenData-v1';
let cacheName = 'greenScreenPWA-1';
let filesToCache = [
  '/',
  '/index.html',
  '/assets/img/Screen01.png',
  '/assets/img/Screen02.png',
  '/assets/img/Screen03.png',
  '/assets/css/app.css',
  '/assets/js/app.js'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          if (key !== cacheName && key !== dataCacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  // var dataUrl = 'https://query.yahooapis.com/v1/public/yql';

  /*
    * The app is asking for app shell files. In this scenario the app uses the
    * "Cache, falling back to the network" offline strategy:
    * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
    */
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

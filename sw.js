const CACHE_NAME = 'time-for-tea-v1';
const urlsToCache = [
  '/time-for-tea/',
  '/time-for-tea/index.html',
  '/time-for-tea/manifest.json',
  '/time-for-tea/icon-192x192.png',
  '/time-for-tea/icon-512x512.png',
  'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js'
];

// Install Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch Event
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate Service Worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

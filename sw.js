self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('greenbite-v1').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './styles.css',
        './scripts/common.js',
        './assets/logo.svg',
        './assets/hero.svg'
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});

const CACHE = 'med-timer-push-test-v2';
const FILES = [
  './',
  './index.html',
  './config.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();

    await Promise.all(
      keys
        .filter(k => k !== CACHE)
        .map(k => caches.delete(k))
    );

    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith((async () => {
    try {
      const fresh = await fetch(event.request);
      const cache = await caches.open(CACHE);

      cache.put(
        event.request,
        fresh.clone()
      ).catch(() => {});

      return fresh;
    } catch (_) {
      return (
        (await caches.match(event.request)) ||
        (await caches.match('./index.html'))
      );
    }
  })());
});

self.addEventListener('push', event => {
  let data = {};

  try {
    data = event.data
      ? event.data.json()
      : {};
  } catch (_) {
    data = {
      title: 'Medication Timer',
      body: event.data
        ? event.data.text()
        : 'Medication reminder'
    };
  }

  const title =
    data.title ||
    'Medication Timer';

  const options = {
    body:
      data.body ||
      'Medication reminder',

    icon:
      './icon-192.png',

    badge:
      './icon-192.png',

    tag:
      data.tag ||
      'med-reminder',

    renotify: true,

    // Request an audible/non-silent notification.
    // The phone's notification settings still have final control.
    silent: false,

    // Android vibration pattern:
    // vibrate 400ms, pause 200ms, vibrate 400ms,
    // pause 200ms, vibrate 700ms.
    vibrate: [
      400,
      200,
      400,
      200,
      700
    ],

    // Keep the alert visible until acted on where supported.
    requireInteraction: true,

    data: {
      url: self.registration.scope
    }
  };

  event.waitUntil(
    self.registration.showNotification(
      title,
      options
    )
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  event.waitUntil((async () => {
    const all = await clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    });

    for (const client of all) {
      if ('focus' in client) {
        return client.focus();
      }
    }

    if (clients.openWindow) {
      return clients.openWindow(
        self.registration.scope
      );
    }
  })());
});
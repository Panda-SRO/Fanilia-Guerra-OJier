/* Service Worker — Workshop Castillo Ojier PWA */
const CACHE = 'wco-v1';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Deja pasar a la red todo lo que no sea de nuestro propio dominio
  // (Firebase, Google Fonts, jsPDF, etc. siempre por red).
  if (url.origin !== location.origin) return;

  // Navegaciones: red primero, con respaldo a la copia guardada (para abrir sin internet).
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((r) => { const cp = r.clone(); caches.open(CACHE).then((c) => c.put('./index.html', cp)); return r; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Otros archivos propios: caché primero, luego red.
  e.respondWith(
    caches.match(req).then((c) => c || fetch(req).then((r) => {
      const cp = r.clone(); caches.open(CACHE).then((cc) => cc.put(req, cp)); return r;
    })).catch(() => caches.match('./index.html'))
  );
});

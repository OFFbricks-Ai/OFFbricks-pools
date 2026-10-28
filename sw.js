// Service worker do Pool Monitor: guarda a app no dispositivo para abrir sem internet.
// Ao publicar uma nova versão da app, aumente este número (v1 → v2) para forçar a atualização.
const CACHE = 'pool-monitor-v1';
const FILES = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Cache primeiro (abre logo, mesmo offline) e atualiza em segundo plano: a nova versão aparece na abertura seguinte.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(req, { ignoreSearch: true });
    const net = fetch(req)
      .then(res => { if (res && res.ok) c.put(req, res.clone()); return res; })
      .catch(async () => hit || (req.mode === 'navigate' ? c.match('./index.html') : undefined) || Response.error());
    return hit || net;
  }));
});

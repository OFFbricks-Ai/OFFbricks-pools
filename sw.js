// Service worker do Pool Monitor: guarda a app no dispositivo para abrir sem internet.
// A versão é preenchida automaticamente ao gerar o pacote; cada versão nova muda este ficheiro e, com isso, é instalada.
const VERSION = 'V4.6';
const CACHE = 'pool-monitor-' + VERSION;
const FILES = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png'];

self.addEventListener('install', e => {
  // cache: 'reload' garante que se descarrega a versão nova do servidor, e não uma cópia antiga da cache HTTP
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Cache primeiro (abre logo, mesmo offline) e atualiza em segundo plano.
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  if (url.pathname.endsWith('/version.json')) return;   // a versão publicada vem sempre da rede
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(req, { ignoreSearch: true });
    const net = fetch(req)
      .then(res => { if (res && res.ok) c.put(req, res.clone()); return res; })
      .catch(async () => hit || (req.mode === 'navigate' ? c.match('./index.html') : undefined) || Response.error());
    return hit || net;
  }));
});

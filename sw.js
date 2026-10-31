// 深入淺出日語: offline support. Bump VERSION when you ship (new chapter, edited book.js/style.css) so old caches are dropped.
// tools/check.mjs fails if a file in ch/ is missing from PRECACHE.
const VERSION = 'v24';
const CACHE = 'hfj-' + VERSION;
const PRECACHE = [
  './', 'index.html', 'style.css', 'book.js', 'manifest.webmanifest',
  'assets/cover.jpg', 'assets/icon-192.png', 'assets/icon-512.png', 'assets/apple-touch-icon.png',
  'ch/00-intro.html', 'ch/01-hiragana.html', 'ch/02-katakana.html', 'ch/03-desu.html', 'ch/04-kanji.html',
  'ch/05-particles.html', 'ch/06-masu.html', 'ch/07-adjectives.html', 'ch/08-numbers.html', 'ch/09-te-form.html',
  'ch/10-aru-iru.html', 'ch/11-plain-form.html', 'ch/12-potential.html', 'ch/13-giving.html', 'ch/14-conditionals.html',
  'ch/15-volitional.html', 'ch/16-helpers.html', 'ch/17-passive-causative.html', 'ch/18-keigo-basics.html',
  'ch/19-noun-modifiers.html',
  'ch/20-seems.html',
  'ch/21-hazu-wake-beki.html',
  'ch/22-keigo.html',
  'ch/23-reading-n3.html',
  'ch/24-listening-n3.html',
  'ch/p3-check.html',
  'ch/p1-check.html', 'ch/p2-check.html',
  'ch/25-n2-grammar.html',
  'ch/30-n1-grammar.html',
  'ch/26-written-style.html',
  'ch/31-n1-vocab.html',
  'ch/27-onomatopoeia.html',
  'ch/32-editorials.html',
  'ch/28-business.html',
  'ch/33-listening-speed.html',
  'ch/29-long-reading.html',
  'ch/p4-check.html',
  'ch/34-mock-exam.html',
];

self.addEventListener('install', e => {
  // cache: 'reload' skips the HTTP cache so a stale copy is never precached
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('hfj-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

const save = (req, res) => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; };

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (!/^https?:$/.test(url.protocol)) return;

  if (req.mode === 'navigate') {   // pages: newest when online, cached copy when not
    e.respondWith(fetch(req).then(res => save(req, res))
      .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('index.html'))));
    return;
  }
  if (url.origin === location.origin) {   // css/js/images: cached copy now, refreshed in the background
    e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => {
      const net = fetch(req).then(res => save(req, res)).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  // cross-origin (Google Fonts): cache-first, filled the first time they load online
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => save(req, res))));
});

/* Service Worker —— 个人工具箱离线缓存
   缓存应用外壳（同源文件），让安装到主屏幕后可离线运行。
   CDN 资源（Chart.js、字体）会尝试缓存，离线取不到时应用本身有降级方案。 */
const CACHE = 'toolbox-v2';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).catch(()=>{}).then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  // 同源：缓存优先，回退网络并写入缓存
  if (new URL(req.url).origin === self.location.origin) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{});
        return res;
      }).catch(() => caches.match('./index.html')))
    );
    return;
  }
  // 跨源（CDN 字体/Chart.js）：网络优先，成功则缓存，失败回退缓存
  e.respondWith(
    fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{});
      return res;
    }).catch(() => caches.match(req))
  );
});

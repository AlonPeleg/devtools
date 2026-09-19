/* Dev Toolkit service worker.
   It exists so Chrome and Edge offer "Install app". It deliberately caches NOTHING, so it can never serve a
   stale copy of a page: every page load goes straight to the network, exactly as without a service worker.
   The only thing it adds is a small friendly page when you open the app with no internet connection. */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (event) { event.waitUntil(self.clients.claim()); });

self.addEventListener('fetch', function (event) {
  if (event.request.mode !== 'navigate') return;   // scripts, styles, fonts, images and CDN files are left alone
  event.respondWith(
    fetch(event.request).catch(function () {
      return new Response(
        '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
        '<title>Dev Toolkit is offline</title>' +
        '<body style="margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#1e1e1e;color:#ccc;font:15px/1.5 system-ui,sans-serif;text-align:center">' +
        '<div style="max-width:28rem;padding:1.5rem"><h1 style="color:#fff;font-size:1.25rem;margin:0 0 .5rem">You’re offline</h1>' +
        '<p style="margin:0">Dev Toolkit needs an internet connection to load. Reconnect and reload. Your saved files are still stored on this device.</p></div>',
        { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    })
  );
});

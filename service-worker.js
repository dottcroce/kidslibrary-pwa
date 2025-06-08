self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("kidslibrary-cache").then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./style.css",
        "./main.js",
        "./form_libri_letti.js",
        "./aggiungi_libro_letto.html",
        "./manifest.json"
      ]);
    })
  );
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

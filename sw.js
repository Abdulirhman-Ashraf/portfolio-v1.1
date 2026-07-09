const cacheName = "Portfolio-v2";
const assets = [
  "/",
  "/index.html",
  "/about.html",
  "/contact.html",
  "/projects.html",
  "/style/style.css",
  "/style/all.min.css",
  "/webfonts/fa-solid-900.woff2",
  "/webfonts/fa-solid-900.ttf",
  "/webfonts/fa-regular-400.woff2",
  "/webfonts/fa-regular-400.ttf",
  "/webfonts/fa-brands-400.woff2",
  "/webfonts/fa-brands-400.ttf",
  "/js/master.js",
  "/imags/android/launchericon-48x48.png",
  "/imags/android/launchericon-72x72.png",
  "/imags/android/launchericon-96x96.png",
  "/imags/android/launchericon-144x144.png",
  "/imags/android/launchericon-192x192.png",
  "/imags/android/launchericon-512x512.png",
  "/imags/quiz.png",
  "/imags/my.png",
  "/imags/site.png",
  "/imags/step.png",
  "/imags/todo.png",
  "/imags/simple-icons--axios.svg",
  "/imags/selfhst--firebase.svg",
  "/imags/logos--pwa.svg",
  "/imags/weather.png",
  "/manifest.json",
  "https://unpkg.com/aos@2.3.1/dist/aos.css",
  "https://unpkg.com/aos@2.3.1/dist/aos.js",
];
// store data from server to cache store
self.addEventListener("install", (e) => {
  // plz wait until my code end then start
  e.waitUntil(
    // make folder with my cache
    caches
      .open(cacheName)
      // store my assets in this folder
      .then((cache) => {
        self.skipWaiting();

        return cache.addAll(assets);
      })
      .catch((err) => console.log("Error", err)),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key != cacheName)
          .map((key) => caches.delete(key)),
      );
    }).then(() => {
      return self.clients.claim(); 
    })
  );
});

// fetch data s.w pov
self.addEventListener("fetch", (e) => {
  // wait! wait! browser,i will do that
  e.respondWith(
    // so let's see if i have your request
    caches
      .match(e.request)
      // yes yes here you are
      .then(
        (res) =>
          res ||
          // iam sorry let ask server
          fetch(e.request),
      ),
  );
});

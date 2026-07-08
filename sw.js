const cacheName = "Portfolio";
const assets = [
  "/",
  "/index.html",
  "/about.html",
  "/contact.html",
  "/projects.html",
  "/style/style.css",
  "/style/all.min.css",
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
      return cache.addAll(assets);
      })
      .catch((err) => console.log("Error", err)),
  );
});

self.addEventListener("activate", (e) => {
  // plz wait until success my promise
  e.waitUntil(
    // Give me all caches
    caches.keys().then((keys) => {
      // wait all
      return Promise.all(
        // where is my elders sons ?
        keys
          .filter((key) => key != cacheName)
          //goodbey, i love only your youngsters
          .map((key) => caches.delete(key)),
      );
    }),
  );
});

// fetch data s.w pov
self.addEventListener("fetch", (e) => {
    // wait! wait! browser,i will do that 
  e.respondWith(
    // so let's see if i have your request
    caches.match(e.request)
    // yes yes here you are
    .then((res) => res || 
    // iam sorry let ask server
    fetch(e.request)));
});

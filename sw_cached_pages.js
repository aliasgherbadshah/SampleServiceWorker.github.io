// this service worker file only loads the static files and states individually included in cacheAssets array

const cacheName = "v1";
const cacheAssets = [
    './index.html'
]

// install service worker

self.addEventListener("install", (e) => {
    console.log("Service wroker: installed")
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log("Service worker: Caching files")
                cache.addAll(cacheAssets)
            })
            .then(() => self.skipWaiting())
    )
})


// Call activate event

self.addEventListener("activate", (e) => {
    console.log("Service wroker: Activated")

    // Deleting old and unwanted cache
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service worker: Clearing Old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
})

// Call fetch event

self.addEventListener('fetch', (e) => {
    console.log('Service worker: Fetching Data');
    e.respondWith(
        fetch(e.request)
            .catch(() => caches.match(e.request))
    )
})
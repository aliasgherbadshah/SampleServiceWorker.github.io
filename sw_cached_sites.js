// this service worker cache all the response of the sites beside caching files and assets individually

const cacheName = "v2";

// install service worker

self.addEventListener("install", (e) => {
    console.log("Service wroker: installed")
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
            .then(res => {
                // Make copy/clone of response
                const resClone = res.clone();
                caches
                    .open(cacheName)
                    .then(cache => {
                        console.log("Service worker: Caching files")
                        cache.put(e.request, resClone)
                    })
                return res
            })
            .catch(err => caches.match(e.request).then(res => res))
    )
})
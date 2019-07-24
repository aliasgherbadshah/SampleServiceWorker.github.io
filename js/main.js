//check service worker and then ragister it

if (navigator.serviceWorker) {
    console.log("Servicde wroker available");
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register('../sw_cached_sites.js')
            .then(res => console.log("Service worker: ragister succefully"))
            .catch(err=>console.log("Service wroker: error: "+err))
    })
}
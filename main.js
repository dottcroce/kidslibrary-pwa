// Script principale della homepage
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => console.log("Service worker registrato", reg))
    .catch(err => console.error("Errore SW:", err));
}

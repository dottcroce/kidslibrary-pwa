function aggiungiLibroLetto() {
  alert("Qui potrai inserire i libri letti");
}
function aggiungiLibroScritto() {
  alert("Qui potrai inserire i libri scritti");
}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => console.log("SW registrato", reg))
    .catch(err => console.error("SW errore", err));
}

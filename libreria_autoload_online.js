document.addEventListener("DOMContentLoaded", () => {
  caricaDaRemoto().then(() => mostraLibreria());
});

async function caricaDaRemoto() {
  try {
    const response = await fetch("https://dottcroce.github.io/kidslibrary-pwa/libri_letti.json");
    const dati = await response.json();
    if (Array.isArray(dati)) {
      localStorage.setItem("libriLetti", JSON.stringify(dati));
      console.log("📥 Libri caricati da file online");
    }
  } catch (error) {
    console.error("⚠️ Errore nel caricamento da file remoto:", error);
  }
}

function mostraLibreria() {
  const libreria = JSON.parse(localStorage.getItem("libriLetti")) || [];
  const contenitore = document.getElementById("libreria");
  contenitore.innerHTML = "";

  libreria.forEach((libro, index) => {
    const img = document.createElement("img");
    img.src = libro.copertina;
    img.alt = libro.titolo;
    img.classList.add("copertinaHome");
    img.onclick = () => mostraScheda(libro, index);
    contenitore.appendChild(img);
  });
}

function mostraScheda(libro, index) {
  const scheda = document.getElementById("schedaLibro");
  scheda.innerHTML = `
    <h3>${libro.titolo}</h3>
    <img src="${libro.copertina}" alt="Copertina libro">
    <p><strong>Autore:</strong> ${libro.autori}</p>
    <p><strong>Anno pubblicazione:</strong> ${libro.annoPubblicazione}</p>
    <p><strong>Genere:</strong> ${libro.genere}</p>
    <p><strong>Anno letto:</strong> ${libro.annoLetto}</p>
    <p><strong>Valutazione:</strong> ${libro.valutazione} ⭐</p>
    <p><strong>Commento:</strong> ${libro.commento}</p>
  `;
}

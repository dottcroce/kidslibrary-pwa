
document.addEventListener("DOMContentLoaded", () => {
  // Skip autoload if canceled by user
  if (localStorage.getItem("skipAutoload") === "true") {
    console.log("⛔ Skip autoload: user cleared library");
    mostraLibreria();
    return;
  }
  const raw = localStorage.getItem("libriLetti");
  let esistenti = null;
  try {
    esistenti = JSON.parse(raw);
  } catch (e) {}

  if (!raw || !Array.isArray(esistenti) || esistenti.length === 0) {
    console.log("📡 Libreria non presente o vuota, carico da remoto...");
    caricaDaRemoto().then(() => mostraLibreria());
  } else {
    console.log("✅ Libreria trovata nel localStorage");
    mostraLibreria();
  }
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

  if (libreria.length === 0) {
    contenitore.innerHTML = "<p style='text-align:center;'>📭 Nessun libro presente</p>";
    return;
  }

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
    <div class="scheda">
      <h3>${libro.titolo}</h3>
      <img src="${libro.copertina}" alt="${libro.titolo}">
      <p><strong>Autore:</strong> ${libro.autore}</p>
      <p><strong>Anno:</strong> ${libro.anno}</p>
      <p><strong>Genere:</strong> ${libro.genere}</p>
      <p><strong>Valutazione:</strong> ${"⭐".repeat(libro.valutazione || 0)}</p>
      <p><strong>Commento:</strong> ${libro.commento}</p>
    </div>
  `;
}

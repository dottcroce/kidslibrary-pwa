document.addEventListener("DOMContentLoaded", () => {
  mostraLibreria();

  document.getElementById("importaFile").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const dati = JSON.parse(e.target.result);
        if (Array.isArray(dati)) {
          localStorage.setItem("libriLetti", JSON.stringify(dati));
          alert("Libreria importata con successo!");
          location.reload();
        }
      } catch {
        alert("Errore nel file JSON.");
      }
    };
    reader.readAsText(file);
  });
});

function mostraLibreria() {
  const libreria = JSON.parse(localStorage.getItem("libriLetti")) || [];
  const contenitore = document.getElementById("libreria");
  contenitore.innerHTML = "";

  libreria.forEach((libro, index) => {
    const img = document.createElement("img");
    img.src = libro.copertina;
    img.alt = libro.titolo;
    img.classList.add("copertina");
    img.onclick = () => mostraScheda(libro, index);
    contenitore.appendChild(img);
  });
}

function mostraScheda(libro, index) {
  const div = document.getElementById("schedaLibro");
  div.innerHTML = `
    <h3>${libro.titolo}</h3>
    <p><strong>Autore:</strong> ${libro.autori}</p>
    <p><strong>Anno pubblicazione:</strong> ${libro.annoPubblicazione}</p>
    <p><strong>Genere:</strong> ${libro.genere}</p>
    <p><strong>Anno letto:</strong> <input type="number" id="annoLetto" value="${libro.annoLetto || ''}"/></p>
    <p><strong>Valutazione (1-5):</strong> <input type="number" id="valutazione" min="1" max="5" value="${libro.valutazione || ''}"/></p>
    <p><strong>Commento:</strong><br/><textarea id="commento" rows="4" cols="50">${libro.commento || ''}</textarea></p>
    <button onclick="salvaModifiche(${index})">Salva modifiche</button>
    <button onclick="eliminaLibro(${index})">Elimina libro</button>
  `;
}

function salvaModifiche(index) {
  const libreria = JSON.parse(localStorage.getItem("libriLetti")) || [];
  if (!libreria[index]) return;

  libreria[index].annoLetto = document.getElementById("annoLetto").value;
  libreria[index].valutazione = document.getElementById("valutazione").value;
  libreria[index].commento = document.getElementById("commento").value;

  localStorage.setItem("libriLetti", JSON.stringify(libreria));
  alert("Modifiche salvate!");
}

function eliminaLibro(index) {
  const libreria = JSON.parse(localStorage.getItem("libriLetti")) || [];
  libreria.splice(index, 1);
  localStorage.setItem("libriLetti", JSON.stringify(libreria));
  alert("Libro eliminato!");
  location.reload();
}

function esportaLibreria() {
  const libreria = localStorage.getItem("libriLetti");
  const blob = new Blob([libreria], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "libreria.json";
  link.click();
}

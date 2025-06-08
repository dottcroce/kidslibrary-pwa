document.addEventListener("DOMContentLoaded", () => {
  mostraLibreria();

  const inputImporta = document.getElementById("importaInput");
  inputImporta.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(event) {
      try {
        const data = JSON.parse(event.target.result);
        if (Array.isArray(data)) {
          localStorage.setItem("libriLetti", JSON.stringify(data));
          alert("Libri importati con successo!");
          location.reload();
        } else {
          alert("Formato file non valido.");
        }
      } catch (err) {
        alert("Errore durante l'importazione.");
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
    <p><strong>Anno letto:</strong> <input id="annoLetto" type="number" value="${libro.annoLetto || ''}"/></p>
    <p><strong>Valutazione (1-5):</strong> <input id="valutazione" type="number" min="1" max="5" value="${libro.valutazione || ''}"/></p>
    <p><strong>Commento:</strong><br/><textarea id="commento" rows="4" cols="50">${libro.commento || ''}</textarea></p>
    <button onclick="salvaModifiche(${index})">💾 Salva</button>
    <button onclick="eliminaLibro(${index})">🗑️ Elimina</button>
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
  mostraLibreria();
  document.getElementById("schedaLibro").innerHTML = "";
}

function eliminaLibro(index) {
  const conferma = confirm("Sei sicuro di voler eliminare questo libro?");
  if (!conferma) return;

  const libreria = JSON.parse(localStorage.getItem("libriLetti")) || [];
  libreria.splice(index, 1);
  localStorage.setItem("libriLetti", JSON.stringify(libreria));
  alert("Libro eliminato.");
  mostraLibreria();
  document.getElementById("schedaLibro").innerHTML = "";
}

function esportaLibri() {
  const dati = localStorage.getItem("libriLetti");
  const blob = new Blob([dati], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "libri_letti.json";
  a.click();
  URL.revokeObjectURL(url);
}

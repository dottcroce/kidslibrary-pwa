document.addEventListener("DOMContentLoaded", () => {
  const scaffali = document.getElementById("scaffali");
  const scheda = document.getElementById("schedaLibro");
  const libri = JSON.parse(localStorage.getItem("libriLetti")) || [];

  libri.forEach((libro, index) => {
    const img = document.createElement("img");
    img.src = libro.copertina;
    img.alt = libro.titolo;
    img.className = "copertinaHome";
    img.onclick = () => mostraScheda(libro);
    scaffali.appendChild(img);
  });

  function mostraScheda(libro) {
    scheda.innerHTML = `
      <h3>${libro.titolo}</h3>
      <img src="${libro.copertina}" alt="Copertina">
      <p><strong>Autore:</strong> ${libro.autori}</p>
      <p><strong>Anno Pubblicazione:</strong> ${libro.annoPubblicazione}</p>
      <p><strong>Genere:</strong> ${libro.genere}</p>
      <p><strong>Anno Letto:</strong> ${libro.annoLetto}</p>
      <p><strong>Valutazione:</strong> ${libro.valutazione} ⭐</p>
      <p><strong>Commento:</strong> ${libro.commento}</p>
    `;
  }
});

// Gestione form libri letti avanzata con redirect

async function cercaLibro() {
  const query = document.getElementById('searchInput').value;
  const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(query)}&maxResults=3`;

  const response = await fetch(url);
  const data = await response.json();

  const risultati = document.getElementById('risultati');
  risultati.innerHTML = '<h3>Risultati:</h3>';

  data.items.forEach(item => {
    const titolo = item.volumeInfo.title || 'Titolo non disponibile';
    const btn = document.createElement('button');
    btn.innerText = titolo;
    btn.onclick = () => mostraDettagli(item);
    risultati.appendChild(btn);
  });
}

function mostraDettagli(item) {
  const info = item.volumeInfo;
  const titolo = info.title || 'Titolo non disponibile';
  const autori = info.authors ? info.authors.join(', ') : 'Autore non disponibile';
  const descrizione = info.description || 'Descrizione non disponibile';
  const img = info.imageLinks?.thumbnail || '';
  const anno = info.publishedDate ? info.publishedDate.slice(0, 4) : 'ND';
  const genere = info.categories ? info.categories.join(', ') : 'Genere non disponibile';

  const scheda = document.getElementById('schedaLibro');
  scheda.innerHTML = `
    <h3>${titolo}</h3>
    <img src="${img}" alt="Copertina libro"/>
    <p><strong>Autore:</strong> ${autori}</p>
    <p><strong>Anno pubblicazione:</strong> ${anno}</p>
    <p><strong>Genere:</strong> ${genere}</p>
    <p>${descrizione}</p>

    <label>Anno di lettura: <input type="number" id="annoLetto" placeholder="Es. 2023"/></label><br/>
    <label>Valutazione (1-5): <input type="number" id="valutazione" min="1" max="5"/></label><br/>
    <label>Commento:<br/><textarea id="commento" rows="4" cols="50"></textarea></label><br/>
    <button onclick="salvaLibro()">Salva</button>
  `;

  localStorage.setItem("libroSelezionato", JSON.stringify({
    titolo,
    autori,
    descrizione,
    copertina: img,
    annoPubblicazione: anno,
    genere
  }));
}

function salvaLibro() {
  const libroBase = JSON.parse(localStorage.getItem("libroSelezionato"));
  const annoLetto = document.getElementById("annoLetto").value;
  const valutazione = document.getElementById("valutazione").value;
  const commento = document.getElementById("commento").value;

  const libroCompleto = {
    ...libroBase,
    annoLetto,
    valutazione,
    commento
  };

  let libreria = JSON.parse(localStorage.getItem("libriLetti")) || [];
  libreria.push(libroCompleto);

  localStorage.setItem("libriLetti", JSON.stringify(libreria));
  alert("Libro salvato con successo!");

  // Redirect alla home
  window.location.href = "index.html";
}

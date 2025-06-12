
document.addEventListener("DOMContentLoaded", function () {
  const settingsButton = document.getElementById("settingsButton");
  const modal = document.getElementById("settingsModal");
  const closeModal = document.getElementById("closeSettingsModal");
  const deleteLibraryBtn = document.getElementById("deleteLibraryBtn");

  if (settingsButton && modal && closeModal) {
    settingsButton.addEventListener("click", function () {
      modal.style.display = "block";
    });

    closeModal.addEventListener("click", function () {
      modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  if (deleteLibraryBtn) {
    deleteLibraryBtn.addEventListener("click", function () {
      if (confirm("Sei sicuro di voler cancellare tutta la libreria?")) {
        localStorage.removeItem("libriLetti");
        localStorage.removeItem("libriScritti");
        alert("Libreria cancellata!");
        localStorage.setItem("skipAutoload", "true");
        location.reload();
      }
    });
  }

  // Esporta libreria
  const exportBtn = document.querySelector("button[onclick*='mode=export']");
  if (exportBtn) {
    exportBtn.removeAttribute("onclick");
    exportBtn.addEventListener("click", function () {
      const libriLetti = JSON.parse(localStorage.getItem("libriLetti") || "[]");
      const libriScritti = JSON.parse(localStorage.getItem("libriScritti") || "[]");
      const dati = { libriLetti, libriScritti };
      const blob = new Blob([JSON.stringify(dati, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "libreria_Mattia_2025-06-12.json";
      a.click();
      URL.revokeObjectURL(url);
      alert("Esportazione completata!");
    });
  }

  // Importa libreria
  const importBtn = document.querySelector("button[onclick*='mode=import']");
  if (importBtn) {
    importBtn.removeAttribute("onclick");
    importBtn.addEventListener("click", function () {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";
      input.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function () {
          try {
            const dati = JSON.parse(reader.result);
            if (dati.libriLetti) localStorage.setItem("libriLetti", JSON.stringify(dati.libriLetti));
            if (dati.libriScritti) localStorage.setItem("libriScritti", JSON.stringify(dati.libriScritti));
            alert("Libreria caricata con successo!");
            localStorage.removeItem("skipAutoload");
            location.reload();
          } catch (err) {
            alert("Errore nel file JSON.");
          }
        };
        reader.readAsText(file);
      };
      input.click();
    });
  }
});

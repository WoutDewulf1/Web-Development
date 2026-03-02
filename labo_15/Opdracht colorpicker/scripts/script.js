const setup = () => {
// Selecteer alle elementen
    const roodSchuif = document.getElementById('roodSchuif');
    const groenSchuif = document.getElementById('groenSchuif');
    const blauwSchuif = document.getElementById('blauwSchuif');

    const roodGetal = document.getElementById('roodGetal');
    const groenGetal = document.getElementById('groenGetal');
    const blauwGetal = document.getElementById('blauwGetal');

    const kleurVakje = document.getElementById('kleurVakje');


// Luister naar veranderingen op de schuifbalken
    roodSchuif.addEventListener('input', werkKleurBij);
    groenSchuif.addEventListener('input', werkKleurBij);
    blauwSchuif.addEventListener('input', werkKleurBij);

// Voer de functie één keer uit bij het opstarten
    werkKleurBij();
}
window.addEventListener("load", setup);



// De functie die alles bijwerkt
const werkKleurBij = () => {
    const r = roodSchuif.value;
    const g = groenSchuif.value;
    const b = blauwSchuif.value;

    // Tekst in de labels aanpassen
    roodGetal.textContent = r;
    groenGetal.textContent = g;
    blauwGetal.textContent = b;

    // De achtergrondkleur van het vakje instellen met de RGB-string
    const rgbKleur = "rgb(" + r + "," + g + "," + b + ")";
    kleurVakje.style.backgroundColor = rgbKleur;
}

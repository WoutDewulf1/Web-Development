let roodSchuif, groenSchuif, blauwSchuif;
let roodGetal, groenGetal, blauwGetal;
let kleurVakje, saveKnop, bewaardeKleuren;

const setup = () => {
    roodSchuif = document.getElementById('roodSchuif');
    groenSchuif = document.getElementById('groenSchuif');
    blauwSchuif = document.getElementById('blauwSchuif');

    roodGetal = document.getElementById('roodGetal');
    groenGetal = document.getElementById('groenGetal');
    blauwGetal = document.getElementById('blauwGetal');

    kleurVakje = document.getElementById('kleurVakje');
    saveKnop = document.getElementById('saveKnop');
    bewaardeKleuren = document.getElementById('bewaardeKleuren');

    roodSchuif.addEventListener('input', werkKleurBij);
    groenSchuif.addEventListener('input', werkKleurBij);
    blauwSchuif.addEventListener('input', werkKleurBij);

    // Luister naar de Save knop
    saveKnop.addEventListener('click', bewaarKleur);

    werkKleurBij();
}

const werkKleurBij = () => {
    const r = roodSchuif.value;
    const g = groenSchuif.value;
    const b = blauwSchuif.value;

    roodGetal.textContent = r;
    groenGetal.textContent = g;
    blauwGetal.textContent = b;

    kleurVakje.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
}

const bewaarKleur = () => {
    const r = roodSchuif.value;
    const g = groenSchuif.value;
    const b = blauwSchuif.value;

    // Maak de swatch aan
    const swatch = document.createElement('div');
    swatch.className = 'bewaarde-swatch';
    swatch.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";

    // Klikken op de swatch herstelt de kleur in de picker
    swatch.addEventListener('click', () => {
        roodSchuif.value = r;
        groenSchuif.value = g;
        blauwSchuif.value = b;
        werkKleurBij();
    });

    // Maak de delete knop aan
    const deleteKnop = document.createElement('button');
    deleteKnop.className = 'delete-knop';
    deleteKnop.textContent = 'X';

    // Klikken op de delete knop verwijdert de swatch
    deleteKnop.addEventListener('click', (event) => {
        event.stopPropagation(); // Voorkomt dat de swatch klik ook triggert
        swatch.remove();
    });

    // Voeg elementen samen
    swatch.appendChild(deleteKnop);
    bewaardeKleuren.appendChild(swatch);
}

window.addEventListener("load", setup);
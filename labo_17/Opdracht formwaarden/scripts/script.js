const setup = () => {
    document.getElementById('toonResultaatBtn').addEventListener('click', function() {

        // 1. Checkbox: Is roker
        const isRoker = document.getElementById('isRoker').checked;
        if (isRoker) {
            console.log("is roker");
        } else {
            console.log("is geen roker");
        }

        // 2. Radiobuttons: Moedertaal
        // Gebruik querySelector om de aangevinkte (:checked) radiobutton binnen de groep 'taal' te vinden
        const geselecteerdeTaal = document.querySelector('input[name="taal"]:checked');
        if (geselecteerdeTaal) {
            console.log("moedertaal is " + geselecteerdeTaal.value);
        } else {
            console.log("moedertaal is niet geselecteerd");
        }

        // 3. Single select: Favoriete buurland
        const buurland = document.getElementById('buurland').value;
        console.log("favoriete buurland is " + buurland);

        // 4. Multi-select: Bestelling
        const bestellingSelect = document.getElementById('bestelling');

        // Array.from zet de HTMLCollection van geselecteerde opties om naar een echte array,
        // map() haalt vervolgens van elke optie alleen de 'value' op.
        const geselecteerdeOpties = Array.from(bestellingSelect.selectedOptions).map(optie => optie.value);

        // Join() plakt de array-elementen aan elkaar met een spatie ertussen
        console.log("bestelling bestaat uit " + geselecteerdeOpties.join(" "));
    });
}
window.addEventListener("load", setup);
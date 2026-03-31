// Array met personen - geïnitialiseerd met voorgedefinieerde data
let personen = [
    {
        voornaam: 'Jan',
        familienaam: 'Janssens',
        geboorteDatum: new Date('2010-10-10'),
        email: 'jan@example.com',
        aantalKinderen: 0
    },
    {
        voornaam: 'Mieke',
        familienaam: 'Mickelsen',
        geboorteDatum: new Date('1980-01-01'),
        email: 'mieke@example.com',
        aantalKinderen: 1
    },
    {
        voornaam: 'Piet',
        familienaam: 'Pieters',
        geboorteDatum: new Date('1970-12-31'),
        email: 'piet@example.com',
        aantalKinderen: 2
    }
];

// Variabele om bij te houden welke persoon momenteel in het formulier wordt bewerkt (-1 voor nieuwe persoon)
let currentPersonIndex = -1;

// Vul de select lijst met personen
const vulPersoonLijst = () => {
    let lstPersonen = document.getElementById("lstPersonen");
    lstPersonen.innerHTML = ""; // Maak de lijst leeg

    for (let i = 0; i < personen.length; i++) {
        let option = document.createElement("option");
        option.id = i.toString(); // Index als id
        option.text = personen[i].voornaam + " " + personen[i].familienaam;
        option.value = i;
        lstPersonen.appendChild(option);
    }
};

// Toon de gegevens van een persoon in het formulier
const toonPersoon = (index) => {
    if (index >= 0 && index < personen.length) {
        let persoon = personen[index];

        document.getElementById("txtVoornaam").value = persoon.voornaam;
        document.getElementById("txtFamilienaam").value = persoon.familienaam;
        document.getElementById("txtGeboorteDatum").value = formateerDatum(persoon.geboorteDatum);
        document.getElementById("txtEmail").value = persoon.email;
        document.getElementById("txtAantalKinderen").value = persoon.aantalKinderen;

        currentPersonIndex = index;
    }
};

// Formateer een Date object naar string in format YYYY-MM-DD
const formateerDatum = (datum) => {
    if (!datum) return "";
    let jaar = datum.getFullYear();
    let maand = String(datum.getMonth() + 1).padStart(2, '0');
    let dag = String(datum.getDate()).padStart(2, '0');
    return jaar + "-" + maand + "-" + dag;
};

// Parse een string in format YYYY-MM-DD naar Date object
const parseerDatum = (datumString) => {
    return new Date(datumString);
};

// Maak het formulier leeg en zet het klaar voor een nieuwe persoon
const leegFormulier = () => {
    document.getElementById("txtVoornaam").value = "";
    document.getElementById("txtFamilienaam").value = "";
    document.getElementById("txtGeboorteDatum").value = "";
    document.getElementById("txtEmail").value = "";
    document.getElementById("txtAantalKinderen").value = "";

    clearAllErrors();

    let lstPersonen = document.getElementById("lstPersonen");
    lstPersonen.selectedIndex = -1; // Deselect all

    currentPersonIndex = -1; // Aanduiding voor nieuwe persoon
};

// Event listener (btnBewaar click)
// Bewaar de wijzigingen die in de user interface werden aangebracht
const bewaarBewerktePersoon = () => {
    console.log("Klik op de knop bewaar");

    // Valideer alle input data
    valideer();

    // Controleer of er errors zijn
    let errElements = document.querySelectorAll(".errorMessage");
    let hasErrors = false;
    for (let i = 0; i < errElements.length; i++) {
        if (errElements[i].innerHTML !== "") {
            hasErrors = true;
            break;
        }
    }

    if (hasErrors) {
        console.log("Er zijn validatiefouten");
        return;
    }

    // Maak een persoon object met de ingevulde gegevens
    let persoon = {
        voornaam: document.getElementById("txtVoornaam").value.trim(),
        familienaam: document.getElementById("txtFamilienaam").value.trim(),
        geboorteDatum: parseerDatum(document.getElementById("txtGeboorteDatum").value),
        email: document.getElementById("txtEmail").value.trim(),
        aantalKinderen: parseInt(document.getElementById("txtAantalKinderen").value)
    };

    if (currentPersonIndex === -1) {
        // Nieuwe persoon: voeg toe aan array
        personen.push(persoon);
        console.log("Nieuwe persoon toegevoegd");
    } else {
        // Bestaande persoon: update properties
        personen[currentPersonIndex] = persoon;
        console.log("Persoon op index " + currentPersonIndex + " bijgewerkt");
    }

    // Vernieuw de persoonlijst
    vulPersoonLijst();

    // Selecteer de net opgeslagen persoon in de lijst
    if (currentPersonIndex === -1) {
        // Voor nieuwe persoon: selecteer de laatste in de lijst
        let lstPersonen = document.getElementById("lstPersonen");
        lstPersonen.selectedIndex = personen.length - 1;
    } else {
        // Voor bestaande persoon: selecteer dezelfde index
        let lstPersonen = document.getElementById("lstPersonen");
        lstPersonen.selectedIndex = currentPersonIndex;
    }

    // Maak het formulier leeg
    leegFormulier();
};

// Event listener (btnNieuw click)
const bewerkNieuwePersoon = () => {
    console.log("Klik op de knop nieuw");
    leegFormulier();
};

const persoonGeselecteerd = (event) => {
    let lstPersonen = document.getElementById("lstPersonen");
    let index = lstPersonen.selectedIndex;

    if (index >= 0) {
        toonPersoon(index);
    }
};

const setup = () => {
    vulPersoonLijst();

    let btnBewaar = document.getElementById("btnBewaar");
    btnBewaar.addEventListener("click", bewaarBewerktePersoon);

    let btnNieuw = document.getElementById("btnNieuw");
    btnNieuw.addEventListener("click", bewerkNieuwePersoon);

    let lstPersonen = document.getElementById("lstPersonen");
    lstPersonen.addEventListener("change", persoonGeselecteerd);
};

window.addEventListener("load", setup);
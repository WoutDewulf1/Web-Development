const initialize = () => {
    let btnSave = document.getElementById("btnSave");
    let sliders = document.getElementsByClassName("slider");

    // 1. Herstel opgeslagen data VOORDAT we events koppelen en updaten
    restoreSettings();

    for (let i = 0; i < sliders.length; i++) {
        sliders[i].addEventListener("change", update);
        sliders[i].addEventListener("input", update);
    }
    update();

    btnSave.addEventListener("click", saveSwatch);
};

// NIEUW: Functie om sliders en swatches op te halen uit localStorage
const restoreSettings = () => {
    // Herstel de actuele slider posities
    let settingsJSON = localStorage.getItem("colorpicker.settings");
    if (settingsJSON) {
        let settings = JSON.parse(settingsJSON);
        document.getElementById("sldRed").value = settings.red;
        document.getElementById("sldGreen").value = settings.green;
        document.getElementById("sldBlue").value = settings.blue;
    }

    // Herstel de bewaarde favoriete kleuren (swatches)
    let swatchesJSON = localStorage.getItem("colorpicker.swatches");
    if (swatchesJSON) {
        let swatches = JSON.parse(swatchesJSON);
        let swatchComponents = document.getElementById("swatchComponents");

        // Loop door de opgeslagen array en bouw elke swatch opnieuw op
        for (let i = 0; i < swatches.length; i++) {
            let swatch = buildSwatchComponent(swatches[i].red, swatches[i].green, swatches[i].blue);
            swatchComponents.appendChild(swatch);
        }
    }
};

// NIEUW: Functie om actuele staat te bewaren in localStorage
const storeSettings = () => {
    // Bewaar de sliders als een object
    let settings = {
        red: document.getElementById("sldRed").value,
        green: document.getElementById("sldGreen").value,
        blue: document.getElementById("sldBlue").value
    };
    localStorage.setItem("colorpicker.settings", JSON.stringify(settings));

    // Bewaar alle actieve swatches als een array van objecten
    let swatches = [];
    let swatchElements = document.getElementById("swatchComponents").children;
    for (let i = 0; i < swatchElements.length; i++) {
        swatches.push({
            red: swatchElements[i].getAttribute("data-red"),
            green: swatchElements[i].getAttribute("data-green"),
            blue: swatchElements[i].getAttribute("data-blue")
        });
    }
    localStorage.setItem("colorpicker.swatches", JSON.stringify(swatches));
};

const saveSwatch = () => {
    let swatchComponents = document.getElementById("swatchComponents");
    let swatch = buildSwatchComponent();
    swatchComponents.appendChild(swatch);

    // UPDATE: Bewaar de nieuwe situatie naar localStorage
    storeSettings();
};

// AANGEPAST: De functie configureSwatch is samengevoegd met buildSwatchComponent
// zodat deze parameters kan ontvangen bij het herstellen vanuit de localStorage.
const buildSwatchComponent = (r, g, b) => {
    let swatch = document.createElement("div");
    let btnDelete = document.createElement("input");

    swatch.className = "swatch";

    // Als parameters r, g, b zijn ingevuld (tijdens inladen localStorage), gebruik die.
    // Anders (bij nieuwe save via knop) lezen we ze uit de actuele sliders.
    let red = (r !== undefined) ? r : document.getElementById("sldRed").value;
    let green = (g !== undefined) ? g : document.getElementById("sldGreen").value;
    let blue = (b !== undefined) ? b : document.getElementById("sldBlue").value;

    swatch.setAttribute("data-red", red);
    swatch.setAttribute("data-green", green);
    swatch.setAttribute("data-blue", blue);
    swatch.style.background = "rgb(" + red + "," + green + "," + blue + ")";

    swatch.addEventListener("click", setColorPickerFromSwatch);

    btnDelete.setAttribute("type", "button");
    btnDelete.setAttribute("value", "X");
    btnDelete.addEventListener("click", deleteSwatch);

    swatch.appendChild(btnDelete);
    return swatch;
};

const setColorPickerFromSwatch = (event) => {
    let swatch = event.target;

    let red = swatch.getAttribute("data-red");
    document.getElementById("sldRed").value = red;

    let green = swatch.getAttribute("data-green");
    document.getElementById("sldGreen").value = green;

    let blue = swatch.getAttribute("data-blue");
    document.getElementById("sldBlue").value = blue;

    update();
};

const deleteSwatch = (event) => {
    let swatchComponents = document.getElementById("swatchComponents");
    let button = event.target;
    let swatch = button.parentNode;
    swatchComponents.removeChild(swatch);
    event.stopPropagation();

    // UPDATE: Sla de wijziging (verwijdering) op
    storeSettings();
};

const update = () => {
    let red = document.getElementById("sldRed").value;
    document.getElementById("lblRed").innerHTML = red;

    let green = document.getElementById("sldGreen").value;
    document.getElementById("lblGreen").innerHTML = green;

    let blue = document.getElementById("sldBlue").value;
    document.getElementById("lblBlue").innerHTML = blue;

    let swatch = document.getElementById("swatch");
    swatch.style.background = "rgb(" + red + "," + green + "," + blue + ")";

    // UPDATE: Sla de wijziging van de sliders op bij elke beweging
    storeSettings();
};

window.addEventListener("load", initialize);
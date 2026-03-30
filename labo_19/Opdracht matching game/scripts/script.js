let global = {
    AANTAL_HORIZONTAAL: 4,
    AANTAL_VERTICAAL: 3,
    AANTAL_KAARTEN: 6,
    isBusy: false,
    openKaarten: [],
    gevondenParen: 0
};

const setup = () => {
    let kaartenArray = [];
    for (let i = 1; i <= global.AANTAL_KAARTEN; i++) {
        kaartenArray.push(i, i);
    }
    kaartenArray.sort(() => Math.random() - 0.5);

    let speelveld = document.getElementById("speelveld");

    kaartenArray.forEach(nummer => {
        let img = document.createElement("img");
        img.src = "images/achterkant.jpg";
        img.dataset.kaartNummer = nummer;
        img.className = "kaart";
        img.addEventListener("click", draaiKaart);
        speelveld.appendChild(img);
    });
};

const draaiKaart = (e) => {
    let geklikteKaart = e.target;

    if (global.isBusy || geklikteKaart.classList.contains("omgedraaid")) {
        return;
    }

    geklikteKaart.src = `images/kaart${geklikteKaart.dataset.kaartNummer}.jpg`;
    geklikteKaart.classList.add("omgedraaid");
    global.openKaarten.push(geklikteKaart);

    if (global.openKaarten.length === 2) {
        global.isBusy = true;
        controleerMatch();
    }
};

const controleerMatch = () => {
    let [kaart1, kaart2] = global.openKaarten;
    let isMatch = kaart1.dataset.kaartNummer === kaart2.dataset.kaartNummer;

    kaart1.classList.add(isMatch ? "juist" : "fout");
    kaart2.classList.add(isMatch ? "juist" : "fout");

    setTimeout(() => {
        if (isMatch) {
            kaart1.classList.add("verborgen");
            kaart2.classList.add("verborgen");
            global.gevondenParen++;

            if (global.gevondenParen === global.AANTAL_KAARTEN) {
                alert("Gefeliciteerd, je hebt gewonnen!");
            }
        } else {
            kaart1.src = "images/achterkant.jpg";
            kaart2.src = "images/achterkant.jpg";
        }

        kaart1.className = "kaart";
        kaart2.className = "kaart";
        global.openKaarten = [];
        global.isBusy = false;

    }, 1000);
};

window.addEventListener("load", setup);
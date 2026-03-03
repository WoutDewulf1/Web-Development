const setup = () => {
    const tekst = "De man van An geeft geen hand aan ambetante verwanten";
    const zoekterm = "an";
    let teller = 0;
    let index = tekst.indexOf(zoekterm);

    while (index !== -1) {
        teller++;
        index = tekst.indexOf(zoekterm, index + 1);
    }

    console.log(`Aantal keer "an" (via indexOf): ${teller}`);
    let tellerLast = 0;
    let indexLast = tekst.lastIndexOf(zoekterm);

    while (indexLast !== -1) {
        tellerLast++;
        indexLast = tekst.lastIndexOf(zoekterm, indexLast - 1);
    }

    console.log(`Aantal keer "an" (via lastIndexOf): ${tellerLast}`);
}
window.addEventListener("load", setup);
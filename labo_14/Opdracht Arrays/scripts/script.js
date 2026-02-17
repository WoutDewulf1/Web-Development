const famillieleden = ['Jeff','Guust','Piet','Jean-Paul','Jonny']
console.log(famillieleden.length);

console.log(famillieleden[0],famillieleden[2],famillieleden[4]);

function voegNaamToe(naam) {
    if (naam) {
        famillieleden.push(naam);
    }
}

const nieuweNaam = prompt("Voer een extra naam in:");
voegNaamToe(nieuweNaam);

console.log(familieleden);

console.log(familieleden.toString());
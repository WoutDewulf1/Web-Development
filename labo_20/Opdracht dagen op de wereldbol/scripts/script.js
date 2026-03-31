const geboortedatum = new Date('2007-10-17');
const huidigeDatum = new Date('2026-03-31');

// Bereken het verschil in milliseconden
const verschilInTijd = huidigeDatum.getTime() - geboortedatum.getTime();

// Zet milliseconden om naar dagen
const verschilInDagen = Math.floor(verschilInTijd / (1000 * 3600 * 24));

console.log(verschilInDagen);
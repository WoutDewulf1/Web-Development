let student = {}
    student.naam = "Wout";
    student.leeftijd = 18;
    student.vakken = ["Webdev", "FoP"];
    student.adres = { stad: "Oostrozebeke" };
    student.inschrijfDatum = new Date("2025-09-01T10:00:00Z");

let jsonString = JSON.stringify(student,  null, 2);
console.log(jsonString);
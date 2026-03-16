const setup = () => {
    let gemeenten = [];

    while (true) {
        let invoer = prompt("Geef een gemeente in");

        if (invoer === null || invoer.toLowerCase() === "stop") {
            break;
        }

        if (invoer.trim() !== "") {
            gemeenten.push(invoer.trim());
        }
    }

    gemeenten.sort();

    if (gemeenten.length > 0) {
        let htmlOutput = "<select id='gemeenteSelect'>";

        for (let gemeente of gemeenten) {
            htmlOutput += `<option value="${gemeente}">${gemeente}</option>`;
        }

        htmlOutput += "</select>";

        document.getElementById("resultaat").innerHTML = htmlOutput;
    } else {
        document.getElementById("resultaat").innerText = "Geen gemeenten ingevoerd.";
    }
}
window.addEventListener("load", setup);
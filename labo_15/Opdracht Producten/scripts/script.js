const setup = () => {

}
window.addEventListener("load", setup);

function bereken() {
    // Get all elements by class
    let prijzen = document.getElementsByClassName('prijs');
    let aantallen = document.getElementsByClassName('aantal');
    let btwTarieven = document.getElementsByClassName('btw');
    let subtotalen = document.getElementsByClassName('subtotaal');
    let totaalElement = document.getElementById('totaal');

    let eindTotaal = 0;

    // Loop through the items (3 products in this case)
    for (let i = 0; i < prijzen.length; i++) {
        // Parse the values - parseFloat stops at non-numeric chars like " Eur" or "%"
        let prijs = parseFloat(prijzen[i].innerText);
        let aantal = parseFloat(aantallen[i].value);
        let btw = parseFloat(btwTarieven[i].innerText);

        // Calculation: (Price * Quantity) + Tax
        // Formula: subtotal = (price * aantal) * (1 + (btw / 100))
        let subtotal = (prijs * aantal) * (1 + (btw / 100));

        // Update the subtotal cell for this row (fixed to 2 decimals)
        subtotalen[i].innerText = subtotal.toFixed(2) + " Eur";

        // Add to the grand total
        eindTotaal += subtotal;
    }

    // Update the final total cell
    totaalElement.innerText = eindTotaal.toFixed(2) + " Eur";
}
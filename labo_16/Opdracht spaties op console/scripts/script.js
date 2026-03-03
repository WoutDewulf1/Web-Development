const setup = () => {

}
const verwerkTekst = () =>{
    const input = document.getElementById('userInput').value;
    const resultaat = input.replace(/\s+/g, '').split('').join(' ');

    console.log(resultaat);
}
window.addEventListener("load", setup);
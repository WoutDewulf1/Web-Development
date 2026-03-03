const setup = () => {

}
const maakMetSpaties = (inputText) => {
    let result = "";

    for (let i = 0; i < inputText.length; i++) {
        let char = inputText[i];
        if (char !== " ") {
            if (result.length > 0) {
                result = result + " ";
            }
            result = result + char;
        }
    }
    return result;
};

function toonResultaat() {
    let input = document.getElementById("userInput").value;
    console.log(maakMetSpaties(input));
}
window.addEventListener("load", setup);
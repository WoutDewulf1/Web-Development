const setup = () => {
    const elementen = document.getElementsByClassName('belangrijk');

    for (let i = 0; i < elementen.length; i++) {
        elementen[i].className += " opvallend";
    }
}
window.addEventListener("load", setup);
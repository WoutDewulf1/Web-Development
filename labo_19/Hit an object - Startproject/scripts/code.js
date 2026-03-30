let global = {
    IMAGE_COUNT: 5,
    IMAGE_SIZE: 48,
    IMAGE_PATH_PREFIX: "images/",
    IMAGE_PATH_SUFFIX: ".png",
    MOVE_DELAY: 1000, // 1 seconde zoals in de opgave
    score: 0,
    timeoutId: 0
};

const setup = () => {
    let btnStart = document.getElementById("btnStart");
    btnStart.addEventListener("click", startGame);
};

const startGame = () => {
    global.score = 0;
    document.getElementById("score").innerText = global.score;

    let target = document.getElementById("target");
    target.style.display = "block";
    target.addEventListener("click", hit);

    moveTarget();
};

const hit = () => {
    let target = document.getElementById("target");
    let isBomb = target.src.includes("0.png");

    if (isBomb) {
        clearTimeout(global.timeoutId);
        alert("GAME OVER");
    } else {
        global.score++;
        document.getElementById("score").innerText = global.score;
        moveTarget(); // Meteen verplaatsen na een klik
    }
};

const moveTarget = () => {
    let target = document.getElementById("target");
    let playField = document.getElementById("playField");

    // Willekeurige afbeelding
    let randomImg = Math.floor(Math.random() * global.IMAGE_COUNT);
    target.src = global.IMAGE_PATH_PREFIX + randomImg + global.IMAGE_PATH_SUFFIX;

    // Willekeurige positie
    let maxLeft = playField.clientWidth - global.IMAGE_SIZE;
    let maxTop = playField.clientHeight - global.IMAGE_SIZE;
    target.style.left = Math.floor(Math.random() * maxLeft) + "px";
    target.style.top = Math.floor(Math.random() * maxTop) + "px";

    // Timer resetten
    clearTimeout(global.timeoutId);
    global.timeoutId = setTimeout(moveTarget, global.MOVE_DELAY);
};

window.addEventListener("load", setup);
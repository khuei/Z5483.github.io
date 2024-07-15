const colorMenu = document.getElementById("color-menu");
const makeButtonBtn = document.getElementById("make-button-btn");
const moveBtn = document.getElementById("move-btn");

const runningCountText = document.getElementById("running-count-text");

var viewingArea = document.getElementById("viewing-area");

const viewingAreaWidth = 40.0 * Math.floor(viewingArea.offsetWidth / 40.0) - 40;
const viewingAreaHeight = 40.0 * Math.floor(viewingArea.offsetHeight / 40.0) - 40;

viewingArea.style.width = (viewingAreaWidth + 40) + "px";
viewingArea.style.height = (viewingAreaHeight + 40) + "px";

let buttonNum = 0;
let availablePos = [];
let numAvailablePos = 0;

let sumBtnNum = 0;

const defaultSpeed = 40;
let buttonSpeed = [];
let movementPaused = true;
let animationId = null;

for (let row = 0; row <= viewingAreaWidth; row += 40) {
    for (let column = 0; column <= viewingAreaHeight; column += 40) {
        availablePos.push([row, column]);
        numAvailablePos += 1;
    }
}

function getRandomSpeed() {
    return (Math.random() < 0.5 ? 1 : -1) * defaultSpeed;
}


function moveButton(button, buttonId) {
    if (!movementPaused) {
        let currentPos = button.style.left.substring(0, button.style.left.length - 2);
        speed = buttonSpeed[buttonId];

        button.style.left = (parseInt(currentPos) + speed) + "px";

        if (currentPos <= 40) {
            buttonSpeed[buttonId] = defaultSpeed;
        } else if (currentPos >= viewingAreaWidth - 40) {
            buttonSpeed[buttonId] = -defaultSpeed;
        }
    }
}

function createButton() {
    if (numAvailablePos == 0)
        return;

    const button = document.createElement("button");
    const buttonId = buttonNum++;
    const randNum = Math.floor(Math.random() * 100);
    const buttonText = document.createTextNode(randNum);
    const buttonColor = colorMenu.value;

    sumBtnNum += randNum;

    button.appendChild(buttonText);
    button.style.backgroundColor = buttonColor;
    button.classList.add("btn");

    const randPosIndex = Math.floor(Math.random() * numAvailablePos);

    button.style.left = availablePos[randPosIndex][0] + "px";
    button.style.top = availablePos[randPosIndex][1] + "px";

    buttonSpeed[buttonId] = getRandomSpeed();

    if (availablePos[randPosIndex][0] == viewingAreaWidth) {
        buttonSpeed[buttonId] = -defaultSpeed;
    } else if (availablePos[randPosIndex][0] == 0) {
        buttonSpeed[buttonId] = defaultSpeed;
    }

    button.addEventListener(
        "click",
        function() {
            button.style.backgroundColor = colorMenu.value;
            sumBtnNum += randNum;
            runningCountText.textContent = "Running Count: " + sumBtnNum;
        }
    );

    let intervalId = setInterval(
        function() {
            moveButton(button, buttonId)
        },
        500
    );

    numAvailablePos -= 1;

    availablePos.splice(randPosIndex, 1);
    viewingArea.appendChild(button);
}

makeButtonBtn.addEventListener(
    "click",
    function() {
        createButton();
        runningCountText.textContent = "Running Count: " + sumBtnNum;
        buttons = document.getElementsByClassName("btn");
    }
);

function toggleMovement() {
    movementPaused = !movementPaused;

    if (movementPaused) {
        moveBtn.textContent = "Move"
    } else {
        moveBtn.textContent = "Pause"
    }
}

moveBtn.addEventListener("click", toggleMovement);

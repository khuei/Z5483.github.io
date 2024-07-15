const options = ["Paper", "Scissor", "Rock"];
let randomNum;

let playerHand = "";
let compHand = "";

let playerRandNum = 0;
let compRandNum = 0;

let isTie = false;
let winner = "";

function playRockPaperScissor() {
    playerRandNum = Math.floor(Math.random() * 3);
    compRandNum = Math.floor(Math.random() * 3);

    playerHand = options[playerRandNum];
    compHand = options[compRandNum];

    if (playerRandNum == compRandNum) {
        isTie = true;
    }

    if (playerRandNum == 0 && compRandNum == 2) {
        isTie = false;
        winner = "Player";
    } else if (playerRandNum == 2 && compRandNum == 0) {
        isTie = false;
        winner = "Computer";
    }

    if (playerRandNum > compRandNum) {
        isTie = false;
        winner = "Player";
    } else if (playerRandNum < compRandNum) {
        isTie = false;
        winner = "Computer";
    }
}

document.getElementById("play-btn").addEventListener(
    "click",
    function() {
        playRockPaperScissor();

        document.getElementById("player-hand").textContent = playerHand;

        if (playerHand == options[0]) {
            document.getElementById("player-hand-image").src = "images/paper.webp";
            document.getElementById("player-hand-image").style.transform = "rotate(90deg) scaleX(-1)";
        } else if (playerHand == options[1]) {
            document.getElementById("player-hand-image").src = "images/scissor.webp";
            document.getElementById("player-hand-image").style.transform = "rotate(90deg) scaleX(-1)";
        } else if (playerHand == options[2]) {
            document.getElementById("player-hand-image").src = "images/rock.webp";
            document.getElementById("player-hand-image").style.transform = "rotate(90deg) scaleX(-1)";
        }

        document.getElementById("comp-hand").textContent = compHand;

        if (compHand == options[0]) {
            document.getElementById("comp-hand-image").src = "images/paper.webp";
            document.getElementById("comp-hand-image").style.transform = "rotate(-90deg)";
        } else if (compHand == options[1]) {
            document.getElementById("comp-hand-image").src = "images/scissor.webp";
            document.getElementById("comp-hand-image").style.transform = "rotate(-90deg)";
        } else if (compHand == options[2]) {
            document.getElementById("comp-hand-image").src = "images/rock.webp";
            document.getElementById("comp-hand-image").style.transform = "rotate(-90deg)";
        }

        if (isTie == false) {
            document.getElementById("result-msg").textContent = winner + " Wins!";
        } else {
            document.getElementById("result-msg").textContent = " Tie!";
        }

        console.log("Player picks: " + playerHand);
        console.log("Computer picks: " + compHand);
        console.log(winner + " wins!");
    }
);

window.addEventListener(
    "keypress",
    function(event) {
        if (event.key === "Enter") {
            document.getElementById("play-btn").click();
        }
    }
);

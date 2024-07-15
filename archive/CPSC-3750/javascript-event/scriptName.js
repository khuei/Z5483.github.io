let red_btn_count = 0;
let blue_btn_count = 0;
let green_btn_count = 0;

let red_change_count = 0;
let blue_change_count = 0;
let green_change_count = 0;

let last_color = "";

const red_color = "IndianRed";
const blue_color = "SteelBlue";
const green_color = "YellowGreen";

document.getElementById("red-btn-count").textContent = red_btn_count;
document.getElementById("green-btn-count").textContent = green_btn_count;
document.getElementById("blue-btn-count").textContent = blue_btn_count;

document.getElementById("red-change-count").textContent = red_change_count;
document.getElementById("green-change-count").textContent = green_change_count;
document.getElementById("blue-change-count").textContent = blue_change_count;

function changeBackground(color) {
    document.body.style.background = color;

    if (color == red_color) {
        red_btn_count += 1;
    } else if (color == blue_color) {
        blue_btn_count += 1;
    } else if (color == green_color) {
        green_btn_count += 1;
    }

    console.log(last_color != color);

    if (last_color != color) {
        if (color == red_color) {
            red_change_count += 1;
        } else if (color == blue_color) {
            blue_change_count += 1;
        } else if (color == green_color) {
            green_change_count += 1;
        }
    }

    last_color = color;
}

document.getElementById("red-btn").addEventListener(
    "click",
    function() {
        changeBackground(red_color)
        document.getElementById("red-btn-count").textContent = red_btn_count;
        document.getElementById("red-change-count").textContent = red_change_count;
    }
);

document.getElementById("blue-btn").addEventListener(
    "click",
    function() {
        changeBackground(blue_color)
        document.getElementById("blue-btn-count").textContent = blue_btn_count;
        document.getElementById("blue-change-count").textContent = blue_change_count;
    }
);

document.getElementById("green-btn").addEventListener(
    "click",
    function() {
        changeBackground(green_color)
        document.getElementById("green-btn-count").textContent = green_btn_count;
        document.getElementById("green-change-count").textContent = green_change_count;
    }
);

function highlightHoveredBtn(objectID) {
    document.getElementById(objectID).style.color = 'black';
    document.getElementById(objectID).style.backgroundColor = 'white';
}

function unhighlightHoveredBtn(objectID) {
    document.getElementById(objectID).style.color = 'white';
    document.getElementById(objectID).style.backgroundColor = 'black';
}


document.getElementById("red-btn").addEventListener(
    "mouseover",
    function() {
        highlightHoveredBtn("red-btn");
    }
);

document.getElementById("blue-btn").addEventListener(
    "mouseover",
    function() {
        highlightHoveredBtn("blue-btn");
    }
);

document.getElementById("green-btn").addEventListener(
    "mouseover",
    function() {
        highlightHoveredBtn("green-btn");
    }
);

document.getElementById("red-btn").addEventListener(
    "mouseleave",
    function() {
        unhighlightHoveredBtn("red-btn");
    }
);

document.getElementById("blue-btn").addEventListener(
    "mouseleave",
    function() {
        unhighlightHoveredBtn("blue-btn");
    }
);

document.getElementById("green-btn").addEventListener(
    "mouseleave",
    function() {
        unhighlightHoveredBtn("green-btn");
    }
);

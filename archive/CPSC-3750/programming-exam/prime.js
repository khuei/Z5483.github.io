// Khue Nguyen
// October 4th, 2023
// CPSC 3750
// program exam #1
// Grade Level Completed: A

let numInput = 0;

let primeNumList = [];
let nonPrimeNumList = [];

let primeNumListSum = 0;
let nonPrimeNumListSum = 0;

function isPrime(num) {
    if (num <= 1)
        return false;

    for (let i = 2; i <= num / 2; i++)
        if (num % i == 0)
            return false;

    return true;
}

function createNumLists(upperLimit) {
    for (let i = 1; i <= upperLimit; ++i) {
        if (isPrime(i)) {
            primeNumList.push(i);
        } else {
            nonPrimeNumList.push(i);
        }
    }
}

function displayNumLists() {
    let primeUl = document.getElementById("prime-num-ul");
    let nonPrimeUl = document.getElementById("non-prime-num-ul");

    primeUl.innerHTML = "";
    nonPrimeUl.innerHTML = "";

    for (let p = 0; p < primeNumList.length; ++p) {
        let newPrime = document.createElement("li");
        newPrime.appendChild(document.createTextNode(primeNumList[p]));
        primeUl.appendChild(newPrime);
    }

    for (let n = 0; n < nonPrimeNumList.length; ++n) {
        let newNonPrime = document.createElement("li");
        newNonPrime.appendChild(document.createTextNode(nonPrimeNumList[n]));
        nonPrimeUl.appendChild(newNonPrime);
    }
}

function getNumListSums() {
    primeNumListSum = 0;
    nonPrimeNumListSum = 0;

    for (let p = 0; p < primeNumList.length; ++p) {
        primeNumListSum += primeNumList[p];
    }

    for (let n = 0; n < nonPrimeNumList.length; ++n) {
        nonPrimeNumListSum += nonPrimeNumList[n];
    }
}

document.getElementById("generate-btn").addEventListener(
    "click",
    function() {
        numInput = document.getElementById("number-input").value;

        if (numInput == "") {
            alert("Please input a number");
            return;
        }

        primeNumList = [];
        nonPrimeNumList = [];

        createNumLists(numInput);
        displayNumLists();

        document.getElementById("number-input").value = "";
    }
);

document.getElementById("prime-sum-btn").addEventListener(
    "click",
    function() {
        let textLabel = document.getElementById("prime-sum-text");
        textLabel.innerHTML = "";
        getNumListSums();
        textLabel.innerHTML = primeNumListSum;

    }
);

document.getElementById("non-prime-sum-btn").addEventListener(
    "click",
    function() {
        let textLabel = document.getElementById("non-prime-sum-text");
        textLabel.innerHTML = "";
        getNumListSums();
        textLabel.innerHTML = nonPrimeNumListSum;
    }
);

let colors = ["LightSalmon", "HotPink", "Orange", "Moccasin", "Plum", "DarkSeaGreen", "PeachPuff", "PowderBlue", "Tan", "LightGray"];
let currentColor = 0;

function changeListColor() {
    let primeList = document.getElementById("prime-num-list");
    let nonPrimeList = document.getElementById("non-prime-num-list");

    primeList.style.backgroundColor = colors[currentColor];
    nonPrimeList.style.backgroundColor = colors[currentColor];

    if (currentColor < colors.length) {
        currentColor += 1;
    } else {
        currentColor = 0;
    }
}

setInterval(changeListColor, 5000);

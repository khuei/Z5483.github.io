let cards = new Array();
let cardCount = 0;

class Card {
    constructor(name, email, address, phone, birthDate) {
        this.name = name;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.birthDate = birthDate;
    }

    printCard() {
        let divStart = "<div class=\"card-object\"><table>";
        let nameLine = "<tr><td><strong>Name: </strong>" + this.name + "</td></tr>";
        let emailLine = "<tr><td><strong>Email: </strong>" + this.email + "</td></tr>";
        let addressLine = "<tr><td><strong>Address: </strong>" + this.address + "</td></tr>";
        let phoneLine = "<tr><td><strong>Phone: </strong>" + this.phone + "</td></tr>";
        let birthDate = "<tr><td><strong>Birthdate: </strong><input value=\"" + this.birthDate + "\" type=\"date\"></input></td></tr>";
        let divEnd = "</table><hr></div>";
        document.getElementById("card-box").innerHTML += divStart + nameLine + emailLine + addressLine + phoneLine + birthDate + divEnd;
    }
}

function createCard() {
    let newCard = new Card();

    let inputName = document.getElementById("name-input").value;
    let inputEmail = document.getElementById("email-input").value;
    let inputAddress = document.getElementById("address-input").value;
    let inputPhone = document.getElementById("phone-input").value;
    let inputBirthDate = document.getElementById("birthdate-input").value;

    if (inputName == "") {
        alert("Please input your name");
        return;
    }

    if (inputEmail == "") {
        alert("Please input your email");
        return;
    }

    if (inputAddress == "") {
        alert("Please input your address");
        return;
    }

    if (inputPhone == "") {
        alert("Please input your phone");
        return;
    }

    if (inputBirthDate == "") {
        alert("Please input your birthdate");
        return;
    }

    newCard.name = inputName;
    newCard.email = inputEmail;
    newCard.address = inputAddress;
    newCard.phone = inputPhone;
    newCard.birthDate = inputBirthDate;

    cards.push(newCard);
    cardCount += 1;

    console.log(cardCount);

    return newCard;
}

function createCardAndDisplay() {
    createCard().printCard();
}

function clearDisplay() {
    let targetCards = document.getElementById("card-box").querySelectorAll(".card-object");

    targetCards.forEach(
        function(object) {
            if (object.parentNode) {
                object.parentNode.removeChild(object);
            }
        }
    );

    document.getElementById("display-btn").addEventListener("click", displayCard);
}

function displayCard() {
    clearDisplay();
    for (let i = 0; i < cardCount; ++i) {
        cards[i].printCard();
    }

    document.getElementById("clear-btn").addEventListener("click", clearDisplay);
}


document.getElementById("submit-btn").addEventListener("click", createCard);
document.getElementById("submit-display-btn").addEventListener("click", createCardAndDisplay);

document.getElementById("display-btn").addEventListener("click", displayCard);
document.getElementById("clear-btn").addEventListener("click", clearDisplay);

document.getElementById("info-form-box").addEventListener(
    "submit",
    function(event) {
        event.preventDefault();

        document.getElementById("display-btn").addEventListener("click", displayCard);
        document.getElementById("clear-btn").addEventListener("click", clearDisplay);
    }
);

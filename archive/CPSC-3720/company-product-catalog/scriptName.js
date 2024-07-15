let carProductArr = [];

let car1 = {
    "name": "Toyota Prius",
    "make": "Toyota",
    "model": "Prius",
    "year": "2023",
    "cost": "27450",
    "quantity": "13"
}

let car2 = {
    "name": "Toyota Camry",
    "make": "Toyota",
    "model": "Camry",
    "year": "2023",
    "cost": "26420",
    "quantity": "6"
}

let car3 = {
    "name": "Toyota RAV4",
    "make": "Toyota",
    "model": "RAV4",
    "cost": "28275",
    "year": "2023",
    "quantity": "4"
}

let car4 = {
    "name": "Toyota Tacoma",
    "make": "Toyota",
    "model": "Tacoma",
    "cost": "28600",
    "year": "2023",
    "quantity": "15"
}

carProductArr.push(car1);
carProductArr.push(car2);
carProductArr.push(car3);
carProductArr.push(car4);

console.log("inventory:");
console.log(carProductArr);

console.log("Quantity of third item is: " + carProductArr[2].quantity);
console.log("Cost of third item is: " + carProductArr[2].cost);
console.log("Make of fourth item is: " + carProductArr[3].make);
console.log("Model of fourth item is: " + carProductArr[3].modek);

let weightPound = 0.0;
let heightInch = 0.0;

let weightKilogram = 0.0;
let heightMeter = 0.0;

const in_to_cm_factor = 2.54;
const in_to_m_factor = in_to_cm_factor / 100;
const lbs_to_kg_factor = 1 / 2.2046;

let bmi = 0.0;

function getInput() {
    weightPound = document.getElementById('weight-input').value;
    heightInch = document.getElementById('height-input').value;
}

function calcBMI() {
    weightKilogram = weightPound * lbs_to_kg_factor;
    heightMeter = heightInch * in_to_m_factor;

    bmi = weightKilogram / (heightMeter ** 2);
}

function outputResult() {
    console.log("Height input in inch: " + heightInch + " in");
    console.log("Weight input in pound: " + weightPound + " lbs");

    console.log("Height in centimeter: " + heightInch * in_to_cm_factor + " cm");
    console.log("Weight in kilogram: " + weightKilogram + " kg");

    document.getElementById('bmi-result').textContent = bmi.toFixed(1);

    if (bmi < 18.5) {
        document.getElementById('bmi-classification').textContent = "underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        document.getElementById('bmi-classification').textContent = "healthy";
    } else if (bmi >= 25 && bmi <= 29.9) {
        document.getElementById('bmi-classification').textContent = "overweight";
    } else if (bmi >= 30 && bmi <= 39.9) {
        document.getElementById('bmi-classification').textContent = "obese";
    }else if (bmi >= 40) {
        document.getElementById('bmi-classification').textContent = "severely obese";
    }

    console.log("BMI score: " + bmi);
}

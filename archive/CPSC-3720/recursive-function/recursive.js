function countUpTillTen(num) {
    if (num <= 10) {
        console.log(num + "\n");
        countUpTillTen(num + 1);
    } else if (num > 10) {
        return;
    }
}

console.log("Count up from 0 to 10:\n");
countUpTillTen(0);
console.log("Count up from 5 to 10:\n");
countUpTillTen(5);
console.log("Count up from 9 to 10:\n");
countUpTillTen(9);
console.log("Count up from 10 to 10:\n");
countUpTillTen(10);
console.log("Count up from 11 to 10:\n");
countUpTillTen(11);

// Logical operators: && ||

console.log(true && true);
console.log(true && false);
console.log(false && false);
console.log(false && true);


console.log(true || true);
console.log(true || false);
console.log(false || false);
console.log(false || true);

// && behaviour
let p = "Rohit";
let q = "";
console.log(p && q); // returns q because p is true

let a = 0;
let b = 20;

console.log(a && b);
// if first value is false -> returns first
// if first value is true  -> returns second

console.log(a || b);
// if first value is true  -> returns first
// if first value is false -> returns second

// !=
console.log(5 != 5); // false

// Bitwise operators: & |
// & and | works on bits

console.log(2 & 5); // 0
console.log(2 | 5); // 7

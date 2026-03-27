// Comparison operators

let x = 20;
let y = 10;

console.log(x > y);
console.log(x >= y);
console.log(x < y);
console.log(x <= y);
console.log(x == y);   // loose equality
console.log(x === y);  // strict equality (type + value)


// String -> Number
let z = "120";
let num = Number(z);
console.log(num);
console.log(typeof num);

// NaN example
let a = "121ac";
let b = Number(a);
console.log(b);
console.log(typeof b); // number

// Boolean -> Number
console.log(Number(true));  // 1
console.log(Number(false)); // 0

// null / undefined conversions
console.log(Number(null));      // 0
console.log(Number(undefined)); // NaN

// Number -> String
let n = 10;
let s = String(n);
console.log(s);
console.log(typeof s);

// undefined -> string
console.log(String(undefined));

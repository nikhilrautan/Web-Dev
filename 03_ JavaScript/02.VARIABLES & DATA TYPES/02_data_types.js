// Data types in JavaScript

// Primitive data types:
// number, string, boolean, undefined, null, bigint, symbol

// 1) number
let a = 10;
let b = 2.36;
console.log(a, b);
console.log(typeof b);

// 2) string
let firstName = "Nikhil";
let lastName = "Rautan";
console.log(typeof lastName);
console.log(firstName, lastName);

// 3) boolean
let login = true;
let isAdmin = false;
console.log(typeof isAdmin);
console.log(login, isAdmin);

// 4) undefined
let userVar;
console.log(typeof userVar);
console.log(userVar);

// 5) bigint
let bigNum = 23216378261783213461n;
console.log(typeof bigNum);
console.log(bigNum);

// 6) null
let weather = null;
console.log(typeof weather); // object (js bug but standard)
console.log(weather);

// 7) symbol
const id1 = Symbol("id");
const id2 = Symbol("id");

console.log(typeof id2);
console.log(id1 == id2); // false

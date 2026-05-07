// Data types in JavaScript

// Primitive data types:
// number, string, boolean, undefined, null, bigint, symbol

// 1) number
//Purpose: Represents both integer and floating-point numbers.
// Syntax: A numeric literal. There is no distinction between int and float.
// Special Values: Includes Infinity, -Infinity, and NaN (Not a Number).
let a = 10;
let b = 2.36;
console.log(a, b);
console.log(typeof b);

// 2) string
// Purpose: Represents textual data.
// Syntax: A sequence of characters enclosed in single quotes ('...'), double quotes ("..."), or backticks (`...`).
let firstName = "Nikhil";
let lastName = "Rautan";
console.log(typeof lastName);
console.log(firstName, lastName);

// 3) boolean
// Purpose: Represents a logical entity with two possible values.
// Syntax: The keywords true or false.
let login = true;
let isAdmin = false;
console.log(typeof isAdmin);
console.log(login, isAdmin);

// 4) undefined
// Purpose: Represents the unintentional absence of a value. A variable that has been declared but not assigned a value is automatically undefined.
let userVar;
console.log(typeof userVar);
console.log(userVar);

// 5) bigint
// Purpose: Represents whole numbers larger than the maximum safe integer value that the number type can represent.
// Syntax: An integer literal followed by the n suffix.
let bigNum = 23216378261783213461n;
console.log(typeof bigNum);
console.log(bigNum);

// 6) null
// Purpose: Represents the intentional absence of any object value. It is a primitive value that is explicitly assigned by a developer to indicate "no value."
let weather = null;
console.log(typeof weather); // object (js bug but standard)
console.log(weather);

// 7) symbol
// Purpose: Represents a unique, anonymous identifier. Symbols are primarily used as unique property keys for objects to avoid naming collisions.
// Syntax: Created using the Symbol() factory function.
const id1 = Symbol("id");
const id2 = Symbol("id");

console.log(typeof id2);
console.log(id1 == id2); // false

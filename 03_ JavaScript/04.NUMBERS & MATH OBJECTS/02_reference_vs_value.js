// Primitive vs Non-Primitive comparison

// new Number creates object (non-primitive)
let x = new Number(20);
let y = new Number(20);

console.log(x == y); // false (different references)

// Primitive number
let p = 20;
console.log(typeof p); // number

// Object reference comparison
let obj1 = { name: "Rohit" };

// same reference
let obj2 = obj1;
console.log(obj1 == obj2); // true

// different objects with same content
let obj3 = { name: "Rohit" };
console.log(obj1 == obj3); // false

// Primitive copy by value
let a = 10;
let b = a;
console.log(a == b); // true

// Strings basics

const str1 = "Nikhil Rautan";
const str2 = "Nikhil Rautan";

const day = 18;
const str3 = `I am coming on ${day}`;
console.log(str3);

const str = "Hello Coder Army";

console.log(str.length);
console.log(str[1]);

// Strings are immutable (you cannot change characters directly)
str[2] = "S";
console.log(str);

// Uppercase / Lowercase
console.log(str.toUpperCase());
console.log(str.toLowerCase());

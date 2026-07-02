// Variables and scope (let, const, block scope)

let name = "Rohit";
let age = 20;

// block scope with let
let c; // declare outside if you want to use outside block
if (true) {
  c = 90;
}

age = 30;

console.log(c);
console.log(name, age);

const account = 1234;
console.log(account);

// account = 23; // not allowed (const)

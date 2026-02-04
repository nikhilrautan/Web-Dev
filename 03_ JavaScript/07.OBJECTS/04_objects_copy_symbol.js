/*
Copy concepts (reference, shallow copy, deep copy)
Symbol key in object
*/

// Copy by reference
const user = {
  name: "Nikhil",
  age: 20,
  emailId: "nikhil@gmail.com",
  amount: 3400
};

const user2 = user;
user2.age = 90;

console.log("user:", user);
console.log("user2:", user2);

// Nested object
const user6 = {
  name: "Nikhil",
  age: 20,
  emailId: "nikhil@gmail.com",
  amount: 3400,
  address: {
    city: "Chaukhutia",
    state: "Uttarkhand"
  }
};

// Shallow copy
const shallowCopy = { ...user6 };
shallowCopy.name = "Mohan";
shallowCopy.address.city = "Dwarka";

console.log("shallowCopy:", shallowCopy);
console.log("original user6:", user6);

// Deep copy
const deepCopy = structuredClone(user6);
deepCopy.address.city = "Delhi";

console.log("deepCopy:", deepCopy);
console.log("original user6:", user6);

// Symbol key in object
const sym = Symbol("id");

const user7 = {
  name: "Nikhil",
  age: 20,
  0: 100,
  2: "Mohan",
  [sym]: "Hello Ji"
};

console.log(user7[sym]);

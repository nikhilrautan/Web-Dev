/*
Object methods and loops
*/


const user = {
  name: "Nikhil",
  age: 20,
  amount: 5000,
  aadhar: 1234,
  "home address": "Chaukhutia"
};

// Object methods
console.log(Object.keys(user));
console.log(Object.values(user));
console.log(Object.entries(user));

// for...in loop
for (let key in user) {
  console.log(key, user[key]);
}


// Loop using keys array
const tempKeys = Object.keys(user);
for (let key of tempKeys) {
  console.log(key);
}


// Loop values
for (let value of Object.values(user)) {
  console.log(value);
}


// Loop entries
for (let [key, value] of Object.entries(user)) {
  console.log(key, value);
}

/*
Objects basics and CRUD
Object = key-value pair
*/

const user = {
  name: "Nikhil",
  age: 20,
  emailId: "nikhil@gmail.com",
  amount: 3400,
  "home address": "Chaukhutia"
};

// Accessing values
console.log(user["name"]);
console.log(user.age);
console.log(user["age"]);
console.log(user["home address"]);
console.log(typeof user);

// Create / Update
user.aadhar = 1234;
user.amount = 5000;
console.log(user);

// Delete
delete user.emailId;
console.log(user);

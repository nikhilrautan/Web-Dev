/*
JavaScript Objects

Object = key-value pair
Used to store related data together.
*/

// 1) Creating an object
const user = {
  name: "Nikhil",
  age: 20,
  emailId: "nikhil@gmail.com",
  amount: 3400,
  "home address": "Chaukhutia"
};

// 2) Accessing values
console.log(user["name"]);
console.log(user.age);
console.log(user["age"]);
console.log(user["home address"]);
console.log(typeof user);

// CRUD operations
// Create / Update
user.aadhar = 1234;      // new key
user.amount = 5000;      // update existing key
console.log(user);

// Delete
delete user.emailId;
console.log(user);

// 3) Copy by reference
const user2 = user;      // points to same object
user2.age = 90;

console.log("user:", user);
console.log("user2:", user2);

// 4) Object methods
console.log(Object.keys(user));      // all keys
console.log(Object.values(user));    // all values
console.log(Object.entries(user));   // key-value pairs

// 5) Loop in object (for...in)
for (let key in user) {
  console.log(key, user[key]);
}

// Loop using Object.keys()
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

// 6) Object destructuring
const user3 = {
  name: "Nikhil",
  age: 20,
  emailId: "nikhil@gmail.com",
  amount: 3400
};

const { name: userName, age: userAge } = user3;
console.log(userName, userAge);

// 7) Array destructuring
const arr = [10, 20, 40, 90, 11];
const [first, second] = arr;
console.log(first, second);

// 8) Function inside object (this keyword)
const user4 = {
  name: "Nikhil",
  age: 20,
  greeting: function () {
    console.log(`Hello ${this.name}`);
    return 20;
  }
};

const user5 = {
  name: "Mohan",
  account: 201,
  greeting: function () {
    console.log(`Strike is coming on 18 october ${this.name}`);
    return 20;
  }
};

// function call
user5.greeting();
const val = user4.greeting();
console.log(val);

// Assign function from one object to another
user5.greeting = user4.greeting;
user5.greeting();

// 9) Nested object
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

// 10) Shallow copy
const shallowCopy = { ...user6 };
shallowCopy.name = "Mohan";
shallowCopy.address.city = "Dwarka"; // this also changes original nested object

console.log("shallowCopy:", shallowCopy);
console.log("original user6:", user6);

// 11) Deep copy
const deepCopy = structuredClone(user6);
deepCopy.address.city = "Delhi";

console.log("deepCopy:", deepCopy);
console.log("original user6:", user6);

// 12) Symbol key in object
const sym = Symbol("id");

const user7 = {
  name: "Nikhil",
  age: 20,
  0: 100,
  2: "Mohan",
  [sym]: "Hello Ji"
};

console.log(user7[sym]);

/*
Objects Basics and CRUD Operations

Object = Collection of key-value pairs.
Used to store related information together.
*/

const user = {
  // User details
  name: "Nikhil",
  age: 20,
  emailId: "nikhil@gmail.com",
  amount: 3400,

  // Keys with spaces must be written inside quotes
  "home address": "Chaukhutia"
};

// Reading/Accessing object properties


// Using bracket notation
console.log(user["name"]);

// Using dot notation
console.log(user.age);

// Bracket notation also works for normal keys
console.log(user["age"]);


// Required when key contains spaces
console.log(user["home address"]);

// typeof object returns "object"
console.log(typeof user);

// Create a new property
user.aadhar = 1234;

// Update an existing property
user.amount = 5000;

// Display updated object
console.log(user);

// Delete a property from the object
delete user.emailId;

// Display object after deletion
console.log(user);

/*
Useful Object Methods:

Object.keys(user)    -> Returns all keys
Object.values(user)  -> Returns all values
Object.entries(user) -> Returns key-value pairs

Check if a property exists:
"name" in user

Loop through object:
for (let key in user) {
    console.log(key, user[key]);
}
*/
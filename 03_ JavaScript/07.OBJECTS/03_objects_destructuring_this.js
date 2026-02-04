/*
Destructuring and this keyword
*/

const user3 = {
  name: "Nikhil",
  age: 20,
  emailId: "nikhil@gmail.com",
  amount: 3400
};

// Object destructuring
const { name: userName, age: userAge } = user3;
console.log(userName, userAge);

// Array destructuring
const arr = [10, 20, 40, 90, 11];
const [first, second] = arr;
console.log(first, second);

// this keyword in object function
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

user5.greeting();
const val = user4.greeting();
console.log(val);

// Assign function from one object to another
user5.greeting = user4.greeting;
user5.greeting();

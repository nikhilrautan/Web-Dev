// Primitive vs Non-Primitive data types

// Primitive types are copied by value (immutable in copy sense)
let a = 10;
let b = a;

b = 20;
console.log(a, b);

let str = "Nikhil";
str = "Karan";
console.log(str);

// Non-primitive types are copied by reference (mutable)

// 1) array
let arr = [10, 20, 30, 40];
arr.push(90);
arr[0] = 70;
console.log(arr);

// 2) object
let obj = {
  name: "Nikhil",
  age: 20
};

let obj2 = obj;
obj2.name = "Yogesh";

console.log(obj); // original object changes

// 3) function is also non-primitive (type = function)
let fun = function add() {
  console.log("Hello");
};

console.log(typeof fun);

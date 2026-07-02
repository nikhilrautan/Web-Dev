// Loops in arrays and copy by reference

let arr = [10, 30, 50, 90, 11];

// for loop
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// for...of loop
for (let num of arr) {
  console.log(num);
}

// copy by reference
let arr2 = arr;
arr2.push(30);

console.log("arr:", arr);
console.log("arr2:", arr2);

// const array (can change elements but cannot reassign whole array)
const a = [10, 30, 50, 90, 11];
a[2] = 30;
console.log(a);

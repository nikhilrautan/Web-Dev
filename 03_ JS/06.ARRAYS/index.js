/*
    Array = Collection of multiple values in a single variable.

    JS arrays can store:
    - numbers
    - strings
    - booleans
    - objects
    - other arrays
*/

// Example: Instead of using multiple variables
// let marks1 = 100;
// let marks2 = 50;
// let marks3 = 70;
// let marks4 = 80;

//  Use array
let marks = [100, 50, 70, 80, 90];

console.log("Marks Array:", marks);
console.log("Length of marks:", marks.length);


//1. Arrays can store mixed data types
let arr = [100, 30, "Rohit", true];

 console.log(arr[2]);           // Access element at index 2
 console.log(typeof arr);       // Array is an object in JS


//2. Update element (Arrays are mutable)

// arr[1] = 90;
// console.log(arr);


//3.push() : Insert element at the end of array

arr.push(90);
arr.push("Strike");
console.log("After push:", arr);


//4.pop() : Remove last element from array
arr.pop();
console.log("After pop:", arr);


//5.unshift() : Add element at the beginning
arr.unshift(10);
arr.unshift(50);
console.log("After unshift:", arr);


//6.shift() : Remove first element from array
arr.shift();
console.log("After shift:", arr);


//Looping in ARRAY
let nums = [10, 30, 50, 90, 11];

//1️ for loop (index based)
console.log("\nUsing for loop:");
for (let i = 0; i < nums.length; i++) {
  console.log(nums[i]);
}

//2. for...of loop (direct values)
console.log("\nUsing for...of loop:");
for (let num of nums) {
  console.log(num);
}

/*
     Copy by reference (Non-primitive type)
     
    If you do:
        let arr2 = arr;
    It does NOT create a new array.
    Both variables point to same memory location.
*/
let arr1 = [10, 30, 50, 90, 11];
let arr2 = arr1;

arr2.push(30);
console.log("\nCopy by reference:");
console.log("arr1:", arr1);
console.log("arr2:", arr2);

/*
    ===================================================
     Primitive vs Non-primitive
    ===================================================
    Primitive (copy by value): number, string, boolean
    Non-primitive (copy by reference): array, object
*/

/*
     const arrays are allowed (value can't be reassigned)
     const arr = [10,30,50];
    arr = [1,2,3];  (Not allowed)

    But:
    arr[1] = 99  (Allowed)
*/
const constArr = [10, 30, 50, 90, 11];
constArr[2] = 30;
console.log("\nConst array update:", constArr);

/*
     slice(start, end) : Creates a NEW array
    - Does not modify original array
    - end is NOT included
*/
const sliceArr = [10, 30, 50, 90, 11];
const sliceResult = sliceArr.slice(2, 4);
console.log("\nSlice Example:");
console.log("Original:", sliceArr);
console.log("slice(2,4):", sliceResult);

/*
    splice(start, deleteCount, items...)
    - Modifies original array
    - Returns deleted elements   
*/
const spliceArr = [10, 30, 50, 90, 11];
const deleted = spliceArr.splice(1, 3, "Rohit", 19);
console.log("\nSplice Example:");
console.log("Deleted elements:", deleted);
console.log("Updated array:", spliceArr);

/*
    concat() : Merge arrays (returns new array)
*/
const a1 = [10, 30, 50, 90, 11];
const a2 = ["Rohit", 11, true];
const a3 = [90, 4, false];

const mergedConcat = a1.concat(a2, a3);
console.log("\nConcat Result:", mergedConcat);

/*
 Spread Operator (...) : Easy merge arrays
*/
const mergedSpread = [...a1, ...a2, ...a3];
console.log("\nSpread Merge Result:", mergedSpread);

/*
    ===================================================
    Array methods: toString, join, includes, lastIndexOf
    ===================================================
*/
const names = ["Alice", "Rohit", "Bob", "Mohit", "Charlie"];

console.log("\nArray Methods:");
console.log("toString():", names.toString());
console.log("join('-'):", names.join("-"));
console.log("lastIndexOf('Bob'):", names.lastIndexOf("Bob"));
console.log("includes('Bobs'):", names.includes("Bobs"));

/*
    sort() and reverse()
*/
names.sort();    // Alphabetical sorting
names.reverse(); // Reverse order
console.log("Sorted + Reversed names:", names);

/*
     Sorting numbers properly using comparator
*/
const numberArr = [10, 40, 31, 71, 5, 11];

// Ascending order
numberArr.sort((a, b) => a - b);
console.log("\nAscending sort:", numberArr);

// Descending order
numberArr.sort((a, b) => b - a);
console.log("Descending sort:", numberArr);

/*
 flat() : Convert nested array into single array
*/
const nestedArr = [10, 30, 50, [40, 90, [60, 19, 99], 11], 80];

const flattened = nestedArr.flat(Infinity);
console.log("\nFlattened Array:", flattened);

// Accessing deeply nested element
console.log("nestedArr[3][2][1] =>", nestedArr[3][2][1]); // 19

/*
     Arrays are Objects in JavaScript

    You can add custom properties like objects.
*/
const x = [10, 309, "Rohit", 9.3, true];
x.name = "Mohan";

console.log("\nArray as object:", x);
console.log("Custom Property x.name:", x.name);

// slice, splice, concat, spread

const arr = [10, 30, 50, 90, 11];

// slice(start, end) -> does not change original array
const arr2 = arr.slice(2, 4);
console.log("original:", arr);
console.log("slice:", arr2);

// splice(start, deleteCount, ...items) -> changes original array
const arr3 = arr.splice(1, 3, "Rohit", 19);
console.log("deleted:", arr3);
console.log("after splice:", arr);

// concat and spread operator
const a1 = [10, 30, 50];
const a2 = ["Rohit", 11, true];
const a3 = [90, 4, false];

const merged1 = a1.concat(a2, a3);
console.log("concat:", merged1);

const merged2 = [...a1, ...a2, ...a3];
console.log("spread:", merged2);

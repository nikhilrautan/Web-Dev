// Array string methods + sorting + flat

const names = ["Alice", "Rohit", "Bob", "Mohit", "Charlie"];

console.log(names.toString());
console.log(names.join("-"));
console.log(names.lastIndexOf("Bob"));
console.log(names.includes("Bobs"));

// sort and reverse (works alphabetically)
names.sort();
names.reverse();
console.log(names);

// sorting numbers properly using comparator
const nums = [10, 40, 31, 71, 5, 11];
nums.sort((a, b) => a - b);
console.log("ascending:", nums);

nums.sort((a, b) => b - a);
console.log("descending:", nums);

// flat
const nested = [10, 30, 50, [40, 90, [60, 19, 99], 11], 80];
const flatArr = nested.flat(Infinity);

console.log(flatArr);
console.log(nested[3][2][1]); // 19

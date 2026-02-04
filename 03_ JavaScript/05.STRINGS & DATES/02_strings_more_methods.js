// String methods

const str = "Hello Coder Army Coder";

// indexOf, lastIndexOf, includes
console.log(str.indexOf("Cod"));
console.log(str.lastIndexOf("Cod"));
console.log(str.includes("cod")); // case-sensitive

// slice
console.log(str.slice(2, 7));
console.log(str.slice(3));
console.log(str.slice(-5, -2));

// substring
console.log(str.substring(2, 5));

// concatenation
const a = "Rohit";
const b = "Negi";
console.log(a + " " + b);

// number + string
console.log(24 + "Rohit");
console.log(24 + "Rohit" + 10);
console.log(24 + 30 + "Rohit");

// replaceAll
console.log(str.replaceAll("ode", "iam"));

// trim
const user = "  Rohit  Negi ";
console.log(user.trim());

// split
const names = "Rohit Mohit Suraj Rohan Anjali";
console.log(names.split(" "));
console.log(names.split(",")); // will not split because comma not present

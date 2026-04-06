// Important comparisons: null, undefined, NaN

// floating point problem
let a = 0.1;
let b = 0.2;
console.log(a + b); // 0.30000000000000004

// null comparisons
console.log(null == undefined);   // true
console.log(null === undefined);  // false



console.log(null == 0);       // false
console.log(null == "");      // false
console.log(null == false);   // false
console.log(null == true);    // false


// Comparisons with > < >= <=
// null converts to 0, undefined converts to NaN
console.log(null >= 0);       // true
console.log(null <= 0);       // true
console.log(null > 0);        // false
console.log(null < 0);        // false

console.log(undefined >= 0);  // false
console.log(null >= undefined); // false

// String compare (dictionary based)
console.log("Rohit" > "Rahit");

// number vs boolean comparison
console.log(10 < true); // true -> 1 so 10 < 1 => false (actually false)

// NaN is never equal to NaN
console.log(NaN == NaN);      // false
console.log(NaN === NaN);     // false

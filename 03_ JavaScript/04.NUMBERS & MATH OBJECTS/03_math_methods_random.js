// Math methods

console.log(Math.abs(-4));
console.log(Math.PI);
console.log(Math.LN10);
console.log(Math.SQRT2);

console.log(Math.ceil(6.3));   // 7
console.log(Math.floor(6.3));  // 6

console.log(Math.log10(20));
console.log(Math.max(20, 11, 3421, 12));

console.log(Math.random());
// random() gives value in range [0,1)

// Random from 1 to 10
console.log(Math.floor(Math.random() * 10) + 1);

// Dice (1 to 6)
console.log(Math.floor(Math.random() * 6) + 1);

// Range: 15 to 25
// formula: Math.floor(Math.random() * (max - min + 1)) + min
console.log(Math.floor(Math.random() * (25 - 15 + 1)) + 15);

// OTP generate (4 digit: 1000 to 9999)
console.log(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);

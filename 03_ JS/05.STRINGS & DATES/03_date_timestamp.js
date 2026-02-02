// Date and Timestamp

const nowDate = new Date();

console.log(nowDate);
console.log(nowDate.toString());
console.log(nowDate.toISOString());
console.log(nowDate.toLocaleString());

// local time info
console.log(nowDate.getDay());
console.log(nowDate.getDate());
console.log(nowDate.getFullYear());
console.log(nowDate.getMonth()); // 0-based month
console.log(nowDate.getHours());
console.log(nowDate.getSeconds());

// Custom date: year, month(0-based), date, hour, minute, second, ms
const customDate = new Date(2025, 8, 20, 8, 25, 16, 125);
console.log(customDate.toString());

// Timestamp
const now = Date.now();
const dates = new Date(1759275037293);

console.log(dates);
console.log(now);

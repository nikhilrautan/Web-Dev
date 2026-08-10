Node.js — Basics, Server Creation & Interview Notes

A quick-reference guide to Node.js fundamentals — what it is, how to spin up a server (with and without Express), how the event loop works, and the interview questions that come up most often.

📑 Table of Contents
1. What is Node.js
2. Key Features
3. Modules
4. Creating a Server — Core http Module
5. Creating a Server — Express
6. Event Loop
7. Interview Questions
8. Core Modules Cheat Sheet
9. Revision Sheet
1. What is Node.js

Node.js ek JavaScript runtime hai jo browser ke bahar (server side) JS chalane deta hai. Chrome ke V8 engine pe based hai.

Language nahi hai — ek runtime environment hai
Single-threaded, but non-blocking I/O ki wajah se concurrency efficiently handle karta hai
Use hota hai: backend APIs, CLI tools, real-time apps (chat, streaming)

📌 Recap: Node.js = V8 engine + JS outside the browser + async I/O.



2. Key Features
Feature	Iska matlab
Asynchronous / Non-blocking	Heavy ops (file, DB, network) background me chalte hain, thread block nahi hota
Single-threaded event loop	Ek thread pe callbacks/promises se multiple requests handle
NPM ecosystem	Sabse bada package registry, ready-made libraries
Cross-platform	Windows / Linux / Mac sab pe chalta hai

📌 Recap: Async + single thread + huge npm ecosystem.



3. Modules in Node.js

Code ko chhote reusable files me todna = module.

js
// math.js (exporting)
const add = (a, b) => a + b;
module.exports = { add };
js
// index.js (importing)
const { add } = require("./math");
console.log(add(2, 3)); // 5
Types of Modules
Type	Description	Example
Core	Built-in, no install needed	fs, http, path, os, events
Local	Files you write yourself	./math.js
Third-party	Installed via npm	express, mongoose

ES Modules (import/export) bhi use hote hain — package.json me "type": "module" set karke.

📌 Recap: Core / Local / Third-party — teen types of modules.



4. Creating a Server — Core http Module
js
// server.js
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Home Page");
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("About Page");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
bash
node server.js

📌 Recap: http.createServer + req.url / req.method checks + res.end.



5. Creating a Server — Express
bash
npm init -y
npm install express
js
// app.js
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/api/users/:id", (req, res) => {
  res.json({ id: req.params.id, name: "Test User" });
});

app.post("/api/users", (req, res) => {
  const { name } = req.body;
  res.status(201).json({ message: `User ${name} created` });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

📌 Recap: Express = routing + middleware + JSON handling, minus the boilerplate of core http.

⬆ Back to top

6. Event Loop

Node.js single-threaded hai, phir bhi concurrent kaam karta hai — iska credit jaata hai Event Loop ko.

text
Call Stack → Node APIs (async tasks) → Callback Queue → Event Loop → Call Stack
Sync code turant call stack pe run hota hai
Async tasks (setTimeout, file read, DB query) background (libuv) me chalte hain
Complete hone pe callback Callback Queue me jaata hai
Event loop check karta hai call stack khali hai ya nahi, khali ho to queue se callback utha kar run karta hai
js
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

console.log("3");

// Output: 1, 3, 2

📌 Recap: Sync first, async callbacks later — event loop hi concurrency ka core hai.


7. Interview Questions
<details> <summary><strong>Q1. Node.js single-threaded hai to concurrent requests kaise handle karta hai?</strong></summary>

Event loop + libuv (background thread pool). Blocking ops background me offload hote hain, main thread free rehta hai.

</details> <details> <summary><strong>Q2. <code>require</code> vs <code>import</code> — difference?</strong></summary>

require = CommonJS (sync, Node default). import = ES Modules (modern JS standard).

</details> <details> <summary><strong>Q3. Blocking vs Non-blocking code?</strong></summary>
js
// Blocking (synchronous)
const fs = require("fs");
const data = fs.readFileSync("file.txt", "utf-8");
console.log(data);
console.log("Runs after file read");

// Non-blocking (asynchronous)
fs.readFile("file.txt", "utf-8", (err, data) => {
  console.log(data);
});
console.log("Runs before file read completes");
</details> <details> <summary><strong>Q4. <code>process.nextTick()</code> aur microtasks kya hain?</strong></summary>

process.nextTick() aur Promises (.then) = microtask queue, jo macrotasks (setTimeout/setInterval) se pehle run hoti hai.

</details> <details> <summary><strong>Q5. Middleware kya hota hai (Express)?</strong></summary>

Function jo request-response ke beech chalta hai, route handler se pehle. next() se control aage pass hota hai.

</details> <details> <summary><strong>Q6. <code>npm</code> vs <code>npx</code>?</strong></summary>

npm = install/manage packages. npx = kisi package ko bina globally install kiye run karna.

</details> <details> <summary><strong>Q7. <code>package.json</code> vs <code>package-lock.json</code>?</strong></summary>

package.json = dependencies + metadata (version ranges). package-lock.json = exact installed versions, sabke system pe same rehne ke liye.

</details> <details> <summary><strong>Q8. Environment variables kaise use karte hain?</strong></summary>
js
// .env
PORT=3000
DB_URL=mongodb://localhost:27017/mydb
js
// app.js
require("dotenv").config();
const PORT = process.env.PORT || 3000;
</details> <details> <summary><strong>Q9. Error handling kaise karte hain?</strong></summary>
js
// try/catch
try {
  JSON.parse("invalid json");
} catch (error) {
  console.log(error.message);
}

// Express error middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
</details>



8. Core Modules Cheat Sheet
Module	Use
fs	File system ops — read/write/delete files
path	File/folder paths — path.join, path.resolve
http / https	Server creation, network requests
os	OS info — CPU, memory, platform
events	Custom events — EventEmitter class
crypto	Hashing, encryption
js
const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

emitter.emit("greet", "World");



9. Revision Sheet

30-second recap before an interview.

1   Node.js = V8 engine + JS outside browser
2   Single-threaded but non-blocking I/O → handles concurrency
3   module types: Core / Local / Third-party
4   Server: http.createServer() (manual) or Express (routing + middleware built-in)
5   Event Loop: sync runs first → async callbacks go to queue → event loop picks them up when call stack is empty
6   Microtasks (process.nextTick, Promises) run before macrotasks (setTimeout)
7   Middleware = function between request and response, calls next()
8   npm installs packages, npx runs them without installing
9   package.json = version ranges, package-lock.json = exact locked versions
10  Use .env + dotenv for config, try/catch or Express error middleware for errors

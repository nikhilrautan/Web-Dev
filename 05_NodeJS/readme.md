Node.js — Basics, Creating Server, Important Questions
Table of Contents
What is Node.js
Key Features
Modules
Creating a Server — Core http module
Creating a Server — Express
Event Loop
Important Interview Questions
Core Modules Cheat Sheet
Revision Sheet
1. What is Node.js

Node.js ek JavaScript runtime hai jo browser ke bahar (server side) JS chalane deta hai. Chrome ke V8 engine pe based hai.

Language nahi hai — ek runtime environment hai
Single-threaded, but non-blocking I/O ki wajah se concurrency efficiently handle karta hai
Use hota hai: backend APIs, CLI tools, real-time apps (chat, streaming)

One-line recap: Node.js = V8 + JS outside browser + async I/O.

2. Key Features
Feature	Iska matlab
Asynchronous / Non-blocking	Heavy ops (file, DB, network) background me chalte hain, thread block nahi hota
Single-threaded event loop	Ek thread pe callbacks/promises se multiple requests handle
NPM ecosystem	Sabse bada package registry, ready-made libraries
Cross-platform	Windows / Linux / Mac sab pe chalta hai

One-line recap: Async + single thread + huge npm ecosystem.

3. Modules in Node.js

Code ko chhote reusable files me todna = module.

js
// math.js (exporting)
const add = (a, b) => a + b;
module.exports = { add };

// index.js (importing)
const { add } = require("./math");
console.log(add(2, 3)); // 5

Types of modules

Core — built-in, no install needed (fs, http, path, os, events)
Local — khud ki banayi hui files
Third-party — npm se install (express, mongoose, ...)

ES Modules (import/export) bhi use hota hai — package.json me "type": "module" set karke.

One-line recap: Core / Local / Third-party — teen types of modules.

4. Creating a Server (Core http module)
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

Run: node server.js

One-line recap: http.createServer + req.url/req.method checks + res.end.

5. Creating a Server (Express)
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

One-line recap: Express = routing + middleware + JSON handling, minus the boilerplate of core http.

6. Event Loop (Important Concept)

Node.js single-threaded hai, phir bhi concurrent kaam karta hai — iska credit jaata hai Event Loop ko.

Call Stack -> Node APIs (async tasks) -> Callback Queue -> Event Loop -> Call Stack
Sync code turant call stack pe run hota hai
Async tasks (setTimeout, file read, DB query) background (libuv) me chalte hain
Complete hone pe callback Callback Queue me jaata hai
Event loop dekhta hai call stack khali hai ya nahi, khali ho to queue se callback utha kar run karta hai
js
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

console.log("3");

// Output: 1, 3, 2

One-line recap: Sync first, async callbacks later — event loop hi concurrency ka core hai.

7. Important Interview Questions

Q1. Node.js single-threaded hai to concurrent requests kaise handle karta hai?

Event loop + libuv (background thread pool). Blocking ops background me offload hote hain, main thread free rehta hai.

Q2. require vs import — difference?

require = CommonJS (sync, Node default). import = ES Modules (modern JS standard).

Q3. Blocking vs Non-blocking code?

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

Q4. process.nextTick() aur microtasks kya hain?

process.nextTick() aur Promises (.then) = microtask queue, jo macrotasks (setTimeout/setInterval) se pehle run hoti hai.

Q5. Middleware kya hota hai (Express)?

Function jo request-response ke beech chalta hai, route handler se pehle. next() se control aage pass hota hai.

Q6. npm vs npx?

npm = install/manage packages. npx = kisi package ko bina globally install kiye run karna.

Q7. package.json vs package-lock.json?

package.json = dependencies + metadata (version ranges). package-lock.json = exact installed versions, sabke system pe same rehne ke liye.

Q8. Environment variables kaise use karte hain?

js
// .env
PORT=3000
DB_URL=mongodb://localhost:27017/mydb
js
// app.js
require("dotenv").config();
const PORT = process.env.PORT || 3000;

Q9. Error handling kaise karte hain?

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
8. Common Core Modules Cheat Sheet
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
9. Revision Sheet (30-second recap)
Node.js = V8 engine + JS outside browser
Single-threaded but non-blocking I/O → handles concurrency
3 module types: Core / Local / Third-party
Server: http.createServer() (manual) or Express (routing + middleware built-in)
Event Loop: sync runs first → async callbacks go to queue → event loop picks them up when call stack is empty
Microtasks (process.nextTick, Promises) run before macrotasks (setTimeout)
Middleware = function between request and response, calls next()
npm installs packages, npx runs them without installing
package.json = version ranges, package-lock.json = exact locked versions
Use .env + dotenv for config, try/catch or Express error middleware for errors
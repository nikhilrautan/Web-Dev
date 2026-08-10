Express.js — Notes

A quick-reference guide to Express.js — setup, routing, middleware, request/response handling, error handling, and common interview questions.

📑 Table of Contents
1. What is Express.js
2. Setup
3. Routing
4. Middleware
5. Request and Response Objects
6. Error Handling
7. REST API Structure
8. Commonly Used Packages
9. Interview Questions
10. Revision Sheet
1. What is Express.js

Express ek minimal aur flexible Node.js framework hai jo web servers aur APIs banane ko simple bana deta hai — routing, middleware, aur request/response handling ke liye ready-made tools deta hai.

Node.js ke core http module ke upar bana hua hai
Sabse popular Node.js backend framework hai
REST APIs, web apps, aur microservices banane ke liye use hota hai

📌 Recap: Express = Node.js + easy routing + middleware support.

2. Setup
bash
npm init -y
npm install express
js
// app.js
const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
3. Routing

Routing = decide karna ki kaunsa URL + method hit hone pe kaunsa code chalega.

js
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.post("/users", (req, res) => {
  res.send("User created");
});

app.put("/users/:id", (req, res) => {
  res.send(`User ${req.params.id} updated`);
});

app.delete("/users/:id", (req, res) => {
  res.send(`User ${req.params.id} deleted`);
});
Route Parameters and Query Strings
js
// Route param: /users/101
app.get("/users/:id", (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

// Query string: /search?name=amit
app.get("/search", (req, res) => {
  res.send(`Searching for: ${req.query.name}`);
});
Router (splitting routes into files)
js
// routes/user.routes.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send("All users"));
router.get("/:id", (req, res) => res.send("Single user"));

module.exports = router;
js
// app.js
const userRoutes = require("./routes/user.routes");
app.use("/api/users", userRoutes);

📌 Recap: app.get/post/put/delete for routes, express.Router() to split routes into separate files.

4. Middleware

Middleware ek function hai jo request aur response ke beech chalta hai, route handler tak pahunchne se pehle. next() call karke control aage pass hota hai.

text
Request → Middleware 1 → Middleware 2 → Route Handler → Response
Types of Middleware
Type	Example
Built-in	express.json(), express.static()
Application-level	Custom function via app.use()
Router-level	Attached to a specific router
Error-handling	Takes 4 params: (err, req, res, next)
Third-party	cors, morgan, helmet
js
// Built-in middleware
app.use(express.json());        // parse JSON body
app.use(express.static("public")); // serve static files

// Custom middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
app.use(logger);

// Route-specific middleware
app.get("/profile", verifyJWT, (req, res) => {
  res.send(req.user);
});

📌 Recap: Middleware = function in between request and response, always call next().

5. Request and Response Objects
req property	Use
req.params	Route parameters (/users/:id)
req.query	Query string (?name=amit)
req.body	Request body (needs express.json())
req.headers	Request headers
req.cookies	Cookies (needs cookie-parser)
res method	Use
res.send()	Send text/HTML response
res.json()	Send JSON response
res.status()	Set status code
res.redirect()	Redirect to another URL
res.cookie()	Set a cookie
js
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ message: `${name} created`, email });
});
6. Error Handling
js
// Async errors - wrap in try/catch or a handler
app.get("/data", async (req, res, next) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (error) {
    next(error); // pass to error-handling middleware
  }
});

// Error-handling middleware (always LAST, 4 params required)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

Error-handling middleware hamesha sabse last me define karo, sabhi routes ke baad.

7. REST API Structure (Typical Folder Layout)
text
project/
├── controllers/     → business logic
├── models/          → database schemas
├── routes/          → route definitions
├── middlewares/     → auth, error handling, validation
├── utils/           → helper functions
├── app.js           → express app config
└── index.js         → server entry point
js
// Typical controller pattern
const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

module.exports = { getUser };
8. Commonly Used Packages
Package	Purpose
cors	Cross-origin requests allow karne ke liye
dotenv	.env file se environment variables load karna
cookie-parser	Cookies ko parse karna (req.cookies)
morgan	HTTP request logging
helmet	Security headers set karna
multer	File uploads handle karna
express-validator	Request data validation
js
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(cookieParser());
9. Interview Questions
<details> <summary><strong>Q1. Express aur Node.js <code>http</code> module me difference?</strong></summary>

http module raw hai — routing, JSON parsing sab manually likhna padta hai. Express in sab cheezo ko built-in / easy bana deta hai.

</details> <details> <summary><strong>Q2. Middleware me <code>next()</code> kyu zaroori hai?</strong></summary>

next() call na karo to request wahin atak jayegi (hang ho jayegi), agla middleware/route handler kabhi chalega hi nahi.

</details> <details> <summary><strong>Q3. <code>app.use()</code> vs <code>app.get()</code>?</strong></summary>

app.use() har HTTP method aur (agar path specify na ho to) har route pe chalta hai — mostly middleware ke liye. app.get() sirf GET requests ke liye specific route handler hai.

</details> <details> <summary><strong>Q4. Error-handling middleware normal middleware se kaise alag hai?</strong></summary>

Error-handling middleware ke 4 parameters hote hain: (err, req, res, next). Express isi signature se pehchanta hai ki ye error handler hai.

</details> <details> <summary><strong>Q5. <code>express.json()</code> kya karta hai?</strong></summary>

Incoming request ke JSON body ko parse karke req.body me available banata hai. Iske bina req.body undefined rahega.

</details> <details> <summary><strong>Q6. Router aur App me difference?</strong></summary>

express() pura application banata hai. express.Router() ek mini-app jaisa hota hai, routes ko modular groups me organize karne ke liye — phir app.use() se main app me mount hota hai.

</details>
10. Revision Sheet

30-second recap before an interview.:

Express = Node.js http module ke upar built minimal framework
Routing: app.get/post/put/delete, req.params (route params), req.query (query string)
express.Router() se routes ko separate files me split karo
Middleware = function between request and response, must call next()
Error-handling middleware = 4 params (err, req, res, next), define at the very end
req.body needs express.json() middleware to work
Common packages: cors, dotenv, cookie-parser, morgan, helmet, multer
Typical structure: controllers/, models/, routes/, middlewares/
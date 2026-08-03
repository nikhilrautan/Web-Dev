       🔐 User Auth API — Validation & Security Notes

Documentation for the API-level validation and password-security logic used in this Express + Mongoose user API.

       ⚠️ Terminology Correction — Read First

This project does not implement a digital signature. What it actually implements is password hashing (via bcrypt).

These are two different security concepts. Section 4 below explains the difference in detail, and how to add a real digital signature (JWT-based) if that's the end goal.

                 📑 Table of Contents
Project Structure:
API Endpoints
API-Level Validation
Digital Signature vs Password Hashing
Known Issues in Current Code
Quick Reference
1. Project Structure
project/
├── app.js                    # Express app + all routes
├── database.js               # DB connection (main)
├── Models/
│   └── users.js              # Mongoose User schema/model
└── utils/
    └── validateuser.js       # Manual validation logic (Layer 1)

2. API Endpoints
Method	Route	Purpose	Validation Applied
POST	/register	Create a new user	Layer 1 (validUser) + password hashing
POST	/login	Authenticate a user	bcrypt.compare() against stored hash
GET	/info	List all users	—
GET	/user/:id	Get one user by ID	—
PATCH	/user	Update a user	Layer 2 (runValidators)
DELETE	/user/:id	Delete a user	—

3. API-Level Validation

Validation happens in two layers, applied at different points in the request lifecycle.

               🧩 Layer 1 — Manual Validation

File: utils/validateuser.js Runs on: POST /register, before anything touches the database.

Check	Rule Enforced
✅ Required fields	firstName, emailId, age, password must all be present
✅ Email format	Validated using validator.isEmail()
✅ Password strength	Validated using validator.isStrongPassword()
✅ Name length	firstName must be 3–20 characters
js
function validUser(data) {
  const mandatoryField = ["firstName", "emailId", "age", "password"];
  const isAllowed = mandatoryField.every((k) => Object.keys(data).includes(k));

  if (!isAllowed) throw new Error("Fields Missing");
  if (!validator.isEmail(data.emailId)) throw new Error("Invalid Email");
  if (!validator.isStrongPassword(data.password)) throw new Error("Weak password");
  if (!(data.firstName.length > 3 && data.firstName.length <= 20))
    throw new Error("Name should have atleast 3 char and atmost 20 char");
}

If any check fails, an Error is thrown → caught by the route's catch block → an error message is sent back to the client.

               🧩 Layer 2 — Schema-Level Validation (Mongoose)

Used in: PATCH /user Mechanism: { runValidators: true }

By default, Mongoose does not re-run schema validators on findByIdAndUpdate. Passing runValidators: true forces re-validation of the updated fields against the schema — catching wrong types, missing required fields, failed enum/match rules, etc.

js
await User.findByIdAndUpdate(_id, update, { runValidators: true });
🤔 Why Two Layers?
Layer	Covers
Layer 1 (manual)	Custom, business-specific rules the schema can't express (e.g. "password must be strong")
Layer 2 (Mongoose)	Safety net re-checking the schema itself on every update, since schema validation normally only fires on create / save
4. Digital Signature vs Password Hashing
	🔑 Password Hashing (what you have)	✍️ Digital Signature (what the name implied)
Purpose	Store passwords securely; plaintext is never saved	Prove data came from a specific sender and wasn't tampered with
Mechanism	One-way function (bcrypt.hash) — irreversible	Private key signs data; public key verifies it
Verification	Re-hash attempt and compare (bcrypt.compare)	Verify signature using sender's public key
Used in this project for	POST /register, POST /login	❌ Not implemented
What Your Code Actually Does
js
// Register: hash before storing
req.body.password = await bcrypt.hash(req.body.password, 10);

// Login: compare plaintext attempt against stored hash
const isAllowed = await bcrypt.compare(req.body.password, people.password);

This is one-way hashing with salt — not signing. It protects stored passwords if the database leaks, but it does not let you verify request authenticity the way a digital signature (e.g. a JWT signed with jsonwebtoken, or an HMAC) would.

If You Want Real Digital Signatures

Add token-based authentication after login:

js
const jwt = require("jsonwebtoken");

// After successful login:
const token = jwt.sign({ _id: people._id }, "SECRET_KEY", { expiresIn: "1d" });
res.cookie("token", token);

The JWT is signed with a secret key — any tampering with the payload invalidates the signature. That's the actual "digital signature" concept, and a natural next step once login is solid.

5. Known Issues in Current Code

These were spotted while documenting the logic above. They don't affect the concepts explained, but will cause runtime crashes as currently written.

🐞 /login route
 User.findById(...) is missing await — currently returns a Promise, not the user document
 Typo: isAllowed (lowercase i) used, but declared as IsAllowed → ReferenceError
 Logging in via _id from the request body is unusual — typically you'd look up by emailId, then compare the password
🐞 utils/validateuser.js
 Typo: isAllowed used, but declared as IsAllowed → ReferenceError
 data.firstname (lowercase) used instead of data.firstName → TypeError: Cannot read properties of undefined
🐞 Error responses (all routes)
 res.send("Error " + err.message) always returns HTTP 200 OK
 Fix: use res.status(400).send(...) for client errors, res.status(500).send(...) for server errors, so consumers can detect failures properly
6. Quick Reference
Item	Location
Validation entry point	utils/validateuser.js → called first in POST /register
Schema validation on update	{ runValidators: true } in PATCH /user
Password security	bcrypt.hash() on register, bcrypt.compare() on login (hashing, not signing)
True digital signature	❌ Not yet implemented — would require JWT or similar signed-token auth
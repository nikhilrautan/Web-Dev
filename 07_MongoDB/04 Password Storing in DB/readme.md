    🔐 Password Hashing with bcrypt (Node.js)

This folder contains my learning notes and code on how passwords are securely stored in a database using the bcrypt library in Node.js.

   📌 Why not store plain text passwords?

If a database is ever hacked or leaked, storing plain text passwords means every user's password is exposed instantly. That's why we never store the raw password — we store a hashed version of it instead.

     ⚙️ What is Hashing?

Hashing is a one-way process that converts a password into a fixed-length string of characters.

✅ You can hash a password → get a hash
❌ You CANNOT reverse a hash → get back the original password

This is different from encryption, which is two-way (can be decrypted).

      🧂 What is Salt?

A salt is random data added to a password before hashing it.

Why we need salt:

If two users have the same password (e.g. 123456), without salt their hashes would be identical.
With salt, each hash becomes unique — even for the same password — making it much harder for attackers to crack passwords using precomputed tables (rainbow tables).
🔢 Salt Rounds (Cost Factor)
js
const hashpass = await bcrypt.hash(password, 10);

The 10 here is the salt rounds (also called cost factor). It tells bcrypt how many times to run the hashing algorithm internally (2^10 times).

Salt Rounds	Security	Speed
8-10	Good	Fast
10-12	Better (commonly used in production)	Slightly slower
14+	Very high	Noticeably slow

Higher rounds = more secure, but also more CPU time to hash/verify.

🧩 Anatomy of a bcrypt Hash
$2b$10$N5ehmB3b5kW1D3Mdhpl5JOr9WCkz9sqnsdjUtut8BgG5rFTzOyqcO
Part	Meaning
$2b$	bcrypt algorithm identifier/version
10	Salt rounds used
N5ehmB3b5kW1D3Mdhpl5JO	The salt (22 characters)
r9WCkz9sqnsdjUtut8BgG5rFTzOyqcO	The actual hash (31 characters)

The salt is embedded right inside the hash string — that's how bcrypt.compare() knows which salt to reuse when checking a password later.

🛠️ Core Functions Used
1. bcrypt.hash(password, saltRounds)

Hashes the password. Internally generates a salt and combines it with the password.

js
const hashpass = await bcrypt.hash(password, 10);

You can also generate salt separately (2-step way):

js
const salt = await bcrypt.genSalt(10);
const hashpass = await bcrypt.hash(password, salt);

But the 1-step version above is simpler and more commonly used.

2. bcrypt.compare(inputPassword, storedHash)

Used at login time. It re-hashes the input password using the same salt (extracted from the stored hash) and checks if it matches.

js
const isMatch = await bcrypt.compare("Nikhil", hashpass);
// returns true or false
💻 Example Code
javascript
const bcrypt = require("bcrypt");

const password = "Nikhil@123";

async function Hashing() {
  // Hash the password before storing in DB
  const hashpass = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashpass);

  // Compare plain input with stored hash (used during login)
  const ans = await bcrypt.compare("Nikhil", hashpass);
  console.log("Password Match?", ans); // false, since "Nikhil" !== "Nikhil@123"
}

Hashing();
✅ Key Takeaways
Never store plain text passwords in a database.
Always store the hashed password (hashpass).
To verify login, use bcrypt.compare(userInput, storedHash) — never compare plain strings directly.
Salt ensures identical passwords produce different hashes.
Salt rounds of 10–12 are a good balance of security and performance for production apps.
bcrypt hashes cannot be decrypted — they can only be compared against.
📚 Quick Mental Model
hash() → plain password → secure irreversible string (for storing)
compare() → checks plain input against stored hash (for login
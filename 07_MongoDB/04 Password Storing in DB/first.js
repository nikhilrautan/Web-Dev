// bcrypt library import kar rahe hain - password ko securely hash karne ke liye
const bcrypt = require("bcrypt");

// Yeh original plain password hai (isko kabhi bhi DB mein direct store mat karo!)
const password = "Nikhil@123";

async function Hashing() {
  // STEP 1: Password ko hash karna
  // bcrypt.hash(password, saltRounds) andar do kaam karta hai:
  //   1. Ek "salt" generate karta hai (random data jo password ke saath mix hota hai)
  //   2. Password + salt ko mila kar hash bana deta hai
  // saltRounds = 10 matlab algorithm 2^10 baar chalega (jitna zyada rounds, utna secure but slow)
  const hashpass = await bcrypt.hash(password, 10);

  // Note: Isko 2 alag steps mein bhi kar sakte ho:
  // const salt = await bcrypt.genSalt(10);        // pehle salt generate karo
  // const hashpass = await bcrypt.hash(password, salt); // fir usi salt se hash karo
  // Lekin dono ko ek line mein karna (jaise upar kiya) zyada common aur simple hai

  console.log("Hashed Password:", hashpass);
  // Example output: $2b$10$N5ehmB3b5kW1D3Mdhpl5JOr9WCkz9sqnsdjUtut8BgG5rFTzOyqcO
  // Hash format samjho aise:  $2b$ 10 $ [22-char salt][31-char hash]
  //   $2b$   -> bcrypt algorithm ka version/identifier
  //   10     -> cost factor (kitne salt rounds use hue)
  //   baaki  -> salt + actual hash ek saath mile hue

  // STEP 2: Plain text input ko stored hash ke saath compare karna
  // bcrypt.compare() input ko SAME salt se dobara hash karta hai (jo hashpass se nikala jata hai)
  // aur check karta hai ki dono hash match karte hain ya nahi
  const ans = await bcrypt.compare("Nikhil", hashpass);
  // Kyunki "Nikhil" !== "Nikhil@123", isliye yeh false return karega

  console.log("Password Match?", ans);
}

// Function ko call kar rahe hain
Hashing();

// ------------------------------------------
// YAAD RAKHNE WALI IMPORTANT BAATEIN:
// ------------------------------------------
// 1. Plain text password KABHI bhi database mein store mat karo.
// 2. Hamesha HASHED password store karo (hashpass).
// 3. Login ke time verify karne ke liye bcrypt.compare(userInput, storedHash) use karo
//    - direct strings compare mat karo.
// 4. Salt ki wajah se agar 2 users ka password same bhi ho,
//    unke hash alag alag dikhenge.
// 5. Jitna zyada salt rounds, utna secure but slow hoga (production mein 10-12 common hai).
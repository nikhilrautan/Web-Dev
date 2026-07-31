📸 Instagram Clone — Backend API

A simple Node.js + Express + MongoDB (Mongoose) backend demonstrating full CRUD operations with both API-level and Schema-level data validation.

🛠️ Tech Stack
Layer	Technology
Runtime	Node.js
Framework	Express.js
Database	MongoDB Atlas
ODM	Mongoose
📁 Project Structure
.
├── index.js           # Express app & all API routes
├── database.js         # MongoDB connection logic
├── Models/
│   └── users.js        # Mongoose schema/model for User
└── README.md
🚀 Getting Started
1. Install dependencies
bash
npm install express mongoose
2. Configure your database

Open database.js and update the MongoDB connection string with your own Atlas credentials.

⚠️ Security tip: Don't hardcode credentials. Use a .env file with the dotenv package instead — especially before pushing to a public repo.

3. Start the server
bash
node index.js

Or, with auto-restart on file changes:

bash
nodemon index.js
4. You're live 🎉
http://localhost:3000
📡 API Endpoints
Method	Endpoint	Description
POST	/register	Create a new user (with mandatory field check)
GET	/info	Get all users
GET	/user/:id	Get a single user by ID
DELETE	/user/:id	Delete a user by ID
PATCH	/user	Update a user (send _id + fields to update)
🧪 Example Requests
<details> <summary><strong>➕ Register a user</strong></summary>
http
POST /register
Content-Type: application/json

{
  "firstName": "Shivam",
  "lastName": "Mavi",
  "age": 30,
  "gender": "male",
  "emailId": "shivam@gmail.com"
}
</details> <details> <summary><strong>✏️ Update a user</strong></summary>
http
PATCH /user
Content-Type: application/json

{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "age": 31
}
</details>
✅ Validation Strategy

This project validates data at two levels:

1. API-level validation (in index.js) /register checks that mandatory fields — firstName, emailId, age — exist in the request body before touching the database.

⚡ Faster feedback for the client
💰 Saves an unnecessary DB round-trip

2. Schema-level validation (in Models/users.js) Enforced by Mongoose itself:

Required fields, min/max length, min/max age
Unique, lowercase, trimmed, and immutable email
Default photo if none is provided

3. runValidators on updates Mongoose skips validation during updates by default — this project explicitly re-enables it on PATCH /user so bad data can't sneak in through an edit.

🐞 Known Issues / TODO
 Casing bug: mandatoryField checks for "firstname" (lowercase), but the schema field is firstName — this mismatch will always fail the check.
 Validator bug: Gender validator uses .includes[value] instead of .includes(value) — this throws a runtime error instead of validating.
 Security: MongoDB credentials are hardcoded in database.js — move to a .env file.
 Error handling: All responses currently return 200 OK, even on failure. Add proper HTTP status codes (400, 404, 500).
📝 License

MIT — feel free to use this project for learning purposes.
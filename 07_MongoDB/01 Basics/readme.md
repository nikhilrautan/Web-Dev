# MongoDB Basics 
 
A quick intro to MongoDB — the **M** in **MERN** (MongoDB, Express, React, Node).
 
## What is MongoDB?
 
MongoDB is a **NoSQL database** that stores data as flexible, JSON-like documents instead of rows and tables like traditional SQL databases. This makes it a natural fit for JavaScript-based apps like MERN, since documents look just like JS objects.
 
```js
{
  name: "Alice",
  age: 25,
  email: "alice@example.com"
}
```
 
## Key Terms
 
| SQL         | MongoDB     |
|-------------|-------------|
| Database    | Database    |
| Table       | Collection  |
| Row         | Document    |
| Column      | Field       |
 
## Where it Fits in MERN
 
```
React (frontend) → Express + Node (backend/API) → MongoDB (database)
```
 
Your Node/Express server connects to MongoDB (usually via **Mongoose**, an ODM library) to store and retrieve data for your app.
 
## Getting Started
 
1. **Install MongoDB locally** or use **MongoDB Atlas** (free cloud database — easiest for MERN projects).
2. **Install Mongoose** in your Node project:
```bash
   npm install mongoose
```
3. **Connect to MongoDB** in your Express app:
```js
   const mongoose = require("mongoose");
 
   mongoose.connect("mongodb://localhost:27017/myApp")
     .then(() => console.log("MongoDB connected"))
     .catch((err) => console.log(err));
```
4. **Define a Schema & Model**:
```js
   const userSchema = new mongoose.Schema({
     name: String,
     email: String,
     age: Number
   });
 
   const User = mongoose.model("User", userSchema);
```
5. **Use it in your routes**:
```js
   // Create
   const newUser = await User.create({ name: "Alice", email: "alice@example.com" });
 
   // Read
   const users = await User.find();
 
   // Update
   await User.findByIdAndUpdate(id, { age: 26 });
 
   // Delete
   await User.findByIdAndDelete(id);
```
 
## Useful Links
 
- [MongoDB Atlas (free cloud DB)](https://www.mongodb.com/cloud/atlas)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [MongoDB Docs](https://www.mongodb.com/docs/)
---
*This is a starting point — as your MERN project grows, look into schema validation, relationships (refs/populate), and connecting via environment variables for production.*
 
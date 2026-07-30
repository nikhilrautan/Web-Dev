        Basic Bookstore API (Express.js)

A basic Express.js practice project. Built step by step to learn routing, middleware, and how fetch works with different HTTP methods.

        What We Did In This Project:

1. Set up a basic Express server on port 3000.

2. Created an in-memory "database" — just a plain JS array (BookStore) holding book objects (id, name, author), since we're not using a real database yet.

3. Added express.json() middleware so the server can understand JSON data sent in request bodies (req.body).

4. Built 3 routes:
   a.GET /book → returns all books
   b.GET /book/:id → returns one book by matching id (used parseInt since req.params gives strings)
   c.POST /book → pushes a new book object into the array.


5. Went through basic HTTP methods (GET, POST, PATCH, PUT, DELETE) and what each is used for conceptually, even though only GET/POST are implemented here so far.


6.Practiced fetch on the client side for GET, POST, and PATCH requests — and caught a real bug: forgot await before response.json(), which would've returned a pending Promise instead of actual data.


7. Commented the code in a simple/human way (mixed English + Hinglish) so it's easy to revisit and understand later.

                API Routes
1. Get all books

GET /book

Returns the full list of books.

Example:

GET http://localhost:3000/book
2. Get a single book by ID

GET /book/:id

Returns one book matching the given id.

Example:

GET http://localhost:3000/book/3
3. Add a new book

POST /book

Adds a new book to the list. Send data in JSON format.

Example Body:

json
{
  "id": 6,
  "name": "New Book",
  "author": "Author Name"
}

Example:

POST http://localhost:3000/book
Content-Type: application/json
Data Format

Each book object looks like this:

json
{
  "id": 1,
  "name": "Harry Potter",
  "author": "DevFlux"
}
Notes
Data is stored in memory (a simple JS array), so it resets every time the server restarts.
This project is for learning basic Express routing (GET, POST) and middleware (express.json()).
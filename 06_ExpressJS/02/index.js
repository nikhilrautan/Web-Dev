const express = require("express");
const app = express();

// Basic Bookstore project
// simple array acting as our fake database (in-memory data)
const BookStore = [
    {id:1,name:"Harry Potter", author:"DevFlux"},
    {id:2, name:"Friends", author: "Yogesh"},
    {id:3 , name:"Backend", author:"Nikhil"},
    {id:4 , name:"DSA", author:"Rohit Negi"},
    {id:5, name:"Prem Kahani", author:"Rohan"}
]

// middleware to parse incoming JSON body
// isse req.body me JSON data mil jaata hai (as JS object)
app.use(express.json());


// localhost:3000/book/3

// route to get all books
app.get("/book", (req,res)=>{ // jb bhi koi is url m aaega m ye info de dunga.

    res.send(BookStore);
})


// route to get a single book by id
app.get("/book/:id", (req,res)=>{

    // req.params se id string me aati hai, isliye number me convert kar rahe hain
    const id = parseInt(req.params.id);
    // console.log(typeof req.params.id)

    // array me se matching id wali book dhoond rahe hain
    const Book =  BookStore.find(info=> info.id===id);
    res.send(Book); 
})

// route to add a new book
app.post("/book", (req,res)=>{
    console.log(req.body); // check karne ke liye ki data sahi aa raha hai ya nahi

    // naya book object array me push kar diya
    BookStore.push(req.body);
    res.send("Data Saved Successfully");
})


// server ko port 3000 pe start kar rahe hain
app.listen(3000, ()=>{
    console.log("Listening at port 3000");
})



// // app.use("/user", (req,res)=>{

// //     res.send({name:"Rohit"})
// // })


// // parsing karni hoti hai
// app.use(express.json()); 
// //  middleware: json format data=> JS Object 

// app.get("/user", (req,res)=>{
//     // console.log(req);

//     res.send({name:"Rohit"})
// })

// app.post("/user", (req,res)=>{

//     // console.log("Data saved successfully");

//     console.log(typeof req.body.age);
//     res.send("Data Saved Successfully");
// })


// get, post, patch, put , delete
// ye sab HTTP methods hain jo alag alag kaam ke liye use hote hain
// get -> data lena
// post -> naya data bhejna
// put/patch -> data update karna
// delete -> data delete karna


// app.listen(4000, ()=>{
//     console.log("Listening at port 4000");
// })



// route match honge: app.use
// app.use kisi bhi method (get/post/etc) ke liye match karta hai

// app.get app.post app.patch app.put app.delete give me basic comments like human for my better use and comments should be straight and not fancy
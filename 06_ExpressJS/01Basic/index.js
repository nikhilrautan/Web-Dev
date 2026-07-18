const express = require("express");

const app = express();


// app.use("/abou?t",(req,res)=>{ // is ? se jo uske aaghe ka alphbet hai wo optional bn jata hai 
//     // use kroge tb bhi chlega aur nhi kroge tb bhi chlega
//    res.send({"Name": Nikhil,"age":20});
// })


app.use("/about",(req,res)=>{
   res.send({"Name": Nikhil,"age":20});
})


app.use("/contact",(req,res)=>{
  res.send("I am your contact page");
})


app.use("/detail",(req,res)=>{
   res.send("I am your detail page");
})

app.use("/",(req,res)=>{
  res.send("I am your Home page");
})
app.listen(4000,()=>{
    console.log("Listening at port 4000");
})
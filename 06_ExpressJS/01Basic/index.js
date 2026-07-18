const express = require("express");

const app = express();


// app.use("/abou?t",(req,res)=>{ // is ? se jo uske aaghe ka alphbet hai wo optional bn jata hai 
//     // use kroge tb bhi chlega aur nhi kroge tb bhi chlega
// "+" use kr k kitne bhi 'u' use krenge kuch fark ni pdega
// "*" ab 'u' k baad k baad hum kuch bhi likh skte hai , bs last m 't' aana chahiye
//    res.send({"Name": Nikhil,"age":20});
// })

// Dynamic vlaues le rhe hai isse
app.use("/about/:id",(req,res)=>{ // mtlb jo bhi vlaue vha 'id' pr hogi wo laake dedo
   res.send({"Name": Nikhil,"age":20});
})


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
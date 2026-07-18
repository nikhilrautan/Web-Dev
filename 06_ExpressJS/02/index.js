const express = require("express");
const app = express();

app.use("/user",(req,res)=>{

    res.send("Hello Coder Army")
})

app.use("/user",(req,res)=>{
    res.send({name:"Nikhil"})
})

app.listen(4000,()=>{
    console.log("Listening at port 4000");
})
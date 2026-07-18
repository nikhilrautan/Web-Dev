const express = require("express");

const app = express()

app.use((req,res)=>{
   res.send("Hello Coder Army");
})

app.listen(4000,()=>{
    console.log("Listening at port 4000");
})
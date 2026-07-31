const express = require("express");
const app = express();
const main = require("./database");
const User = require("./Models/users")

app.use(express.json());

// post api
app.post("/register", async (req,res)=>{

    try{
      await User.create(req.body);
      res.send("User Registered Successfully");
    }
    catch(err){
        res.send("Error"+ err.message);
    }
})

// get api
app.get("/info",async(req,res)=>{
   try{
       const result = await User.find();
       res.send(result);
   }
   catch(err){
    res.send("Error"+ err.message);
   }
})

app.get("/user/:id", async(req,res)=>{
    try{
      const result = await User.findById(req.params.id);
      res.send(result);
    }
    catch(err){
   res.send("Error"+ err.message);
    }
})

main()
.then(async ()=>{
    console.log("Connected to DB")
    app.listen(3000, ()=>{
        console.log("Listening at port 3000");
    })
})
.catch((err)=>console.log(err));




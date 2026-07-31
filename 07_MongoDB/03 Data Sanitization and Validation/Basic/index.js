const express = require("express");
const app = express();
const main = require("./database");
const User = require("./Models/users")

app.use(express.json());

// POST api
app.post("/register", async (req,res)=>{

    try{
      await User.create(req.body);
      res.send("User Registered Successfully");
    }
    catch(err){
        res.send("Error"+ err.message);
    }
})

// GET api
app.get("/info",async(req,res)=>{
   try{
       const result = await User.find();
       res.send(result);
   }
   catch(err){
    res.send("Error"+ err.message);
   }
})

// FIND(isse hum kisi bhi user ko search kr skte hai jiski id hmare pass available hai..)
   app.get("/user/:id", async(req,res)=>{
    try{
      const result = await User.findById(req.params.id);
      res.send(result);
    }
    catch(err){
   res.send("Error"+ err.message);
    }
})

// DELETE: User.findByIdAndDelete
 app.delete("/user/:id",async(req,res)=>{
    
    try{
      await User.findByIdAndDelete(req.params.id);
      res.send("Deleted Successfully");
      
    }
    catch(err){
        res.send("Error"+err.message);
    }
 })

 //UPDATE : findByIdAndUpdate()
 app.patch("/user",async(req,res)=>{
   
    try{
      const {_id,...update} = req.body; // destructuring kr rhe hai isse id wala alg ho jaega aur baaki sb update wale m chle jaenge..
      await User.findByIdAndUpdate(_id,update);
      res.send("Update Successfully");
    }
    catch(err){
        res.send("Error" +err.message);
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




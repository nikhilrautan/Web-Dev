const express = require("express");
const app = express();
const main = require("./database");
const User = require("./Models/users")
require('dotenv').config({ quiet: true })

app.use(express.json());

// yha jo validation krenge->(API Level Validation)

// POST api
app.post("/register", async (req,res)=>{

    try{
   // Validate: kya uske andr firstname hai bhi ki nhii? 
   // 1. DB ki cost bchegii
   // 2. User experience accha hora(no delay)
    const mandatoryField = ["firstname","emailId","age"]
               // isse hum check kr lenge ki jo jo mandatory fields bnai hai humne ky aho present hai ki nhii (agr nhii hai to error throw krega)     
    const IsAllowed = mandatoryField.every((k)=> Object.keys(req.body).includes(k));

    if(!IsAllowed)
         throw new Error("Fields Missing");


      await User.create(req.body);
      res.send("User Registered Successfully");
    }
    catch(err){
        res.send("Error "+ err.message);
    }
})

// GET api
app.get("/info",async(req,res)=>{
   try{
       const result = await User.find();
       res.send(result);
   }
   catch(err){
    res.send("Error "+ err.message);
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

                                      // API level Validation:

      await User.findByIdAndUpdate(_id,update,{"runValidators":true}); // yh apr 'runValidators' use krke hum usko bol rhe hai ki update krte k baad bhi validate krna 
      // khii glt value store na ho jae (By default ye ON nhi hota hume krna pdta hai..)
      res.send("Update Successfully");
    }
    catch(err){
        res.send("Error" +err.message);
    }
 })

main()
.then(async ()=>{
    console.log("Connected to DB")
    app.listen(package.env.PORT, ()=>{
        console.log("Listening at port 3000");
    })
})
.catch((err)=>console.log(err));




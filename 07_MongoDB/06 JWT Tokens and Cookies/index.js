const express = require("express");
const app = express();
const main = require("./database");
const User = require("./Models/users");
const validUser= require("./utils/validateuser");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser')

app.use(express.json());

// Validation k liye humne alg se ek folder bnaya hai..
app.post("/register", async (req,res)=>{
    
    try{
        validUser(req.body); // aisa assume kro ki wo validateuser yhii present hai bs usse likha/store khi aur kra hai..


        // Converting password into hashing 
        req.body.password = await bcrypt.hash(req.body.password,10);

        await User.create(req.body);
        res.send("User Registered Successfully");
    }
    catch(err){
        res.send("Error "+ err.message);
    }
})

app.post("/login",async(req,res)=>{
    
    try{
    //1. cheeje validate krna hai

    const people = User.findById(req.body._id); //  Phle user ko nikaal kr lae User.findById se(saari info people wale k andr daal di)

    if(!(req.body.emailId== people.emailId))  // check kra ki kya wo same haii?? // user user ne di hai aur jo mere pass hai
        throw new Error("Invalid credentials"); // nhi hai to error throw kro

    const IsAllowed =await bcrypt.compare(req.body.password, people.password);

    if(!isAllowed)
         throw new Error("Invalid credentials");

        // hum user ko Login krte hue hi JWT token bheje
                   // key    value
        res.cookie("Token","gvyiewbvejkbwejl");

    res.send("Login Successfully");

    }
    catch(err){
       res.send("Error "+err.message);
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
    app.listen(3000, ()=>{
        console.log("Listening at port 3000");
    })
})
.catch((err)=>console.log(err));

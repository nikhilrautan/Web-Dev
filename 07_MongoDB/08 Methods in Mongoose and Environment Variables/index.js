const express = require("express");
const app = express();
const main = require("./database");
const User = require("./Models/users");
const validUser= require("./utils/validateuser");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const userAuth = require("./middleware/userAuth");

app.use(express.json());
app.use(cookieParser());

// Validation k liye humne alg se ek folder bnaya hai..
app.post("/register", async (req,res)=>{
    console.log("REGISTER ROUTE HIT - VERSION CHECK 123");
    try{
        validUser(req.body); // aisa assume kro ki wo validateuser yhii present hai bs usse likha/store khi aur kra hai..


        // Converting password into hashing 
        req.body.password = await bcrypt.hash(req.body.password,10);

        await User.create(req.body); // ye ek object(document) create krta hai aur usko database m store kr deta hai
        res.send("User Registered Successfully");
    }
    catch(err){
        res.send("Error "+ err.message);
    }
})

app.post("/login",async(req,res)=>{
    
    try{
    //1. cheeje validate krna hai

    const people = await User.findOne({emailId:req.body.emailId}); // ab wo is emailId wale ko dhundhega
                                                                  // aur fir hume cookies dega 

    if(!(req.body.emailId== people.emailId))  // check kra ki kya wo same haii?? // user user ne di hai aur jo mere pass hai
        throw new Error("Invalid credentials"); // nhi hai to error throw kro

    // const IsAllowed =await bcrypt.compare(req.body.password, people.password);  
    // iska bhi humne method bna diya:::
                    // ye object -> method call -> user ne jo password bheja hai
    const isAllowed = await people.verifyPassword(req.body.password);

    if(!isAllowed)
         throw new Error("Invalid credentials");


       //     //jwt token (ab ye jwt token hum seedhe users.js m bnaenge aur fir yha call krenge)
       //                         // 1 payload..     2.document sign krne k liye (key..)   3.kb expire hoga,seconds->100sec ya fir string->"10d"
       //    const token= jwt.sign({_id:people._id, emailId:people.emailId},"Nikhil@1347",{expiresIn:100});

        //aise call krenge--->
        const token = people.getJWT();

        // hum user ko Login krte hue hi JWT token bheje
                   // key    value
        res.cookie("Token",token);

    res.send("Login Successfully");

    }
    catch(err){
       res.send("Error "+err.message);
    }
})


// FIND(isse hum kisi bhi user ko search kr skte hai jiski id hmare pass available hai..)
   app.get("/user",userAuth, async(req,res)=>{
    try{
        // yha pr jo saara code hume likhna pd rha tha ab wo middleware k through use kr rhe hai
   res.send(req.result);
  }
    catch(err){
   res.send("Error"+ err.message);
    }
})

// DELETE: User.findByIdAndDelete
 app.delete("/user/:id",userAuth,async(req,res)=>{
    
    try{
      await User.findByIdAndDelete(req.params.id);
      res.send("Deleted Successfully");
      
    }
    catch(err){
        res.send("Error"+err.message);
    }
 })

 //UPDATE : findByIdAndUpdate()
 app.patch("/user",userAuth,async(req,res)=>{
   
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
    app.listen(process.env.PORT, ()=>{
        console.log("Listening at port 3000");
    })
})
.catch((err)=>console.log(err));

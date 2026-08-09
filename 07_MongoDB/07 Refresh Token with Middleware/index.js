const express = require("express");
const app = express();
const main = require("./database");
const User = require("./Models/users");
const validUser= require("./utils/validateuser");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cookieParser());

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

    const people = await User.findOne({emailId:req.body.emailId}); // ab wo is emailId wale ko dhundhega
                                                                  // aur fir hume cookies dega 

    if(!(req.body.emailId== people.emailId))  // check kra ki kya wo same haii?? // user user ne di hai aur jo mere pass hai
        throw new Error("Invalid credentials"); // nhi hai to error throw kro

    const IsAllowed =await bcrypt.compare(req.body.password, people.password);

    if(!isAllowed)
         throw new Error("Invalid credentials");

        //jwt token
                            // 1 payload..     2.document sign krne k liye (key..)   3.kb expire hoga,seconds->100sec ya fir string->"10d"
       const token= jwt.sign({_id:people._id, emailId:people.emailId},"Nikhil@1347",{expiresIn:100});

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
   app.get("/user", async(req,res)=>{
    try{
        const {token}= req.cookies;
         const payload= jwt.verify(token,"Nikhil@1347");
        console.log(payload);
        
       const result = await User.findById(payload._id); 
       res.send(result);
// ab jb hum us user ki info ko get krenge to vha pr payload phle se present hoga
//  to bina 'id' expose kre hum uski info ko return kra skte hai..
   
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

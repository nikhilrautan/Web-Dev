const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../Models/users");

// Basically humne same functionality/ behaviour wale api calls ko ek saath likh diya hai taaki hume uhne excess aur update krne m aasani ho aur wo same kaam kr rhe hai wo ek saath aa jae

const authRouter = ecpress.Router();
// ab jha jha pr 'app' likha tha uski jgh 'authRouter' use krenge

// Validation k liye humne alg se ek folder bnaya hai..
authRouter.post("/register", async (req,res)=>{
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

authRouter.post("/login",async(req,res)=>{
    
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

// logout api

// 1st solution : response me invalid cookies send krdo taaki wo firse jo nya token bheja tha usse login na ho pae
// 2nd solution : jo cookies hai vhi expire krdo 
authRouter.post("/logout",async(req,res)=>{

    try{                        // isse cookies expire ho jaengi..
         res.send("token",null,{expires: new Date(Date.now())});
         res.send("Logged out Successfully");
    }
    catch(err){
        res.send("Error: "+err.message);
    }
})

module.exports = authRouter;
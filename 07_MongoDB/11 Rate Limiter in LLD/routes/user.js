const express = require("express");
const userRouter = express.Router();  
const userAuth = require("../middleware/userAuth");
const User = require("../Models/users");


  userRouter.get("/user",userAuth, async(req,res)=>{
    try{
        // yha pr jo saara code hume likhna pd rha tha ab wo middleware k through use kr rhe hai
   res.send(req.result);
  }
    catch(err){
   res.send("Error"+ err.message);
    }
})

// DELETE: User.findByIdAndDelete
 userRouter.delete("/user/:id",userAuth,async(req,res)=>{
    
    try{
      await User.findByIdAndDelete(req.params.id);
      res.send("Deleted Successfully");
      
    }
    catch(err){
        res.send("Error"+err.message);
    }
 })

 //UPDATE : findByIdAndUpdate()
 userRouter.patch("/user",userAuth,async(req,res)=>{
   
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

 module.exports = userRouter;
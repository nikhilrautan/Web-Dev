const jwt = require('jsonwebtoken');
const User = require("../Models/users");
const redisClient = require('../config/redis');

// req.get/post/delete.. krne k liye to sbse phle user ko authenticate krna hota hai to us Authentication code ko humne yha likh diya aur as a middleware attach krwa diya 
const userAuth = async (req,res,next)=>{

     try{
            const {token}= req.cookies;
            if(!token){
                throw new Error("Token doesn't exist");
            }
             const payload= jwt.verify(token,process.SECRET_KEY);
            // console.log(payload);
             
             const {_id}= payload;
    
             if(!_id){
                throw new Error("Id is missing");
             }
            
           const result = await User.findById(payload._id); 
           res.send(result);
    // ab jb hum us user ki info ko get krenge to vha pr payload phle se present hoga
    //  to bina 'id' expose kre hum uski info ko return kra skte hai..
         
           if(!result){
            throw new Error("User Doesn't Exist");
           }
           // ek baar user Authenticate ho gya to next pr chle jao..

            // ab jo result aaya tha usko hum re.result m combine kr denge
           
                const IsBlocked = redisClient.exists(`token:${token}`);
                // agr blocklist m hoga to error throw krenge
                if(IsBlocked)
                {
                    throw new Error("Invalid Token");
                }
            //
            req.result = result;
            next();
    }
        catch(err){
       res.send("Error: "+ err.message);
        }
    }
    
module.exports = userAuth;
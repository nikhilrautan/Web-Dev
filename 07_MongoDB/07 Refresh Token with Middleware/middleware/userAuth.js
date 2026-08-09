const jwt = require('jsonwebtoken');
const userAuth = async (req,res,next)=>{

     try{
            const {token}= req.cookies;
            if(!token){
                throw new Error("Token doesn't exist");
            }
             const payload= jwt.verify(token,"Nikhil@1347");
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

           next();
    }
        catch(err){
       res.send("Error: "+ err.message);
        }
    }
    

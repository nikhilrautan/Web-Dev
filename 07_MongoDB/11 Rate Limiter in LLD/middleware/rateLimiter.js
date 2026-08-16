// Rate Limiter hume jo heavy DB calls hai unko faltu m call krne se bchata hai
const redisClient = require('../config/redis');

const rateLimiter = async (req,res,next)=>{

    try{
        const ip = req.ip;// isse hum client ka IP Address nikaal lenge
        const count = await redisClient.incr(ip); // key ko ek se increase kr dega (aur agr bna nhi hai phle se to bna dega auruski value 1 hogi)
        
        if(count >60)
        {
            throw new Error("User Limit Exceeded");
        }
        if(count==1)
        {
            redisClient.expire(3600);
        }
        next(); //koi bhi error/gltiyaan nhi hai to next wale m chle jao
    }
    catch(err){
        res.send("Error: "+err);
    }
}

module.exports = rateLimiter;
const jwt = require('jsonwebtoken');
const User = require("../Models/users");
const redisClient = require('../config/redis');

const rateLimiter = async (req,res,next){

    try{
        const ip = req.ip;// isse hum client ka IP Address nikaal lenge
        const count = await redisClient.incr(ip); // key ko ek se increase kr dega (aur agr bna nhi hai phle se to bna dega auruski value 1 hogi)
        
        if(count >60)
        {
            throw new Error("User Limit Exceeded");
        }
    }
    catch(err){
        res.send("Error: "+err);
    }
}

module.exports = rateLimiter;
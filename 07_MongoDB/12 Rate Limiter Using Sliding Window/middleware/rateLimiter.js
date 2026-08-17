// Rate Limiter hume jo heavy DB calls hai unko faltu m call krne se bchata hai
const redisClient = require('../config/redis');
// Total Time: 60 min
const windowSize = 3600;
const MaxRequest =60;

const rateLimiter = async (req,res,next)=>{

    try{
        const key = req.ip;
       const current_time = Date.now()/1000;
       const window_Time = current_time - windowSize; // kis time period se phle walo ko hatana hai
    }
    catch(err){
        res.send("Error: "+err);
    }
}

module.exports = rateLimiter;
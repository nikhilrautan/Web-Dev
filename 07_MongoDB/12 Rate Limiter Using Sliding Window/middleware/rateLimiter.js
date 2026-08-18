// Rate Limiter hume jo heavy DB calls hai unko faltu m call krne se bchata hai
const redisClient = require('../config/redis');
// Total Time: 60 min
const windowSize = 3600;
const MaxRequest =60;

const rateLimiter = async (req,res,next)=>{

    try{
        const key = `IP${req.ip}`;
       const current_time = Date.now()/1000; // time seconds m laane k liye 
       const window_Time = current_time - windowSize; // kis time period se phle walo ko hatana hai
           
                                    // key , min_score, max_score
       await redisClient.zRemRangeByScore(key,0,window_Time);

       // ab total no. of request kitni bchi hui hai
       const numberOfRequest = await redisClient.zCard(key);

       if(numberOfRequest>= MaxRequest){
        throw new Error("Number of Request Exceeded");
       }
       // Request add ho jaegi 
       await redisClient.zAdd(key,[{score:current_time, value:`${current_time}:${Math.random()}`}]);
    
       // key TTL increase krna (jitni baar request aai hum expiry time ko badhate jaenge)
       await redisClient.expire(key,windowSize);
    
    }
    catch(err){
        res.send("Error: "+err);
    }
}


module.exports = rateLimiter;
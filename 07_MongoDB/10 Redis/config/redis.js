const redis = require('redis');

// ab ek client create krenge
const redisClient = redis.createClient({
     username: 'default',
    password: '7pHQOB0BjHUf5S5jCcEyySjhlU9f3C2C',
    socket: {
        host: 'caring-amber-balanced-74704.db.redis.io',
        port: 14448
    }
});



module.exports = redisClient; // taaki hum isse baaki jgh bhi export kr ske
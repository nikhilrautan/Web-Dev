const jwt = require('jsonwebtoken');
const User = require("../Models/users");
const redisClient = require('../config/redis');

const rateLimiter = async (req,resizeBy,next){

    try{
        const ip = req.ip;
    }
    catch(err){
        res.send("Error: "+err);
    }
}

module.exports = rateLimiter;
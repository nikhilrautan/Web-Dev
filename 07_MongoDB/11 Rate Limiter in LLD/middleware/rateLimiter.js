const jwt = require('jsonwebtoken');
const User = require("../Models/users");
const redisClient = require('../config/redis');

const rateLimiter = async (req,resizeBy,next){

}

module.exports = rateLimiter;
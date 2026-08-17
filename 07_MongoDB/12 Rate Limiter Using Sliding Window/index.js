const express = require("express");
const app = express();
const main = require("./database");
const User = require("./Models/users");
const validUser= require("./utils/validateuser");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const userAuth = require("./middleware/userAuth");
require('dotenv').config({ quiet: true })
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const commentRouter = require("./routes/comment");
const redisClient = require("./config/redis");
const rateLimiter = require("./middleware/rateLimiter");

app.use(express.json());
app.use(cookieParser());

app.use("/auth",authRouter); // jb bhi ye '/' dekhega wo seedha authRouter wale k pass chle jaega , ab usse pta unko kaise handle krna hai
 // 1: Registration , login wali humne ek saath daaldi (route create kr diya)

 app.use("/user",userRouter);    // "/user"->isliye kra kyuki vha sbke initials user the
 //  2: get, delete, patch wale humne ek saath rkh diye

 app.use("/comment",commentRouter); // same for comment we made a seprate route..


 const InitilizeConnection = async ()=>{
   // ab hum yha pr us client ko connect kr waenge 1: Reids connect
                                                // 2: MongoDB connect
                                                // 3 : fir Server Listen
    try{
    //    await redisClient.connect();
    //    console.log("Connected to Redis");

    //    await main();
    //    console.log("Connected To MongoDB");

        await Promise.all([redisClient.connect(), main()]);
        console.log("DB Connected");

         app.listen(process.env.PORT, ()=>{
        console.log("Listening at port 3000");
    })
}
    catch(err){
      console.log("Error :"+err);
    }
 }

 InitilizeConnection();

main()
.then(async ()=>{
    console.log("Connected to DB")
    app.listen(process.env.PORT, ()=>{
        console.log("Listening at port 3000");
    })
})
.catch((err)=>console.log(err));

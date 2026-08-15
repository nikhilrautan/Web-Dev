const { JsonWebTokenError } = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const { Schema } = mongoose;

   // Schema Create kr diya..

   // yha jo validation krenge ->(Schema level Validation)
const userSchema = new Schema({
    firstName:{
        type: String
    },
    lastName:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    age:{
        type: Number,
        min: 14,
        max: 70,
        required: true,
    },
    gender:{
        type: String,
        // isse aisa hoga ki in teeno m se ek value ho tbhii register krna vrna error de dena..
        //enum: ["male","female","others"]
           // or
       validate(value){
        if(!["male","female","others"].includes(value))
        throw new Error("Invalid Gender");
       }
    },
    emailId:{
        type: String,
        required: true,
        unique: true,
        trim: true ,//extra spaces hta dega
        lowercase: true,// chahe hmne Uppercase m bheja ho pr store lowercase m hoga.
        immutable: true, // ek baar jo register ho gya wo changes nhi kr skta 
    },
    password:{
        type: String,
        requires: true,
    },
    photo:{
        type: String,
        // agr user photo nhii lgata hai to default photo dedo
        default:" (kisi default photo ka link..)This is the default photo"
    },
},{timestamps: true}) // is timestamps se kb bna hai,kb update krna hai sb pta chl jata hai


// method ko aise create krte hai
userSchema.methods.getJWT = function(){  // yha pr 'this' bhi people ko hi reflect krta hai  
     // yha pr arrow function use mt krna kyuki usme 'this' ka mtlb alag hota hai
     const ans = jwt.sign({_id:this._id, emailId:this.emailId},process.env.SECRET_KEY);
     return ans; // ab ye 'ans' return hoke vha token k andr chle jaega , jha isko call kr rhe hai..
}
 
  // same hum verifyPassword k liye kr rhe hai
                                                // yha pr jo user ne password bheja hai usko pass kr denge
userSchema.methods.verifyPassword = async function(Userpassword){
   const ans = await bcrypt.compare(Userpassword, this.password); // fir dono passwords ko compare krenge aur 'ans' kr denge
   return ans;
}

// Ab Model Create Krenge..
const User = mongoose.model("user",userSchema);
module.exports = User;

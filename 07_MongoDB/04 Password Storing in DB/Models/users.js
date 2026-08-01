const mongoose = require('mongoose');
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
        if(!["male","female","others"].includes[value])
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
    photo:{
        type: String,
        // agr user photo nhii lgata hai to default photo dedo
        default:" (kisi default photo ka link..)This is the default photo"
    },
},{timestamps: true}) // is timestamps se kb bna hai,kb update krna hai sb pta chl jata hai


// Ab Model Create Krenge..
const User = mongoose.model("user",userSchema);

module.exports = User;
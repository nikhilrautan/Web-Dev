const mongoose = require('mongoose');
const { Schema } = mongoose;

   // Schema Create kr diya..
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
        max: 70
    },
    gender:{
        type: String,
        // isse aisa hoga ki in teeno m se ek value ho tbhii register krna vrna error de dena..
        enum: ["male","female","others"]
    },
    emailId:{
        type: String,
        required: true,
        unique: true,
        trim: true ,//extra spaces hta dega
    },
    photo:{
        type: String,
        // agr user photo nhii lgata hai to default photo dedo
        default:" (kisi default photo ka link..)This is the default photo"
    },
})

// Ab Model Create Krenge..

const User = mongoose.model("user",userSchema);

module.exports = User;
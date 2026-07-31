const mongoose = require('mongoose');
const { Schema } = mongoose;

   // Schema Create kr diya..
const userSchema = new Schema({
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    age:{
        type: Number
    },
    gender:{
        type: String
    },
    emailId:{
        type: String
    },
    photo:{
        type: String
    },
})

// Ab Model Create Krenge..

const User = mongoose.model("user",userSchema);

module.exports = User;
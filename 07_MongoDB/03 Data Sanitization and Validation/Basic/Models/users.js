const mongoose = require('mongoose');
const { Schema } = mongoose;

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

const User = mongoose.model("user",userSchema);

module.exports = User;
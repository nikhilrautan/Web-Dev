const validator = require("validator");

function validUser(data){
    const mandatoryField = ["firstName","emailId","age","password"]

    const isAllowed = mandatoryField.every((k)=> Object.keys(data).includes(k));

    if(!isAllowed)
        throw new Error("Fields Missing");


    if(!validator.isEmail(data.emailId))  // ye check krega ki wo emailId valid hai ki nhii..
     throw new Error("Invalid Email");

     if(!validator.isStrongPassword(data.password)) // aise hi yha pr check krenge ki password strong hai ki nhii..
        throw new Error("Weak password");

    if(!(data.firstName.length>3  && data.firstName.length<=20)) // same for firstname length
        throw new Error("Name should have atleast 3 char and atmost 20 char");
    //Password validation karenge
    // firstName>3 max>20
};
module.exports = validUser;
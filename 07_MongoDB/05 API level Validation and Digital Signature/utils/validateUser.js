const validator = require("validator");

function validUser(data){
    const mandatoryField = ["firstName","emailId","age","password"]

    const IsAllowed = mandatoryField.every((k)=> Object.keys(data).includes(k));

    if(!isAllowed)
        throw new Error("Fields Missing");


    if(!validator.isEmail(data.emailId))  // ye check krega ki wo emailId valid hai ki nhii..
     throw new Error("Invalid Email");
    //Password validation karenge
    // firstName>3 max>20
};
module.exports = validUser;
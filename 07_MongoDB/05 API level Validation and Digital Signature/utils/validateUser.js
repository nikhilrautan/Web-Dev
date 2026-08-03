
function validateUser(){
    const mandatoryField = ["firstName","emailId","age","password"]

    const IsAllowed = mandatoryField.every((k)=> Object.keys(req.body).includes(k));

    if(!isAllowed)
        throw new Error("Fields Missing");

    //Password validation karenge
    // firstName>3 max>20
};
module.exports = validateUser;
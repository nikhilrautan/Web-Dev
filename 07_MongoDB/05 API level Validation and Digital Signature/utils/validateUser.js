
function valid(data){
    const mandatoryField = ["firstName","emailId","age","password"]

    const IsAllowed = mandatoryField.every((k)=> Object.keys(data).includes(k));

    if(!isAllowed)
        throw new Error("Fields Missing");

    //Password validation karenge
    // firstName>3 max>20
};
module.exports = valideUser;


jha jha bgi humne apni crucial info ko hard code kiya hai usko hum .env m daal dete hai 
 jaise : 1 secret key(digital sign key)
         2  

 Aur fir us KEY ko jha use kr rhe hai vha laane k liye : 'process.env.KEY_NAME'
                                                         ye ek global object hai 

        .env --> process.env (m excess krne k liye hume 'npm i dotenv') krna hota hai aur apni main js file m  import krna pdta hai .. : require('dotenv').config();

dotenv : dotenv is a zero dependency module that loads environment variables from a .env file into process.env. 
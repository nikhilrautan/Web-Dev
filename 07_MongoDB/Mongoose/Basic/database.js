const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose');

async function main(){

  // mongodb se connect ho gye
  await mongoose.connect("mongodb+srv://admin:Nikhil7@cluster0.tlchu6y.mongodb.net/");
}


main()
.then(()=>console.log("Connect to DB"))
.catch((err)=>console.log(err));
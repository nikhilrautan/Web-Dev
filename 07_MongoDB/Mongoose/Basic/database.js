const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose');

async function main(){

  // mongodb se connect ho gye
  await mongoose.connect("mongodb+srv://admin:Nikhil7@cluster0.tlchu6y.mongodb.net/Bookstore");

  // code likhna shuru...
  const userSchema = new Schema ({
    name: String,
    age:Number,
    city:String,
    gender:String
  }) 

  //Model lo create === Collection create krna (Table create krna)
  // humne ek class create krii hai..

  const User = mongoose.model("user",userSchema);
  
//Document ko create kiya hai aur Oject ko create kiya hai..
  const user1 = new User({name:"Nikhil",age:20,city:"Chaukhutia",gender:"Male"});
  await user1.save();
}



main()
.then(()=>console.log("Connect to DB"))
.catch((err)=>console.log(err));
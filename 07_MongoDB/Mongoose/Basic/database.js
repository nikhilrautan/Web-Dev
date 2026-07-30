const dns = require('dns');
const { MongoChangeStreamError } = require('mongodb');
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
 // 1 Step m poora krna 
const user1 = new User({name:"Nikhil",age:20,city:"Chaukhutia",gender:"Male"});
  await user1.save();

  // 1 Step m poora krna
  await User.create({name:"Mohan",age:30,city:"Pakistan"});

  await User.insertMany([{name:"Yogesh",age:21},{age:25,gender:"Male"}]);

  // find document
  const ans = await User.find({});
  console.log(ans);

  // find document by particulatr field
   const ans2 =await User.find({name:"Rohit"});
   console.log(result);
  

}

module.exports = main;

main()
.then(()=>console.log("Connect to DB"))
.catch((err)=>console.log(err));
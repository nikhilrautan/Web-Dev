const dns = require('dns');
const { MongoChangeStreamError } = require('mongodb');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose');

async function main(){

  // mongodb se connect ho gye
  await mongoose.connect("mongodb+srv://admin:Nikhil7@cluster0.tlchu6y.mongodb.net/Instagram");

  
}

module.exports = main;

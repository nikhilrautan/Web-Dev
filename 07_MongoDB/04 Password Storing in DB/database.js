const dns = require('dns');
const { MongoChangeStreamError } = require('mongodb');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose');

async function main(){

  // mongodb se connect ho gye
  await mongoose.connect(package.env.DB_CONNECT_KEY);

  

}

module.exports = main;

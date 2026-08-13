const dns = require('dns');
const { MongoChangeStreamError } = require('mongodb');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose');

async function main(){

  // mongodb se connect ho gye
  await mongoose.connect(process.env.DB_CONECT_KEY);

}

module.exports = main;

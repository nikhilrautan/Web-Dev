const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
// username password cluster

const url ="mongodb+srv://admin:Nikhil7@cluster0.tlchu6y.mongodb.net/?appName=Cluster0";
const client = new MongoClient(url);

// Database Name
const dbName = 'Nikhil';

async function main() {
  // Use connect method to connect to the server
  await client.connect(); // isse cluster k saath connect hue
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('user');

  // The following code examples can be pasted here...

  const findResult = await collection.find({}); // ye cursor kbhi network call nhi krta ye bs un docs ko point krta hai
  //const ans  = await findResult.toArray(); // hum .toArray se bhi kr skte the pr (ye poore data ko ek saath le aata hai) Accha nhi hai

  for await (const doc of findResult) // isse hum network call marenge
  // ye cursor hume help krega ek ek kr k documents lane m
  // jisse load km pdta hai aur ek ek kr k laate hai
    console.log(obj);
  console.log('Found documents=>',findResult);


  // Document Insertion
  // 1. insertOne:
  const insertResult = await collection.insertOne({name:"Nikhil",age:40});
  console.log('Inserted documents=>',insertResult);

  // 2. insertMany:
  const insertResult = await collection.insertMany([{a:1},{a:2},{a:3}]);
  console.log('Inserted documents=>',insertResult);

  // DATA FILTERATION
const filterDocs = await collection.find({a:3}).toArray();
console.log('Found documents filtered by {a:3}=>', filterDocs);


//UPLOAD a DOCUMENT
const updateResult = await collection.updateOne({a:3},{$set:{b:1}});
console.log('Update documents=>',updateResult);


//REMOVE DOCUMENT
const deleteResult = await collection.deleteMany({a:3});
console.log('Deleted documents=>',deleteResult);

//INDEX a COLLECTION
const indexName = await collection.createIndex({a:1});
console.log('index name =',indexName);


  return 'done.';
}


main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
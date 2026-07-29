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
  //const ans  = await findResult.toArray();

  for await (const doc of findResult) // ye cursor hume help krega ek ek kr k documents lane m
                                      // jisse load km pdta hai aur ek ek kr k laate hai
    console.log(obj);
  console.log('Found documents=>',findResult);

  return 'done.';
}


main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
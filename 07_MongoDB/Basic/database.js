const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL

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

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
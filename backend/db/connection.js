import { MongoClient, ServerApiVersion } from "mongodb";
//TODO: Improve by using one .env which stores everything and use config to grab them from backend
//import dotenv from 'dotenv'
// Load environment variables from the root .env file
//dotenv.config({ path: '../.env' })


/*const uri = `mongodb://${process.env.MONGO_ADMIN_USERNAME}:${process.env.MONGO_ADMIN_PASSWORD}` +
  `@mongodb:${process.env.MONGO_EXPOSE_PORT}`*/
  const uri = process.env.MONGO_URI

  console.log(uri)

const dbName = process.env.MONGO_INITDB_DATABASE

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log(
   "Pinged your deployment. You successfully connected to MongoDB!"
  );
} catch(err) {
  console.error(err);
}

let db = client.db(dbName);

export default db;
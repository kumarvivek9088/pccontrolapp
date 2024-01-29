
// const { MongoClient, ServerApiVersion } = require('mongodb');
// import { MongoClient,ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
// const uri = process.env.MONGO_URL;
// console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

async function dbConnect() {
  mongoose.connect(process.env.MONGODB_URI,{
  }).then(()=>{
    console.log("Successfully connected to cloud MongoDb Atlas");
  })
  .catch((e)=>{
    console.log("connection failed to mongodb");
    console.log("error",e);
  })
}
// run().catch(console.dir);

export default dbConnect
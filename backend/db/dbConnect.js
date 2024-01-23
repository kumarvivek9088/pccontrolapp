
// const { MongoClient, ServerApiVersion } = require('mongodb');
// import { MongoClient,ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
const uri = "mongodb+srv://rajputvivek9088:6uCPxQAVzQmCLmzn@cluster0.1fqusrz.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

async function dbConnect() {
  mongoose.connect(uri,{
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
import mongoose from "mongoose"
import { DB_name } from "../constants.js"


const connectDb = async () => {
  try{
   const connectionInst= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`)
   console.log(`\n MongoDB connected !!!!  DB HOST: ${connectionInst.connection.host}`)
       
  }
  catch(error){
      console.log("MongoDb connection Failed",error);
      process.exit(1)
  }
}


export default connectDb







































/*
import mongoose from "mongoose"
import { DB_name } from "./Src/constants.js"


const ConnectDB = async () => {
    try{
        const connectionInst = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`)
        console.log(` MongoDB Connected !! DB HOST: ${connectionInst.connection.host}` )
    }
     catch(error) {
        console.log("MongoDB connection Failed", error)
        process.exit(0)
    }
}


export default ConnectDB;
*/
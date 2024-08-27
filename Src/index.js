//require('dotenv').config({path: './env'})
import app from "./app.js";
import dotenv from "dotenv"
import connectDb from "./db/index.js";


dotenv.config({
   path:"./env"
})


connectDb()
.then(()=> {
   app.listen(process.env.PORT || 8000, () => {
         console.log(`server is running at port: ${process.env.PORT}`)
   })
})
.catch((error)=> {
   console.log("MongoDB connection failed !!", error);
})


















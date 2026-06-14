import dotenv from "dotenv";
dotenv.config();
import app from "./Src/app.js";
import { ConnectToDB } from "./Src/config/db.js";


ConnectToDB();




app.listen(3000,()=>{
    console.log("Server is Running")
})
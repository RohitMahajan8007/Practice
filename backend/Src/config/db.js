import mongoose from "mongoose"


export async function ConnectToDB() {

    try{
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database is Connected....")
    })
    }
    catch(error){
        console.log("Connection Faild",error);
    }    
}
import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    username:{
        type : String
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
        unique : true
    }
})

const userModel = new mongoose.model("user",userSchema);

export default userModel;
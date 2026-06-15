import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";



export async function register(req,res) {
    const {username , email , password} = req.body;

    const isAlreadyExistUser = await userModel.findOne({
        $or :[
        
            {email}
        ]
    })

    if(isAlreadyExistUser){
      return res.status(401).json({
        message : "User Already exsist"
      })
    }

    const hash = await bcrypt.hash(password,10);

    const user = await userModel.create({
        username,email,password:hash
    })

    const token = jwt.sign({
        id : user._id
    },process.env.JWT_SECRET,{expiresIn : "1d"});


    res.cookie("token",token);

    res.status(201).json({
        message : "user Register Successfully....",
        user :{
            id : user._id,
            username : user.username,
             email : user.email
        }
    })
}

export async function Login(req,res) {
 const {email , password} = req.body;
 
 const user = await userModel.findOne({
    $or:[
        {email},
    ]
 })

 if(!user){
    return res.status(404).json({
        message : "user Already exsist"
    })
 }

 const isPasswordValid = await bcrypt.compare(password ,user.password);

 if(!isPasswordValid){
    return res.status(401).json({
        message : "invalid Password"
    })
 }

   const token = jwt.sign({
     id : user._id,
   },process.env.JWT_SECRET,{expiresIn : "1d"})

   res.cookie("token",token);

   res.status(200).json({
    message : "user Login Successfully...",
    user : {
        id : user._id,
        email : user.email
    }
   })
}
export async function getMe(req,res) {
    
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    res.status(200).json({
        message : "find Login user...",
        user : {
            id : user._id,
            username : user.username,
            email : user.email
        }
    })
}

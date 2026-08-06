const { default: mongoose } = require("mongoose")
const userModel = require("../models/user.model")
const tokenBlackListModel = require("../models/blacklist.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function RegisterUserController(req,res){

   const {username , email , password } = req.body 

   if(!username || !email || !password){
    return res.status(400).json({
        message: "Please Provide All The Required Credentials"
    })
   }

   const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
   })

   if(isUserAlreadyExists){
        return res.status(400).json({
            message: "This User Already Exists"
        })
   }

   const HashedPassword = await bcrypt.hash(password,10)

   const user = await userModel.create({
    username,
    email,
    password: HashedPassword
   })

//    Remember Whenever We Make A TOKEN A SECRET KEY IS ALWAYS REQUIRE 

   const token = jwt.sign(
    {
        id: user._id,
        username: user.username
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1d"
    }
   )
   res.cookie("token",token)

   res.status(201).json({
    message: "User Registred Successfully",
    user: {
        id: user._id,
        username: user.username,
        email: user.email
    }
   })
}

async function userLogin(req,res){

    const { email , password  } = req.body
   
    // If The user is found through email that specifc user will be fetched in that user Variable 
    const user = await userModel.findOne({
       email
   })

    if(!user){
        return res.status(400).json({
            message: "Invalid Email or Password"
        })
    }
    
   const isPasswordValid = await bcrypt.compare(password, user.password)

   if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid Credentials"
        })
   }

   const token = jwt.sign(
    {
        id: user._id,
        username: user.username
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1d"
    }
   )
   
   res.cookie("token",token)

    res.status(200).json({
            message:"User Loggedin Successfully",
             user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })  
}

async function userlogOut(req, res){

    const token = req.cookies.token

    if(!token){
        return res.status(400).json({
            message: "Token Not Found"
        })
    }

    await tokenBlackListModel.create({ token })
    res.clearCookie("token")

    res.status(200).json({
        message: "User LoggedOut Successfully"
    })
}

async function getMe(req,res){

    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User Details Fetched Successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}
module.exports = {
    RegisterUserController,
    userLogin,
    userlogOut,
    getMe
}





   
const jwt = require("jsonwebtoken")
const tokenBlackListModel = require("../models/blacklist.model")


async function authUser(req, res, next){

    const token = req.cookies.token
    
    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const isTokenBlacklisted = await tokenBlackListModel.findOne({
        token
    })

    if(isTokenBlacklisted){
        return res.status(401).json({
            message: "Token is Invalid"
        })
    }
    // Kabhi Kabhi Token Expire bhi hojata hai toh express err bhejta hai is liye try and catch ka use karke handle kiya hai
    try{

    // decoded mein token mein rakha hua saara data aa jayega jisme user._id bhi hai 
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // and yaha hum wo saara data hur ek specific user kay request kay sath bhej rahe hai 
    req.user = decoded

    next()

    }
    catch(err){
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
}

module.exports = {
    authUser
}
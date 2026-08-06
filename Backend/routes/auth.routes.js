// Destructuring Router from express 

const { Router } = require("express")
const authControllers = require("../controllers/authControllers")
const authMiddleware = require("../middlewares/auth.middleware")

const authRouter = Router()


authRouter.post("/Register",authControllers.RegisterUserController)
authRouter.post("/Login",authControllers.userLogin)
authRouter.get("/Logout",authControllers.userlogOut)

// Protected Routes
authRouter.get("/Get-me",authMiddleware.authUser,authControllers.getMe)


module.exports = authRouter
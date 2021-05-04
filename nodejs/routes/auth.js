const express=require('express')
const router=express.Router()
const {isValidated,validLogIn}=require("./../middleware/validation")
const authController=require("./../controller/authController")
router.post("/register",authController.register )
router.post("/login", authController.login)
module.exports=router;
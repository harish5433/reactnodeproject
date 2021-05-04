const express=require('express')
const router=express.Router()
const userController=require("./../controller/userController")
const checkAuth=require('./../middleware/tokenVerify')
router.get("/users",checkAuth,  userController.getAllUser)
router.get("/users/:id", checkAuth, userController.getUser)
router.delete("/users/delete/:id", checkAuth, userController.deleteUser)
router.put("/users/update/:id", checkAuth, userController.updateUser)
module.exports=router;
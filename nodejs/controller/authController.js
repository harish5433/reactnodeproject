const bcrypt = require('bcrypt');
const user=require("./../models/userModel")
const db=require('./../config/conn')
const jwt=require("jsonwebtoken");
exports.register=(req, res, next)=>{
    const users=new user({
        fname:req.body.fname,
        mname:req.body.mname,
        lname:req.body.lname,
        email:req.body.email,
        password:req.body.password,
        gender:req.body.gender,
        address:req.body.address,
        state:req.body.state,
        city:req.body.city,
        zip:req.body.zip,
        usertype:2,
        status:0
    })
    users.save()
    .then((result)=>{
        res.status(201).json({
            msg:"User Register succesfully",
            user:result
        })
    })
    .catch((error) =>{
        res.status(400).json({error:error})
    })
}
exports.login= async (req, res, next) =>{
    const useremail=req.body.email;
    const password=req.body.password;
      var result= await user.findOne({email:useremail});
        if(result){
            const isMatch= await bcrypt.compare(password, result.password);
            if(isMatch){
                var token=jwt.sign({user:result}, "secret", { expiresIn:"8h"});
                res.status(200).json({
                    msg: "user found",
                    token: token,
                    user: result
                });
            } else{
                res.status(401).json({
                    message:"User password wrong"
                });
            }
        }
        else{
            res.status(401).json({
                message:"User Name wrong"
            });
        }
}
const user=require("../models/userModel")
const db=require('../config/conn')
//get all user deatil
exports.getAllUser=(req,res)=> {
    user.find({})
    .then( (result) => {
        res.status(200).json({
            result:result
        });
    })
    .catch(error=>{
        res.status(400).json({error:error})
    })
}
//get one user detail
exports.getUser=(req,res)=> {
    user.findById({_id:req.params.id})
    .then(result => {
        res.status(200).json({
            result:result
        });
    })
    .catch(error=>{
        res.status(400).json({error:error})
    })
}
// delete user
exports.deleteUser=(req, res)=>{
    user.findByIdAndDelete({_id: req.params.id})
    .then(result => {
        res.status(200).json({
            msg:"User Deleted succesfully",
            result:result
        });
    })
    .catch(error=>{
        res.status(400).json({error:error})
    })
}
//product update
exports.updateUser=(req, res)=> {
    user.findByIdAndUpdate({_id: req.params.id},{
            $set: {
                fname:req.body.fname,
                mname:req.body.mname,
                lname:req.body.lname,
                email:req.body.email,
                gender:req.body.gender,
                address:req.body.address,
                state:req.body.state,
                city:req.body.city,
                zip:req.body.zip
            }
        },
        {
            new:true,
            userFindAndModify:false  
        }
    )
    .then(result => {
        res.status(201).json({
            msg:"User Updated succesfully",
            result:result
        });
    })
    .catch(error=>{
        res.status(400).json({error:error})
    })
}
    
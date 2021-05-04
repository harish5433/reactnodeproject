const category=require("../models/categoryModel")
const db=require('../config/conn')
exports.categoryAdd=(req,res , next)=>{
    const addCategory=new category({
        cat_name: req.body.cat_name
    })
    addCategory.save()
    .then(result=>{
        res.status(201).json({
            msg:"category Added succesfully",
            result:result
        })
    })
    .catch(error=>{
        res.status(400).json({error:error})
    })
}
//get all categorydeatil
exports.getAllCategory=(req,res, next)=> {
    category.find({})
    .then((result) => {
        res.status(200).json({
            result:result
        });
    })
    .catch(error=>{
        res.status(500).json({error:error})
    })
}
//get one user detail
exports.getCategory=(req,res, next)=> {
    category.findById({_id:req.params.id})
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
exports.deleteCategory=(req, res, next)=>{
    category.findByIdAndDelete({_id: req.params.id})
    .then(result => {
        res.status(200).json({
            msg:"category Deleted succesfully",
            result:result
        });
    })
    .catch(error=>{
        res.status(400).json({error:error})
    })
}
//product update
exports.updateCategory=(req, res, next)=> {
    category.findByIdAndUpdate({_id: req.params.id},{
            $set: {
                cat_name: req.body.cat_name
            }
        },
        {
            new:true,
            userFindAndModify:false  
        }
    )
    .then(result => {
        res.status(201).json({
            msg:"category Updated succesfully",
            result:result
        });
    })
    .catch(error=>{
        res.status(400).json({error:error})
    })
}
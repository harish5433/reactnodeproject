const mongoose=require('mongoose')
const productSchema=new mongoose.Schema(
    {
        category:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        offer:{
            type:Number,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        des:{
            type:String,
            required:true
        },
        images:
            { 
            type:Array,
            required: true
          }
    },
    {
        timestamps: true
    }
)
module.exports=mongoose.model("products",productSchema)
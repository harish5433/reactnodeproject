const mongoose=require('mongoose')
const bcrypt = require('bcrypt');
const db=require('./../config/conn')
const userSchema=new mongoose.Schema(
    {
        fname:{
            type:String,
            required:true
        },
        mname:{
            type:String,
            required:true
        },
        lname:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        gender:{
            type:String,
            required:true
        },
        address:{
            type:String,
            require:true
        },
        state:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        zip:{
            type:Number,
            required:true
        },
        image:{
            type:String,
            default:''
        },
        usertype:{
            type:String
        },
        status:{
            type:String
        } ,
        resettoken:{
            type:String,
            default:''
        }

    } ,
    {
        timestamps: true
    }
)
userSchema.pre('save', async function(err, next) {
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password, 10);
    }
})
module.exports=mongoose.model("users",userSchema)
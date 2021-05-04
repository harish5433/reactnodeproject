const express=require('express');
const app=express();
const createError=require("http-error")

const bodyParser = require('body-parser')
const cors = require('cors')
var morgan = require("morgan");
const port=process.env.PORT || 8000

const auth=require('./routes/auth')
const product=require('./routes/product')
const user=require('./routes/user')
const category=require('./routes/category')

app.use(morgan("dev"))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())
app.use(express.static('public'));

app.use("/", auth)
app.use("/", product)
app.use("/", user)
app.use("/", category)

//error handler 
app.use(async (req,res, next) => {
  //  res.status(404)
    const error=new Error("not found");
    error.status=404;
   // next(createError.NotFound("not found"))
   next(error)
})
app.use(async (err, req, res, next) => {
    res.status(err.status || 500)
    res.json({error: {
        status: err.status || 500,
        message: err.message
    }})
})

app.listen(port, ()=>{
    console.log(`server run on ${port} port`)
})
const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/product", {useNewUrlParser:true, useUnifiedTopology:true})
.then( () => console.log("connect successfully"))
.catch( () => console.log(err));

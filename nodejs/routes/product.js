const express=require('express')
const router=express.Router()
const checkAuth=require('./../middleware/tokenVerify')
const multer=require("multer");
const productController=require("./../controller/productController")
const storage= multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, './public/image/');
    },
    filename : function(req,file,cb){
        cb(null, new Date().getTime()+"_"+file.originalname);
    }
});
const fileFilter= function(req, file, cb){
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(null, true);
    } else{
        cb(new Error("this type not allowed"), false);
    }
}; 
const upload=multer({
    storage:storage ,
      limits :{
        fileSize : 1024 * 1024 * 5
    },
    fileFilter : fileFilter
});
//const upload=require("./../middleware/singleImage")
router.post("/product/add", checkAuth, upload.array('image',10), productController.productAdd)
router.get("/product", checkAuth,  productController.getAllProduct)
router.get("/product/:id", checkAuth,  productController.getProductDetail)
router.delete("/product/delete/:id",checkAuth,  productController.deleteProduct)
router.put("/product/update/:id", checkAuth, productController.updateProduct)
module.exports=router;
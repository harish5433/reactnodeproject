var multer=require("multer");
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
exports.upload=multer({
    storage:storage ,
      limits :{
        fileSize : 1024 * 1024 * 5
    },
    fileFilter : fileFilter
});
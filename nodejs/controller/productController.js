const product=require("./../models/productModel")
const db=require('./../config/conn')
// add product
exports.productAdd=(req,res, next)=>{
    const addproducts=new product({
        category: req.body.category,
        name: req.body.name,
        price: req.body.price,
        offer:req.body.offer,
        quantity:req.body.quantity,
        des:req.body.des,
        images:req.files
    })
    addproducts.save()
    .then(result=>{
        res.status(201).json({
            msg:"Product Added succesfully",
            result:result
        })
    })
    .catch(error=>{
        res.status(400).json({error:error})
    })
}
// get all  product
exports.getAllProduct=(req,res, next)=>{
    const{page,limit}=req.query;
    start=parseInt(limit*(page-1));
    end=parseInt(limit*page);
    product.find({})
    .then(result => {
        let product=result;
        let total=product.length;
        if(page !==undefined && limit !=undefined){
            product=product.slice(start,end);
        }
        res.status(200).json({result:product, total:total});
    })
    .catch(error=>{
        res.status(400).json({error:error})
    })
}
// get product detail
exports.getProductDetail=(req,res, next)=>{
    product.findById({_id:req.params.id})
    .then(result => {
        res.status(200).json({
            result:result
        });
    })
    .catch(error=>{
        res.status(400).json({error:error})
    })
}
// delete product
exports.deleteProduct=(req, res, next)=>{
    product.findByIdAndDelete({_id: req.params.id})
    .then(result => {
        res.status(200).json({
            msg:"Product Deleted succesfully",
            result:result
        });
    })
    .catch(error=>{
        res.status(400).json({error:error})
    })
}
//product update
exports.updateProduct=(req, res, next)=> {
    product.findByIdAndUpdate({_id: req.params.id},{
            $set: {
                product_name: req.body.product_name,
                product_price: req.body.product_price
            }
        },
        {
            new:true,
            userFindAndModify:false  
        }
    )
    .then(result => {
        res.status(201).json({
            msg:"Product Updated succesfully",
            result:result
        });
    })
    .catch(error=>{
        res.status(400).json({error:error})
    })
}
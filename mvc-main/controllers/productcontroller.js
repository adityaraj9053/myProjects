const Product = require('../models/productmodel');
const { all } = require('../routes/productroutes');

//business Logic

const getProducts = async(req,res) => {
    try{
        const allProducts = await Product.find();
        
        if(!allProducts || allProducts.length === 0) {
            res.json({
                message: "There is No Product"
            })
        }
        
        //if we have products  >= 1
        res.status(200).json({
            success: true,
            products:allProducts,
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

const createProduct = async (req,res) => {
    try {
        const {name, price, description, category} = req.body;
        const newProduct = new Product({name, price, description, category});
        await newProduct.save();
        res.status(200).json({
            product: newProduct
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}


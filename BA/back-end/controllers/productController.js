const asyncHandler = require("express-async-handler");
const Product = require('../models/productModel');


const getProducts = asyncHandler(async (req,res) =>{
    const products = await Product.find({accountId : req.account.id});
    res.status(200).json(products);
});


const createProduct = asyncHandler(async (req,res) =>{
    console.log("The request body is :", req.body);
    const {title, price,description,category} = req.body;
    if(!title || !price || !description || !category){
        res.status(400);
      throw new Error("All fields are mandatory !");
    }
    const product = await Product.create({
        title,
        price,
        description,
        category,
        accountId : req.account.id
    })

    res.status(201).json(product);
});

const getProduct = asyncHandler(async (req,res) =>{
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Contact not found");
    }
    res.status(200).json(product);
});



const updateProduct = asyncHandler(async (req,res) =>{
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Contact not found");
    }

    if (product.accountId.toString() !== req.account.id) {
      res.status(403);
      throw new Error("User don't have permission to update other user contacts");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
  
    res.status(200).json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req,res) =>{
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Contact not found");
    }

    if (product.accountId.toString() !== req.account.id) {
      res.status(403);
      throw new Error("User don't have permission to update other user contacts");
    }

    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json(product);
});

module.exports= {getProducts,createProduct,getProduct,updateProduct,deleteProduct};
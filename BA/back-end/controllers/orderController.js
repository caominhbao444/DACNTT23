const asyncHandler = require("express-async-handler");
const Order = require('../models/orderModel');


const getOrders = asyncHandler(async (req,res) =>{
    const orders = await Order.find({});
    res.status(200).json(orders);
});

const createOrder = asyncHandler(async (req,res) =>{
    console.log("The request body is :", req.body);
    const {orderItem, shipping,payment,itemsPrice,shippingPrice,totalPrice} = req.body;
    if(!orderItem || !shipping || !payment || !itemsPrice || !shippingPrice || !totalPrice){
        res.status(400);
      throw new Error("All fields are mandatory !");
    }
    const order = await Order.create({
        orderItem,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        totalPrice,
        createBy : req.account.role,
        accountId : req.account.id
    })
    res.status(201).json(order);
});


const getOrder = asyncHandler(async (req,res) =>{
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error("Contact not found");
    }
    res.status(200).json(order);
});

const deleteOrder = asyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error("Contact not found");
    }

    

    await Order.deleteOne({ _id: req.params.id });
    res.status(200).json(order);
});

module.exports ={getOrders ,createOrder,getOrder,deleteOrder};
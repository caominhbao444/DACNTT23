const asyncHandler = require("express-async-handler");
const Post = require('../models/postModel');

const getPosts = asyncHandler(async(req,res)=>{
    const post =  await Post.find();
    res.json(post);
});


const createPost = asyncHandler(async(req,res)=>{
    res.json({message :"create Post"});
});


const getPost = asyncHandler(async(req,res)=>{
    res.json({message :"get Post"});

});

const updatePost = asyncHandler(async(req,res)=>{
    res.json({message :"update Post"});

});

const deletePost = asyncHandler(async(req,res)=>{
    res.json({message :"delete Post"});

});


module.exports={
    getPosts,
    createPost,
    getPost,
    updatePost,
    deletePost
}




const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const Account = require("../models/accountModel");

const getPosts = asyncHandler(async (req, res) => {
  try {
    const post = await Post.find();
    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

const getCurrentPosts = asyncHandler(async (req, res) => {
  try {
    const post = await Post.find({ accountId: req.account.id });
    const findAccount = await 
    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

const createPost = asyncHandler(async (req, res) => {
  try {
    const newPost = new Post({
      accountId: req.account.id,
      desc: req.body.desc,
    });
    const savePost = await newPost.save();
    res.status(200).json(savePost);
    console.log("ok");
  } catch (err) {
    res.status(500).json(err);
  }
});

const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.status(200).json(post);
});

const updatePost = asyncHandler(async (req, res) => {
  res.json({ message: "update Post" });
});

const deletePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404);
      throw new Error("Post not found");
    }

    await post.deleteOne({ _id: req.params.id });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  getPosts,
  createPost,
  getPostById,
  getCurrentPosts,
  updatePost,
  deletePost,
};

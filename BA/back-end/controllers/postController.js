const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const Account = require("../models/accountModel");
const moment = require("moment-timezone");

const getPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find();
    const accountIds = posts.map((p) => p.accountId);

    const users = await Account.find({ _id: { $in: accountIds } });

    const postsList = posts.map((p) => ({
      postId: p._id,
      desc: p.desc,
      like: p.like,
      img: p.img,
      createdAt:p.createdAt,
      account: users.find((u) => u._id.toString() === p.accountId.toString()),
    }));

    res.status(200).json(postsList);
  } catch (err) {
    res.status(500).json(err);
  }
});

const getCurrentPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({ accountId: req.account.id });
    const accountIds = posts.map((p) => p.accountId);

    const users = await Account.find({ _id: { $in: accountIds } });

    const postsList = posts.map((p) => ({
      postId: p._id,
      desc: p.desc,
      like: p.like,
      img: p.img,
      createdAt:p.createdAt,
    }));

    const inforUser = posts.map((p) =>
      users.find((u) => u._id.toString() === p.accountId.toString())
    );

    const finalResults = postsList.map((p, index) => ({
      postId: p.postId,
      desc: p.desc,
      like: p.like,
      img: p.img,
      createdAt:p.createdAt,
      id: inforUser[index]._id,
      fullname: inforUser[index].fullname,
      userimg: inforUser[index].img,
    }));

    res.status(200).json(finalResults);
  } catch (err) {
    res.status(500).json(err);
  }
});

const createPost = asyncHandler(async (req, res) => {
  try {
    const newPost = new Post({
      accountId: req.account.id,
      desc: req.body.desc,
      img: req.body.img,
      createdAt: moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss'),
    });
    const savePost = await newPost.save();
    res.status(200).json(savePost);
    console.log("ok");
  } catch (err) {
    res.status(500).json(err);
  }
});

const getPostById = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({ _id: req.params.id });

    const accountIds = posts.map((p) => p.accountId);

    const users = await Account.find({ _id: { $in: accountIds } });

    const postsList = posts.map((p) => ({
      postId: p._id,
      desc: p.desc,
      like: p.like,
      img: p.img,
    }));

    const inforUser = posts.map((p) =>
      users.find((u) => u._id.toString() === p.accountId.toString())
    );

    const finalResults = postsList.map((p, index) => ({
      postId: p.postId,
      desc: p.desc,
      like: p.like,
      img: p.img,
      createdAt: moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss'),
      id: inforUser[index]._id,
      fullname: inforUser[index].fullname,
      userimg:inforUser[index].img
    }));

    res.status(200).json(finalResults);
  } catch (err) {
    res.status(500).json(err);
  }
});


const getAllPostUser = asyncHandler(async(req,res)=>{
  try {
    const posts = await Post.find({accountId : req.params.accountId});

    const accountIds = posts.map((p) => p.accountId);

    const users = await Account.find({ _id: { $in: accountIds } });

    const postsList = posts.map((p) => ({
      postId: p._id,
      desc: p.desc,
      like: p.like,
      img: p.img,
      createdAt:p.createdAt,
    }));

    const inforUser = posts.map((p) =>
      users.find((u) => u._id.toString() === p.accountId.toString())
    );

    const finalResults = postsList.map((p, index) => ({
      postId: p.postId,
      desc: p.desc,
      like: p.like,
      img: p.img,
      createdAt:p.createdAt,
      id: inforUser[index]._id,
      fullname: inforUser[index].fullname,
      userimg: inforUser[index].img,
    }));

    res.status(200).json(finalResults);
  } catch (err) {
    res.status(500).json(err);
  }
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

const testPost = asyncHandler(async(req,res)=>{
  const posts = await Post.find({accountId : req.params.accountId});
  res.status(200).json(posts);
});

module.exports = {
  getPosts,
  createPost,
  getPostById,
  getCurrentPosts,
  updatePost,
  deletePost,
  getAllPostUser,
  testPost
};

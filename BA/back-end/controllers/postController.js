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
      like: p.likes,
      numLike: p.likes.length,
      img: p.img,
      createdAt: p.createdAt,
      updatedAt : p.updatedAt,
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
      like: p.likes,
      numLike: p.likes.length,
      img: p.img,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt
    }));

    const inforUser = posts.map((p) =>
      users.find((u) => u._id.toString() === p.accountId.toString())
    );

    const finalResults = postsList.map((p, index) => ({
      postId: p.postId,
      desc: p.desc,
      like: p.like,
      numlike: p.numLike,
      img: p.img,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
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
      createdAt: moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
    });
    const savePost = await newPost.save();
    res.status(200).json(savePost);
    console.log("ok");
  } catch (err) {
    res.status(500).json(err);
  }
});

// const getPostById = asyncHandler(async (req, res) => {

//     const posts = await Post.findById(req.params.id);
    
//     const accountIds = posts.map((p) => p.accountId);

//     const users = await Account.find({ _id: { $in: accountIds } });

//     const postsList = posts.map((p) => ({
//       postId: p._id,
//       desc: p.desc,
//       like: p.likes,
//       numLike: p.likes.length,
//       img: p.img,
//       createdAt: p.createdAt,
//       updatedAt: p.updatedAt
//     }));

//     const inforUser = posts.map((p) =>
//       users.find((u) => u._id.toString() === p.accountId.toString())
//     );

//     const finalResults = postsList.map((p, index) => ({
//       postId: p.postId,
//       desc: p.desc,
//       like: p.like,
//       numLike: p.numLike,
//       img: p.img,
//       createdAt: p.createdAt,
//       updatedAt: p.updatedAt,
//       id: inforUser[index]._id,
//       fullname: inforUser[index].fullname,
//       userimg: inforUser[index].img,
//     }));

// });

const getPostById = asyncHandler(async(req,res)=>{
  const posts = await Post.find({ _id: req.params.id });

  const users = await Account.find({ _id: { $in: posts.map(p => p.accountId) } });
  
  const finalResults = posts.map((p, index) => ({
    postId: req.params.id,
    desc: p.desc,
    like: p.like,
    numLike: p.numLike,
    img: p.img,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    id: users[index]._id,
    fullname: users[index].fullname,
    userimg: users[index].img,
  }));
  
  res.status(200).json(finalResults);
});

const getAllPostUser = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({ accountId: req.params.accountId });

    const accountIds = posts.map((p) => p.accountId);

    const users = await Account.find({ _id: { $in: accountIds } });

    const postsList = posts.map((p) => ({
      postId: p._id,
      desc: p.desc,
      like: p.likes,
      img: p.img,
      createdAt: p.createdAt,
      updatedAt : p.updatedAt
    }));

    const inforUser = posts.map((p) =>
      users.find((u) => u._id.toString() === p.accountId.toString())
    );

    const finalResults = postsList.map((p, index) => ({
      postId: p.postId,
      desc: p.desc,
      like: p.likes,
      img: p.img,
      createdAt: p.createdAt,
      updatedAt : p.updatedAt,
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
const account = await Account.findOne(req.account);
const checkPost = await Post.findById(req.params.id);
if (checkPost.accountId != account._id) {
  res.status(403).json("Không được phép chỉnh sửa");
} else {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      desc: req.body.desc,
      img:req.body.img,
      updatedAt: moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      new: true,
    }
  );
  if (!post) {
    res.status(404).json("Không tìm thấy bài viết");
  } else {
    res.status(201).json(post);
  }
}
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

const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }
  const likedByUser = post.likes.some(
    (like) => like.accountId == req.account.id
  );
  if (likedByUser) {
    await post.updateOne({
      $pull: {
        likes: { accountId: req.account.id, fullname: req.account.fullname },
      },
    });
    console.log("DisLike !!!");
  } else {
    await post.updateOne({
      $push: {
        likes: { accountId: req.account.id, fullname: req.account.fullname },
      },
    });
    console.log("Like !!!");
  }
  const updatedPost = await Post.findById(req.params.id);
  const numLikes = updatedPost.likes.length;
  res
    .status(200)
    .json({ postId: updatedPost._id, likes: updatedPost.likes, numLikes });
});

const testPost = asyncHandler(async (req, res) => {
  // const posts = await Post.find({ _id: req.params.id });
  // const postsList = posts.map((p) => ({
  //   postId: p._id,
  //   desc: p.desc,
  //   like: p.like,
  //   img: p.img,
  //   createdAt: p.createdAt,
  //   updatedAt : p.updatedAt,
  //   time:
  //     moment().tz("Asia/Ho_Chi_Minh").diff(moment(p.createdAt), "hours") +
  //     " giờ " +
  //     (moment().tz("Asia/Ho_Chi_Minh").diff(moment(p.createdAt), "minutes") %
  //       60) +
  //     " phút",
  // }));
  // res.status(200).json(postsList);
  const post = await Post.findById(req.params.id);
  res.status(200).json(post);
});

module.exports = {
  getPosts,
  createPost,
  getPostById,
  getCurrentPosts,
  updatePost,
  deletePost,
  getAllPostUser,
  testPost,
  likePost,
};

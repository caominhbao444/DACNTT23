const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const Comments = require("../models/commentsModel");

const createComments = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const newComments = new Comments({
      postId: post._id,
      accountId: req.account.id,
      content: req.body.content,
    });
    const saveNewComments = await newComments.save();
    res.status(200).json(saveNewComments);
  } catch (err) {
    res.status(500).json(err);
  }
});

const getCommentsPost = asyncHandler(async (req, res) => {
  try {
    const comments = Post.findById(req.params.id);
    res
      .status(200)
      .json({ accountId: comments.accountId, content: comments.content });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {createComments, getCommentsPost};

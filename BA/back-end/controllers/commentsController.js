const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const Comments = require("../models/commentsModel");

const createComments = asyncHandler(async (req, res) => {
  try {
    const newComments = new Comments({
      postId: req.params.id,
      senderId: req.account.id,
      content: req.body.content,
    });
    const saveNewComments = await newComments.save();
    res.status(200).json(saveNewComments);
  } catch (err) {
    res.status(500).json(err);
  }
});

const getCommentsPost = asyncHandler(async (req, res) => {
  // try {
  //   const comments = await Comments.find({
  //     postId: req.params.id,
  //   });
  //   const commentsList = comments.map((cmt)=> ({
  //     senderId : cmt.senderId,
  //     content: cmt.content
  //   }))
  //   res.status(200).json(commentsList);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
  const comments = await Comments.find({postId:req.params.id});
  res.status(200).json(comments);
});

module.exports = { createComments, getCommentsPost };

const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const Account = require("../models/accountModel");
const Comments = require("../models/commentsModel");
const moment = require("moment-timezone");

const createComments = asyncHandler(async (req, res) => {
  try {
    const newComments = new Comments({
      postId: req.params.id,
      senderId: req.account.id,
      content: req.body.content,
      createdAt: moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
    });
    const saveNewComments = await newComments.save();
    res.status(200).json(saveNewComments);
  } catch (err) {
    res.status(500).json(err);
  }
});

const getCommentsPost = asyncHandler(async (req, res) => {
  const comments = await Comments.find({ postId: req.params.id });
  const accountIds = comments.map((p) => p.senderId);

  const users = await Account.find({ _id: { $in: accountIds } });
  const inforUser = comments.map((p) =>
    users.find((u) => u._id.toString() === p.senderId.toString())
  );

  const commentList = comments.map((p, index) => ({
    _id: p._id,
    content: p.content,
    createdAt: p.createdAt,
    updatedAt : p.updatedAt,
    userId: inforUser[index]._id,
    fullname: inforUser[index].fullname,
    userimg: inforUser[index].img,
  }));
  res.status(200).json(commentList);
});

const getSingleCommentsPost = asyncHandler(async(req,res)=>{
  const comments = await Comments.find({ postId: req.params.postId, _id: req.params.id });
  const accountIds = comments.map((p) => p.senderId);

  const users = await Account.find({ _id: { $in: accountIds } });
  const inforUser = comments.map((p) =>
    users.find((u) => u._id.toString() === p.senderId.toString())
  );

  const commentList = comments.map((p, index) => ({
    _id: p._id,
    content: p.content,
    createdAt: p.createdAt,
    updatedAt : p.updatedAt,
    userId: inforUser[index]._id,
    fullname: inforUser[index].fullname,
    userimg: inforUser[index].img,
  }));
  res.status(200).json(commentList);
});

const getCommentsAllPost = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  const postIds = posts.map((p) => p._id);
  const comments = await Comments.find({ postId: { $in: postIds } });
  const accountIds = comments.map((p) => p.senderId);

  const users = await Account.find({ _id: { $in: accountIds } });
  const inforUser = comments.map((p) =>
    users.find((u) => u._id.toString() === p.senderId.toString())
  );

  const commentList = comments.map((p, index) => ({
    _id: p._id,
    content: p.content,
    postId: p.postId,
    createdAt: p.createdAt,
    updatedAt : p.updatedAt,
    userId: inforUser[index]._id,
    fullname: inforUser[index].fullname,
    userImg: inforUser[index].img,
  }));
  const postComments = [];
  for (const postId of postIds) {
    const postCommentList = commentList.filter(
      (c) => c.postId.toString() === postId.toString()
    );
    postComments.push({ postId, postComments: postCommentList });
  }
  res.status(200).json(postComments);
});

const updateComments = asyncHandler(async (req, res) => {
  const account = await Account.findOne(req.account);
  const checkComment = await Comments.findOne({
    _id : req.params.id,
    postId: req.params.postId,
  });
  if(checkComment.senderId != account._id){
    res.status(403).json("Không được phép chỉnh sửa");
  }else{
    const comment = await Comments.findByIdAndUpdate(
      req.params.id,
      {
        content: req.body.content,
        updatedAt: moment()
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        new: true,
      }
    );
    if (!comment) {
      res.status(404).json("Không tìm thấy bình luận");
    } else {
      res.status(201).json(comment);
    }
  }
 
});

module.exports = {
  createComments,
  getCommentsPost,
  getSingleCommentsPost,
  getCommentsAllPost,
  updateComments,
};

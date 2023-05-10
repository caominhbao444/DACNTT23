const asyncHandler = require("express-async-handler");
const Conversation = require("../models/conversationModel");
const Account = require("../models/accountModel");

const createConversation = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find({
    $or: [
      { senderId: req.account.id, receiverId: req.params.id },
      { senderId: req.params.id, receiverId: req.account.id },
    ],
  });
  
  if (conversations.length > 0) {
    res.status(403).json({
      checkConversation: 1,
      message: "cuộc trò chuyện đã tồn tại",
    });
  } else if (req.account.id !== req.params.id) {
    const newConversation = new Conversation({
      senderId: req.account.id,
      receiverId: req.params.id,
    });
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  }
});

const getConversationByTwoUsers = asyncHandler(async (req, res) => {
  try {
    const conversation = await Conversation.find({
      senderId: req.params.senderId,
      receiverId: req.params.receiverId,
    });
    if (conversation) {
      res.status(200).json(conversation);
    } else {
      res.status(404);
      throw new Error("Conversation not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

const getConversationsById = asyncHandler(async (req, res) => {
  try {
    const conversations = await Conversation.find({
      $or: [
        { senderId: req.account.id, receiverId: req.params.id },
        { senderId: req.params.id, receiverId: req.account.id },
      ],
    });

    const userIds = conversations.map((conver) => {
      if (conver.senderId === req.account.id) {
        return conver.receiverId;
      } else if (conver.receiverId === req.account.id) {
        return conver.senderId;
      }
    });
    const users = await Account.find({ _id: { $in: userIds } });
    const results = users.map((result) => ({
      id: result._id,
      fullname: result.fullname,
      img: result.img,
    }));

    const conversationsList = conversations.map((conver) => ({
      conversationId: conver._id,
    }));

    const finalResults = conversationsList.map((conver, index) => ({
      conversationId: conver.conversationId,
      id: results[index].id,
      fullname: results[index].fullname,
      img: results[index].img,
    }));
    res.status(200).json(finalResults);
  } catch (err) {
    res.status(500).json(err);
  }
});

const getCurrentConversations = asyncHandler(async (req, res) => {
  try {
    const conversations = await Conversation.find({
      $or: [{ senderId: req.account.id }, { receiverId: req.account.id }],
    });

    const userIds = conversations.map((conver) => {
      if (conver.senderId === req.account.id) {
        return conver.receiverId;
      } else if (conver.receiverId === req.account.id) {
        return conver.senderId;
      }
    });
    const users = await Account.find({ _id: { $in: userIds } });
    const results = users.map((result) => ({
      id: result._id,
      fullname: result.fullname,
      img: result.img,
    }));

    const conversationsList = conversations.map((conver) => ({
      conversationId: conver._id,
    }));

    const finalResults = conversationsList.map((conver, index) => ({
      conversationId: conver.conversationId,
      id: results[index].id,
      fullname: results[index].fullname,
      img: results[index].img,
    }));
    res.status(200).json(finalResults);
  } catch (err) {
    res.status(500).json(err);
  }
});

const testc = asyncHandler(async (req, res) => {
  try {
    const conversations = await Conversation.find({
      $or: [{ senderId: req.account.id }, { receiverId: req.account.id }],
    });

    const userIds = conversations.map((conver) => {
      if (conver.senderId === req.account.id) {
        return conver.receiverId;
      } else if (conver.receiverId === req.account.id) {
        return conver.senderId;
      }
    });
    const users = await Account.find({ _id: { $in: userIds } });
    const results = users.map((result) => ({
      id: result._id,
      fullname: result.fullname,
      img: result.img,
    }));

    const conversationsList = conversations.map((conver) => ({
      conversationId: conver._id,
    }));

    const finalResults = conversationsList.map((conver, index) => ({
      conversationId: conver.conversationId,
      id: results[index].id,
      fullname: results[index].fullname,
      img: results[index].img,
    }));
    res.status(200).json(finalResults);
  } catch (err) {
    res.status(500).json(err);
  }
});

const deleteConversation = asyncHandler(async(req,res)=>{
  try {
    const conversation = await Conversation.findById(req.params.id);
    if (!conversation) {
      res.status(404);
      throw new Error("Post not found");
    }

    await Conversation.deleteOne({ _id: req.params.id });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  createConversation,
  getConversationByTwoUsers,
  getConversationsById,
  getCurrentConversations,
  deleteConversation,
  testc,
};

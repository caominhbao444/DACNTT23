const asyncHandler = require("express-async-handler");
const Conversation = require("../models/conversationModel");
const Account = require("../models/accountModel");

const createConversation = asyncHandler(async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      senderId: req.account.id,
      receiverId: req.params.id,
    });
    if (conversation) {
      res
        .status(201)
        .json({ checkConversation: 1, message: "cuộc trò chuyện đã tồn tại" });
    } else if (!conversation && req.account.id != req.params.id) {
      const newConversation = new Conversation({
        senderId: req.account.id,
        receiverId: req.params.id,
      });
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    }
  } catch (err) {
    res.status(500).json(err);
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
    const conversation = await Conversation.findOne({receiverId : req.params.id});

    const findAccount = await Account.find({_id : conversation.receiverId})
      const reciverList = findAccount.map((receiver) =>({
        _id : receiver._id,
        fullname: receiver.fullname
      }))
      res.status(200).json(reciverList)
  } catch (err) {
    res.status(500).json(err);
  }
});

const getCurrentConversations = asyncHandler(async (req, res) => {
  try {
    const conversation = await Conversation.find({ senderId: req.account.id });
    // const conversationId = conversation.map((conver) => ({
    //   _id: conver._id,
    // }));
    const findReceiver = await Account.find(conversation.receiverId);
    const reciverList = findReceiver.map((receiver) => ({
      _id: receiver._id,
      fullname: receiver.fullname,
    }));
    // res.status(200).json({conversationId,reciverList});
    res.status(200).json(reciverList);
  } catch (err) {
    res.status(201).json("Không có cuộc hội thoại");
  }
});

const testc = asyncHandler(async (req, res) => {
  const conversation = await Conversation.find({ senderId: req.account.id });
  // const conversationId = conversation.map((conver) => ({
  //   _id: conver._id,
  // }));
  const findReceiver = await Account.find(conversation.receiverId);

  res.status(200).json(findReceiver);
});

module.exports = {
  createConversation,
  getConversationByTwoUsers,
  getConversationsById,
  getCurrentConversations,
  testc,
};

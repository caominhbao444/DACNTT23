const asyncHandler = require("express-async-handler");
const Conversation = require("../models/conversationModel");
const Account = require("../models/accountModel");

const createConversation = asyncHandler(async (req, res) => {
  try {
    const conversation = await Conversation.findOne({senderId : req.account.id, receiverId : req.params.id});
    if(conversation){
      res.status(201).json({checkConversation : 1,message:"cuộc trò chuyện đã tồn tại"});
    }else if (!conversation && req.account.id != req.params.id ) {
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

const getConversation = asyncHandler(async (req, res) => {
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

const getConversations = asyncHandler(async (req, res) => {
  try {
    const conversation = await Conversation.find({ senderId: req.params.id });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

const testc = asyncHandler(async (req, res) => {
  res.status(200).json("OK");
});

module.exports = {
  createConversation,
  getConversation,
  getConversations,
  testc,
};

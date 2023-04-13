const asyncHandler = require("express-async-handler");
const Conversation = require("../models/conversationModel");
const User = require("../models/userModel");

const createConversation = asyncHandler(async (req, res) => {
  try {
    const currentUser = await User.findOne({ accountId: req.account.id });
    const user = await User.findById(req.params.id);
    if (currentUser != user) {
      const newConversation = new Conversation({
        senderId: currentUser._id,
        receiverId: user._id,
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
      res.status(400);
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

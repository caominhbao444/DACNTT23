const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");
const User = require("../models/userModel");

const createMessage = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ accountId: req.account.id });
    const conversation = await Conversation.findById(req.params.id);
    if (user && req.params.id == conversation._id) {
      const message = new Message({
        conversationId: conversation._id,
        senderId: user._id,
        text: req.body.text,
      });
      const savedMessage = await message.save();
      res.status(200).json(savedMessage);
    } else {
      res.status(400);
      throw new Error("cant create message");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

const getMessage = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

const testm = asyncHandler(async (req, res) => {
  res.status(200).json("OK");
});

module.exports = { createMessage, getMessage, testm };

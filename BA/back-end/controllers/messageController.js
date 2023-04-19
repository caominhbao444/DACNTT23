const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");
const Account = require("../models/accountModel");

const createMessage = asyncHandler(async (req, res) => {
  try {
    const message = new Message({
      conversationId: req.params.id,
      senderId: req.account.id,
      fullname: req.account.fullname,
      text: req.body.text,
    });
    const savedMessage = await message.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//params = receiverId => conversation (receiverId : req.params.id && senderId : account._id)
const getMessage = asyncHandler(async (req, res) => {
  // try {
  //   const account = await Account.findOne(req.account);
  //   if(account){
  //     const conversation = await Conversation.findOne({receiverId :req.params.id});
  //     const messages = await Message.find({
  //       conversationId: conversation._id,
  //     });
  //     res.status(200).json(messages);
  //   }else{
  //     res.status(404).json("Account Not Found")
  //   }
  // } catch (err) {
  //   res.status(500).json(err);
  // }
  const message = await Message.find({ conversationId: req.params.id });
  res.status(200).json(message);
});

const testm = asyncHandler(async (req, res) => {
  const messages = await Conversation.find({ receiverId: req.params.id });
  const conversationIds = messages.map((message) => message._id);

  res.status(200).json(conversationIds);
});

module.exports = { createMessage, getMessage, testm };

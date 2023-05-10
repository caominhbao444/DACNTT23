const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");
const Account = require("../models/accountModel");
const moment = require("moment-timezone");


const createMessage = asyncHandler(async (req, res) => {
  try {
    const account = await Account.findOne(req.account);
    const message = new Message({
      conversationId: req.params.id,
      senderId: account.id,
      fullname: account.fullname,
      img:account.img,
      text: req.body.text,
      createdAt: moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss'),
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

const deleteMessage = asyncHandler(async(req,res)=>{
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      res.status(404);
      throw new Error("Message not found");
    }

    await Message.deleteOne({ _id: req.params.id });
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
});

const testm = asyncHandler(async (req, res) => {
  // const messages = await Conversation.find({ receiverId: req.params.id });
  // const conversationIds = messages.map((message) => message._id);
  const account = await Account.findOne(req.account);
  res.status(200).json(account);
});

module.exports = { createMessage, getMessage, deleteMessage,testm };

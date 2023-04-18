const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");
const Account = require("../models/accountModel")

const createMessage = asyncHandler(async (req, res) => {
  try {
    const account = await Account.findOne(req.account);
    if(account){
      const conversation = await Conversation.findOne({receiverId :req.params.id});
      if (conversation) {
        const message = new Message({
          conversationId: conversation._id,
          senderId: account._id,
          fullname : account.fullname,
          text: req.body.text,
        });
        const savedMessage = await message.save();
        res.status(200).json(savedMessage);
      } else {
        res.status(403);
        throw new Error("cant create message");
      }
    }else{
      res.status(404).json("Account Not Found")
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


//params = receiverId => conversation (receiverId : req.params.id && senderId : account._id)
const getMessage = asyncHandler(async (req, res) => {
  try {
    

    const account = await Account.findOne(req.account);
    if(account){
      const conversation = await Conversation.findOne({receiverId :req.params.id});
      const messages = await Message.find({
        conversationId: conversation._id,
      });
      res.status(200).json(messages);
    }else{
      res.status(404).json("Account Not Found")
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

const testm = asyncHandler(async (req, res) => {

  const message = await Message.find({conversationId :req.params.id});


  res.status(200).json(message);
});

module.exports = { createMessage, getMessage, testm };

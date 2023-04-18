const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");
const Account = require("../models/accountModel")

const createMessage = asyncHandler(async (req, res) => {
  try {
    const account = await Account.findOne({accountId : req.account.id})
    if(account){
      const conversation = await Conversation.findOne({receiverId :req.params.id});
      if (conversation) {
        const message = new Message({
          conversationId: conversation._id,
          senderId: req.account.id,
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



const getMessage = asyncHandler(async (req, res) => {
  try {
    const account = await Account.findOne({accountId : req.account.id})
    if(account){
      const conversation = await Conversation.findOne({receiverId :req.params.id});
      const messages = await Message.find({
        conversationId: conversation._id,
      });
      const findAccount = await Account.findOne(messages.senderId)
      const list = messages.map((message) =>({
        senderId : findAccount._id,
        fullname : findAccount.fullname,
        text : message.text
      }))
      res.status(200).json(list)
    }else{
      res.status(404).json("Account Not Found")
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
});

const testm = asyncHandler(async (req, res) => {
 
  res.status(200).json("OK");
});

module.exports = { createMessage, getMessage, testm };

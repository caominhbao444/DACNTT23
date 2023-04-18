const asyncHandler = require("express-async-handler");
const Conversation = require("../models/conversationModel");
const Account = require("../models/accountModel");

const createConversation = asyncHandler(async (req, res) => {
  try {
    const account = await Account.findOne(req.account);
    if (account) {
      const conversation = await Conversation.findOne({
        senderId: account._id,
        receiverId: req.params.id,
      });
      if (conversation) {
        res.status(201).json({
          checkConversation: 1,
          message: "cuộc trò chuyện đã tồn tại",
        });
      } else if (!conversation && account._id != req.params.id) {
        const newConversation = new Conversation({
          senderId: account._id,
          receiverId: req.params.id,
        });
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
      }
    } else {
      res.status(404).json("Account Not Found");
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
    const account = await Account.findOne(req.account);
    const conversations = await Conversation.find({
      senderId: account._id,
      receiverId: req.params.id,
    });

    const conversationList = conversations.map((conver) => conver._id);

    const findAccount = await Account.find({
      _id: { $in: conversations.map((conver) => conver.receiverId) },
    });
    const receiverList = findAccount.map((receiver) => ({
      receiverId: receiver._id,
      fullname: receiver.fullname,
    }));
    const results = conversationList.map((conver, index) => ({
      conversationId: conver,
      receiverId: receiverList[index].receiverId,
      fullname: receiverList[index].fullname,
    }));
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

const getCurrentConversations = asyncHandler(async (req, res) => {
  try {
    const account = await Account.findOne(req.account);
    const conversations = await Conversation.find({
      senderId: account._id,
    }).select("receiverId");
    const receiverIds = conversations.map(
      (conversation) => conversation.receiverId
    );
    const receivers = await Account.find({ _id: { $in: receiverIds } });

    const results = receivers.map((result) => ({
      id: result._id,
      fullname: result.fullname,
    }));

    const finalResults = conversations.map((conver, index) => ({
      conversationId: conver._id,
      receiverId: results[index].id,
      fullname: results[index].fullname,
    }));
    res.status(200).json(finalResults);
  } catch (err) {
    res.status(201).json("Không có cuộc hội thoại");
  }
});

const testc = asyncHandler(async (req, res) => {
  const account = await Account.findOne(req.account);
  const conversations = await Conversation.find({
    senderId: account._id,
  });
const conversationIds = conversations.map(conversation => ({ id: conversation._id }));

  res.status(200).json(conversations);
});

module.exports = {
  createConversation,
  getConversationByTwoUsers,
  getConversationsById,
  getCurrentConversations,
  testc,
};

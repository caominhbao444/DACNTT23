const express = require("express");
const router = express.Router();
const { createConversation, getConversation, getConversations, testc } = require("../controllers/conversationController");

router.route("/test").get(testc);

router.route("/").post(createConversation);

router.route("/:id").get(getConversations);

router.route("/find/:senderId/:receiverId").get(getConversation);

module.exports = router;

const express = require("express");
const router = express.Router();
const { createConversation, getConversation, getConversations } = require("../controllers/conversationController");

router.route("/").post(createConversation);

router.route("/:userId").get(getConversation);

router.route("/find/:firstUserId/:secondUserId").get(getConversations);

module.exports = router;

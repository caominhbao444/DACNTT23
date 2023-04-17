const express = require("express");
const router = express.Router();
const {
  createConversation,
  testc,
  getConversationsById,
  getConversationByTwoUsers,
  getCurrentConversations,
} = require("../controllers/conversationController");

// const validateToken = require("../middleware/validateTokenHandler");

// router.use(validateToken);

const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/test").get(testc);

router.route("/current").get(getCurrentConversations);

router.route("/:id").get(getConversationsById);

router.route("/find/:senderId/:receiverId").get(getConversationByTwoUsers);

router.route("/:id").post(createConversation);

module.exports = router;

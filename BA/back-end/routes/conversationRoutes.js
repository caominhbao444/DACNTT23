const express = require("express");
const router = express.Router();
const {
  createConversation,
  getConversation,
  getConversations,
  testc,
} = require("../controllers/conversationController");

// const validateToken = require("../middleware/validateTokenHandler");

// router.use(validateToken);

const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/test").get(testc);

router.route("/:id").post(createConversation);

router.route("/:id").get(getConversations);

router.route("/find/:senderId/:receiverId").get(getConversation);

module.exports = router;

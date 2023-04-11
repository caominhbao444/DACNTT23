const express = require("express");
const router = express.Router();
const{
createMessage,
getMessage
} = require("../controllers/messageController");

router.route("/").post(createMessage);

router.route("/:conversationId").get(getMessage);

module.exports = router;
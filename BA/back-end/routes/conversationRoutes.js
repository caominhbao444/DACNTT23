const express = require("express");
const router = express.Router();
const {
  createConversation,
  testc,
  getConversationsById,
  getCurrentConversations,
  deleteConversation,
} = require("../controllers/conversationController");


const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);



//đây là đường dẫn post cuộc trò chuyện
router.route("/:id").post(createConversation);

router.route("/test").get(testc);

//đây là đường dẫn get tất cả cuộc trò chuyện 
router.route("/current").get(getCurrentConversations);

//đây là đường dẫn get thông tin từng cuộc trò chuyện
router.route("/:id").get(getConversationsById);

router.route("/:id").delete(deleteConversation);


module.exports = router;

const express = require("express");
const router = express.Router();
const{
createMessage,
getMessage,
testm
} = require("../controllers/messageController");

const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/test").get(testm);

//đây là đường dẫn post tạo tin nhắn params là conversationId, không còn là receiverId nghe
router.route("/:id").post(createMessage);

//đây là đừng dẫn get tất cả tin nhắn trong cuộc trò chuyện
router.route("/:id").get(getMessage);


module.exports = router;
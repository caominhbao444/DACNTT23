const express = require("express");
const router = express.Router();

const {
  createComments,
  getCommentsPost,
} = require("../controllers//commentsController");
const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);

//tạo comment
router.route("/:id").post(createComments);

//lấy hết comments của bài post
router.route("/:id").get(getCommentsPost);

module.exports = router;

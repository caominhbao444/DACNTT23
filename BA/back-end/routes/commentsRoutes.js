const express = require("express");
const router = express.Router();

const {
  createComments,
  getCommentsPost,
  getCommentsAllPost,
} = require("../controllers//commentsController");
const validateToken = require("../middleware/validateTokenHandler");
const { route } = require("./userRoutes");
router.use(validateToken);

//tạo comment
router.route("/:id").post(createComments);

//lấy tất cả comments của tất cả bài post
router.route("/").get(getCommentsAllPost);

//lấy hết comments của bài post
router.route("/:id").get(getCommentsPost);

module.exports = router;

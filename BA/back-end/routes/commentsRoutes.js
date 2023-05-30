const express = require("express");
const router = express.Router();

const {
  createComments,
  getCommentsPost,
  getCommentsAllPost,
  updateComments,
  getSingleCommentsPost,
  deleteComment,
  getCommentUser,
} = require("../controllers//commentsController");
const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);

//tạo comment , id của post
router.route("/:id").post(createComments);

//lấy tất cả comments của tất cả bài post
router.route("/").get(getCommentsAllPost);

router.route("/users").get(getCommentUser);

//lấy hết comments của bài post , id của post
router.route("/:id").get(getCommentsPost);

router.route("/:postId/:id").get(getSingleCommentsPost);

//accountId, postId , id của comment
router.route("/:postId/:id").put(updateComments);

router.route("/:id").delete(deleteComment);


module.exports = router;

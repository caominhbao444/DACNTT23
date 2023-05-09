const express = require("express");
const router = express.Router();

const {
  createComments,
  getCommentsPost,
  getCommentsAllPost,
  updateComments,
  getSingleCommentsPost,
} = require("../controllers//commentsController");
const validateToken = require("../middleware/validateTokenHandler");
const { route } = require("./userRoutes");
router.use(validateToken);

//tạo comment , id của post
router.route("/:id").post(createComments);

//lấy tất cả comments của tất cả bài post
router.route("/").get(getCommentsAllPost);

//lấy hết comments của bài post , id của post
router.route("/:id").get(getCommentsPost);

router.route("/:postId/:id").get(getSingleCommentsPost);

//accountId, postId , id của comment
router.route("/:postId/:id").put(updateComments);


module.exports = router;

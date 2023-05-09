const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  getCurrentPosts,
  getAllPostUser,
  testPost,
  likePost,
} = require("../controllers/postController");

const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);


router.route("/").get(getPosts).post(createPost);

router.route("/test/:id").get(testPost);

router.route("/current").get(getCurrentPosts);

router.route("/like/:id").post(likePost);

router.route("/:accountId").get(getAllPostUser);

// userId / id bài post nhé
router.route("/:accountId/:id").get(getPostById).put(updatePost).delete(deletePost);

module.exports = router;

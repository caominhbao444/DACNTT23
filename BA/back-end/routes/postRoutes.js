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

router.route("/").post(createPost);

router.route("/like/:id").post(likePost);

router.route("/all").get(getPosts)

router.route("/:accountId").get(getAllPostUser);

router.route("/current").get(getCurrentPosts);

router.route("/test/:id").get(testPost);

router.route("/single/:id").get(getPostById);

// userId / id bài post nhé
router.route("/:id").put(updatePost).delete(deletePost);



module.exports = router;

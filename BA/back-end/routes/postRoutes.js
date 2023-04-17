const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);


router.route("/").get(getPosts).post(createPost);
router.route("/:id").get(getPostById).put(updatePost).delete(deletePost);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  createComments,
  getCommentsPost,
} = require("../controllers//commentsController");
const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);

router.route("/:id").post(createComments);

router.route("/:id").get(getCommentsPost);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  inforUser,
  followUser,
  unfollowUser,

} = require("../controllers/userController");

const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/current").get(inforUser);

router.route("/follow/:id").put(followUser);

router.route("/unfollow/:id").put(unfollowUser);

router.route("/").get(getUsers)

router.route("/").post(createUser);

router.route("/:id").get(getUser);

router.route("/:id").put(updateUser);

router.route("/:id").delete(deleteUser);


module.exports = router;
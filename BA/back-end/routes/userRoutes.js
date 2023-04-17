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
  friendsUser,
  test,

} = require("../controllers/userController");

const validateToken = require("../middleware/validateTokenHandler");

router.route("/create").post(createUser);

router.use(validateToken);

router.route("/current").get(inforUser);

router.route("/follow/:id").put(followUser);

router.route("/unfollow/:id").put(unfollowUser);

router.route("/test/:id").get(test);

router.route("/friends").get(friendsUser);

router.route("/").get(getUsers)

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);


module.exports = router;
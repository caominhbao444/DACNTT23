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

router.use(validateToken);

router.route("/current").get(inforUser);

router.route("/follow/:id").put(followUser);

router.route("/unfollow/:id").put(unfollowUser);

router.route("/test/:id").get(test);

router.route("/friends/:id").get(friendsUser);

router.route("/").get(getUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);


module.exports = router;
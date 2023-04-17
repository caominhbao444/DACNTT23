const express = require("express");
const {
  register,
  currentAccount,
  loginAccount,
  resetPassword,
  deleteAccount,
  getAccounts,
  getAccount,
  followAccount,
  unfollowAccount,
  friendsAccount,
  checkFriends,
  notFriendsAccount
} = require("../controllers/accountController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", register);

router.post("/login", loginAccount);

router.post("/follow/:id",validateToken,followAccount);

router.post("/unfollow/:id",validateToken,unfollowAccount);

router.get("/all",validateToken,getAccounts);

router.get("/current", validateToken, currentAccount);

router.get("/friends",validateToken,friendsAccount);

router.get("/notfriends",validateToken,notFriendsAccount);

router.get("/checkfriends/:id",validateToken,checkFriends);

router.get("/:id",validateToken,getAccount);

router.put("/reset/:email",validateToken,resetPassword);

router.delete("/delete/:id",validateToken,deleteAccount);






module.exports = router;
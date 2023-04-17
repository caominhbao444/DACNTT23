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
} = require("../controllers/accountController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", register);

router.post("/login", loginAccount);

router.post("/follow/:id",validateToken,followAccount);

router.post("/unfollow/:id",validateToken,unfollowAccount);

router.get("/all",validateToken,getAccounts);

router.get("/current", validateToken, currentAccount);

router.get("/:id",validateToken,getAccount);

router.put("/reset/:email",validateToken,resetPassword);

router.delete("/delete/:id",validateToken,deleteAccount);






module.exports = router;
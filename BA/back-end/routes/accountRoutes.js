const express = require("express");
const {
  register,
  currentAccount,
  loginAccount,
  resetPassword,
  deleteAccount,
  getAccount,
} = require("../controllers/accountController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", register);

router.post("/login", loginAccount);

router.get("/all",validateToken,getAccount);

router.get("/current", validateToken, currentAccount);

router.put("/reset/:email",validateToken,resetPassword);

router.delete("/delete/:id",validateToken,deleteAccount);




module.exports = router;